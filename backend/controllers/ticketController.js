import Stripe from 'stripe';
import ticketModel from '../models/ticketModel.js';
import userModel from './../models/userModel.js';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
//placing user order from frontend

const bookTicket = async (req, res) => {
    const frontend_url = "https://localhost:5173";
    try {
        console.log(req.body);
        // const newTicket = new ticketModel({
        //     userId: req.body.userId,
        //     address: req.body.address,
        //     amount: req.body.amount,
        //     items: req.body.items,
        // }); 
        // console.log(newTicket);
        // await newTicket.save();

        // await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // const line_items = req.body.items.map((item) => ({
        //     price_data: {
        //         currency: "inr",
        //         product_data: {
        //             name: item.name
        //         },
        //         unit_amount: item.price * 100
        //     },
        //     quantity: item.quantity
        // }));

        // const session = await stripe.checkout.sessions.create({
        //     line_items: line_items,
        //     mode: "payment",
        //     success_url: `${frontend_url}/verify?success=true&orderId=${newTicket._id}`,
        //     cancel_url: `${frontend_url}/verify?success=false&orderId=${newTicket._id}`,
        // });

        // res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


const verifyTicket = async (req, res) => {
    const { orderId, success } = req.body
    try {
        if (success == "true") {
            await ticketModel.findByIdAndUpdate(orderId, { payment: true })
            res.json({ success: true, message: "Paid" })
        } else {
            await ticketModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not paid" })
        }
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}

// user orders for frontend
const userOrders = async (req, res) => {
    try {
        const tickets = await ticketModel.find({ userId: req.body.userId })
        res.json({ success: true, data: tickets })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}


export { bookTicket, verifyTicket, userOrders }


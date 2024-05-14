import fs from 'fs'
import eventModel from '../models/eventModel.js';

//add event item  

const addEvent = async (req, res) => {
    let image_filename = req.file.filename;
    const { name,description, startDate, endDate, time, location, price, category, street, city, state, zipcode, country, phone } = req.body;
    if (!name || !description|| !startDate || !endDate || !time || !location || !price || !category || !street || !city || !state || !zipcode || !country || !phone) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const event = new eventModel({
        name,description, startDate, endDate, time, location, price, category, street, city, state, zipcode, country, phone, image: image_filename

    })
    try {
        await event.save();
        res.json({ success: true, message: "Event Added Successfully" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

//get created events
const getUserEvents = async (req, res) => {
    try {

        const userEvent = await eventModel.find({ "user": req.body.userId }).exec();
        
        if (!userEvent) {
            // If no post is found for the specified author
            return res.status(404).json({ message: 'No event found for the specified author.' });
        }

        return res.status(200).json(userEvent);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

const listEvents = async (req,res) => {
    try {
        const events = await eventModel.find({})
        res.json({  
            success: true,
            data: events
        })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' })
    }
}

const getEvent = async (req,res) => {
    try {
        const {id}=req.body
        const event = await eventModel.find({_id:id})
        res.json({  
            success: true,
            data: event
        })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' })
    }
}
const removeEvent=async(req,res)=>{
    try {
        const event=await eventModel.findById(req.body.id);
        fs.unlink(`uploads/${event.image}`,()=>{})
        await eventModel.findByIdAndDelete(req.body.id)
        res.json({  
            success: true,
            message:'event removed'
        }) 
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' })
    }
}  
export { addEvent,getUserEvents ,listEvents,removeEvent,getEvent}    

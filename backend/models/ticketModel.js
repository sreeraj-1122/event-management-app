import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    }, 
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type: Object,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    payment: {
        type: Boolean,
        default: false,
    }

})
const ticketModel = mongoose.models.ticket || mongoose.model('ticket', ticketSchema)
export default ticketModel;
import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { bookTicket, userOrders, verifyTicket } from '../controllers/ticketController.js'

const ticketRouter=express.Router()

ticketRouter.post("/book",authMiddleware,bookTicket)
ticketRouter.post("/verify",verifyTicket)
ticketRouter.post("/userorders",authMiddleware,userOrders)

export default ticketRouter  
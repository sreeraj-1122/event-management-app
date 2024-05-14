import express from 'express'
import multer from 'multer';
import { addEvent, getEvent, getUserEvents, listEvents, removeEvent } from '../controllers/eventController.js';
import authMiddleware from './../middleware/auth.js';

const eventRouter=express.Router()


//image storage engine

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage})
eventRouter.post('/add',upload.single("image"),addEvent)
eventRouter.post('/get',authMiddleware,getUserEvents)
eventRouter.get('/list',listEvents)
eventRouter.post('/remove',removeEvent)
eventRouter.post('/singleevent',getEvent)




 
export default eventRouter
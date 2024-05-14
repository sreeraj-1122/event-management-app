import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js'
import userRouter from './routes/userRoutes.js'
import eventRouter from './routes/eventRoute.js'
import cartRouter from './routes/cartRoute.js'
import ticketRouter from './routes/ticketRoutes.js'


//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//DB connection
connectDB();

//API endpoints
app.use('/api/user', userRouter)
app.use('/images',express.static('uploads')) 
app.use('/api/event',eventRouter)
app.use('/api/cart',cartRouter)
app.use('/api/ticket',ticketRouter)



app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))

//mongodb+srv://sreeraj2122:8078382787@cluster0.yi6udbc.mongodb.net/?
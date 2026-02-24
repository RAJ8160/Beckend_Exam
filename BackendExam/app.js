import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import router from "./routes/user.route.js"
import mongoose from "mongoose"
import connectDB from "./config/db.js"
import roleRouter from "./routes/role.route.js"
import bodyParser from "body-parser"
import ticketRouter from "./routes/ticket.route.js"
const app = express()
connectDB()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(bodyParser.json())

//it is for testing purpose
// app.get('/',async(req,res)=>{
//     const db = mongoose.connection.db
//     const users = await db.collection('test').find().toArray()
//     res.json(users)
// })

//Register User Routes
app.use("/api/users",router)

//Register User ticket
app.use("/api/tickets",ticketRouter)

app.use('/api/role',roleRouter)
app.use('/api/comments',roleRouter)
app.listen(8000,()=>{
    console.log(`Server Connected At Port 8000`);
})
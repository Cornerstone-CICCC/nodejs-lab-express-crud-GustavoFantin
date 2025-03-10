import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import empRouter from './routes/employee.route'
dotenv.config()


//SEARCH SHOULD BE HIGHER ON CODE, AT LEAST BEFORE DYNAMICS ID

//create a server 
const app = express()


//Router path to employees
app.use(express.json())
app.use(cors())


app.use('/employees', empRouter)



//Fallback
app.use((req: Request, res:Response, next:NextFunction) => {
  res.status(404).send("Something went wrong...")
})


// Starting server PORT
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})
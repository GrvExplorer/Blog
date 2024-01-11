import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";


const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome...')
})

app.use("/api/user", userRoutes);


app.listen(process.env.PORT || 8000, () => {
  console.log(`listening on http://localhost:${process.env.PORT || 8000}`);
})

 
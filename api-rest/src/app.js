import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import router from "./routes/notas.js";
import cors from "cors"


// App root
const app = express();

// Connection database
mongoose.connect('mongodb://127.0.0.1:27017/notas')
    .then(() => {
        console.log('Conectado a la base de datos')
    })

// Config
app.set('PORT', 5000)

// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({origin: ['http://localhost:3000']}))

//Routes
app.use('/api/', router)

//On Server
app.listen(app.get('PORT'), () => {
    console.log('Server port 5000')
})

import express from "express";
import authRoute from "./routes/auth.js"
import todoRoute from "./routes/todo.js"
import bodyParser from "body-parser";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from './utils/swagger.js';

const app = express();
const PORT = 3000;

dotenv.config()

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/api/user", authRoute) 
app.use("/api/todo", todoRoute)
// api documentation endpoint
app.use("/todolist/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Todo List Management API",
}))

app.get("/", (req,res,next) =>{
    res.send("hello world")
})

// global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"
    res.status(statusCode).json({error : message })
})

app.listen(PORT,async () =>{
    console.log(`Listening on port ${PORT}`);

})
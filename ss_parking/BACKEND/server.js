import express from "express";
import connectToMongoDB from "./DB_connect/connectToMongo.js";

const PORT = 8080;

const app = express();

connectToMongoDB();
app.listen(PORT, ()=>
{
    console.log(`Console running on PORT ${PORT}`);
})
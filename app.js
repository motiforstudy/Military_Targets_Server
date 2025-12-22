import express from "express";
import phase1Router from "./phase_1/phase_1.js";

const app = express();
const port = 3000;
app.use(express.json())

app.use("/phase1", phase1Router)


app.listen(port, ()=>{
    console.log("the server is ready: ");
})
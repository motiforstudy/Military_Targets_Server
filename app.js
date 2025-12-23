import express from "express";
import phase1Router from "./phase_1/phase_1.js";
import phase2Router from "./phase_2/phase2.js";
import phase3Router from "./phase_3/phase3.js";

const app = express();
const port = 3000;
app.use(express.json())

app.use("/phase1", phase1Router)
app.use("/phase2", phase2Router)
app.use("/phase3", phase3Router)

app.listen(port, ()=>{
    console.log("the server is ready: ");
})
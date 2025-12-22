import express from "express";
import isGoodHeader from "../middleware/phase_1_middleware.js";
import { promises as fs } from "fs";

const phase1Router = express()

// exe 1. 
phase1Router.get("/health", (req, res)=>{
    try{
        res.send({
            "status": "ok",
            "serverTime": new Date()
        })
    } catch (error){
        res.send("something goes wrong: ", error)
    }
})

// exe 2.
phase1Router.get("/briefing", isGoodHeader, (req, res)=>{
    try{
        res.send({
            "unit": "Golani",
            "message": "briefing delivered"
        })
    } catch (error){
        res.send("something goes wrong in brieing: 400", error)
    }
})

// exe 3.
phase1Router.get("/targets/id", async (req, res)=>{
    const id = req.params.id
    let data = await fs.readFile("..data/targets.json")
})

export default phase1Router
import express from "express";
import { promises as fs } from "fs";
import { getLog, addHeader, postTaget, updateTarget } from "../middleware/phase_2_middleware.js";

const phase2Router = express();

// exe 1
phase2Router.get("/log", getLog, (req, res)=>{
    res.send(res.getHeader("theLog"));
});

// exe 2
phase2Router.get("/addHeader", addHeader, (req, res)=>{
    res.send(res.getHeader("theTime"));
});

// exe 3
phase2Router.post("/targets", postTaget, async (req, res)=>{
    let data = await fs.readFile("./data/targets.json")
    let changeToJson = JSON.parse(data);
    changeToJson["targets"].push(res.getHeader("theBody"))
    await fs.writeFile("./data/targets.json", JSON.stringify(changeToJson))
    res.send("the add went succsefully")
})

// exe 4
phase2Router.put("/targets/:id", updateTarget, async (req, res)=>{
    try{
        let data = await fs.readFile("./data/targets.json")
        let changeToJson = JSON.parse(data);
        let getId = req.params.id
        for (let i of changeToJson["targets"]){
            if (i["id"] === getId){
                let getBody = req.body;
                for(let [key, value] of Object.entries(getBody)){   
                    i[key] = value
                }
            }
        }
        await fs.writeFile("./data/targets.json", JSON.stringify(changeToJson))
        res.send("the update went good")
    } catch (error){
        res.send("the proablem is in the server /targets/:id")
    }
})

export default phase2Router;
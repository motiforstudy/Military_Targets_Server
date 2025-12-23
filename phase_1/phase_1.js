import express from "express";
import isGoodHeader from "../middleware/phase_1_middleware.js";
import { promises as fs } from "fs";

const phase1Router = express();

// exe 1. 
phase1Router.get("/health", (req, res)=>{
    try{
        res.send({
            "status": "ok",
            "serverTime": new Date()
        });
    } catch (error){
        res.send("something goes wrong: ", error);
    };
});

// exe 2.
phase1Router.get("/briefing", isGoodHeader, (req, res)=>{
    try{
        res.send({
            "unit": "Golani",
            "message": "briefing delivered"
        });
    } catch (error){
        res.send("something goes wrong in brieing: 400", error);
    };
});

// exe 3.
phase1Router.get("/targets/:id", async (req, res)=>{   
    try{
        let id = req.params.id;       
        let data = await fs.readFile("./data/targets.json");
        let changeToJson = JSON.parse(data);
        for (let i of changeToJson["targets"]){ 
            if (i.id === id){       
                return res.send(i);
            };
        };
        res.send("this id did not exsist");
    } catch (error){
        res.send("something goes wrong in targets/id: 404");
    };
});

// exe 4.
phase1Router.get("/targets", async (req, res)=>{
    try{
        let data = await fs.readFile("./data/targets.json");
        let changeToJson = JSON.parse(data);
        let correctObjects = []
        let {region, status, minPriority} = req.query
        for (let i of changeToJson["targets"]){
            if ((region === i["region"]) || (status === i["status"]) || (Number (minPriority) === i["priority"])){
                correctObjects.push(i)
            }
        }
        res.send(correctObjects)
    } catch (error){
        res.send("something goes wrong in targets: 404")
    }
})

export default phase1Router;
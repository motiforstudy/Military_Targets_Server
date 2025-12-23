import express from "express";
import { promises as fs } from "fs";

const phase3Router = express();

//exe 1.
phase3Router.delete("/targets/:id", async (req, res)=>{
    try{
        let getId = req.params.id
        let data = await fs.readFile("./data/targets.json")
        let changeToJson = JSON.parse(data);
        let count = 0
        for (let i of changeToJson["targets"]){
            if (i["id"] === getId){
                changeToJson["targets"].splice(count)
                await fs.writeFile("./data/targets.json", JSON.stringify(changeToJson))
                return res.send("the delete went good")
            }
            count++
        }
        res.send("the id isn't exist")
    } catch (error){
        res.send("there is a problem in delete")
    }
})

// exe 2
// i did try and catch in the most routers

export default phase3Router


export default function isGoodHeader(req, res, next){
    try {
        let getHeader = req.get("Client-Unit")
        
        if (getHeader === "Golani"){
            next()
        } else {
            res.send("the header is not good")
        }
    } catch (error){
        res.send("you have a problem to connect:", error)
    }
}
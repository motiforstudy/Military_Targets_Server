export function getLog(req, res, next){
    let theLog = {};
    const method = req.method;
    const path = req.originalUrl;
    const timestamp = new Date();
    theLog["method"] = method;
    theLog["path"] = path;
    theLog["timestamp"] = timestamp;
    res.setHeader("theLog", theLog);
    next();
};

export function addHeader(req, res, next){
    let currentTime = new Date();
    res.setHeader("theTime", currentTime);
    next();
};

export function postTaget(req, res, next){
    try{
        let getBody = req.body
        getBody.createdAt = new Date()   
        res.setHeader("theBody", getBody)
        next()
    } catch (error){
        res.send("you didn't enter good middleware in postTarget", error)
    }
}

export function updateTarget(req, res, next){
    try{
        let getId = req.params.id
        if (getId){
            next()
        }
    } catch (error){
        res.send("you didn't enter good middleware in updateTarget", error)
    }
}
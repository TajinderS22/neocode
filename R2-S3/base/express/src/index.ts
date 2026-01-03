import express from "express"

const port =3000;

const app =express()


app.get("/heartbeat",(req,res)=>{
    res.send("Server is healthy")
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}.`)
})
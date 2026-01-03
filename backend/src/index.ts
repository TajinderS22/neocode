import express from "express";
import { HeadBucketCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { client, copyBaseToUser, listBucketContents } from "./R2/r2.js";
import { json } from "node:stream/consumers";

dotenv.config();

const app = express();
const port = 3000;


app.get("/test-copy",async(req,res)=>{
  await copyBaseToUser({
    name:"express",
    bucketName:"neo-code",
    userId:"1",
    neoId:"1"
  })
  res.status(200).json({
    data:await listBucketContents("neo-code")
  })
})



async function start() {
  app.listen(port, () => {
    console.log(` Server running on port ${port}`);
  });
}

start();

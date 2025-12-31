import express from "express";
import pty from "node-pty";
import http from "http";
import { Server as SocketIoServer } from "socket.io";
import generateFileTree from "./utils/treeGenerator.js";
import fs from "fs/promises"


const port = process.env.HTTP_SERVER_PORT || 8000;
const app = express();
const server = http.createServer(app);

const io = new SocketIoServer(server, {
  cors: {
    origin: "*",
  },
});



// const fileTree = await generateFileTree(process.cwd()+"/user"); 
// await fs.writeFile(process.cwd() + "/user/fileTree.json", JSON.stringify(fileTree, null, 2));


app.get('/files',(req,res)=>{
  
})


const ptyProcess = pty.spawn("bash", [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.cwd()+"/user",
  env: process.env
});

app.get("/", (req, res) => {
  res.status(200).send("Server is healthy");
});

ptyProcess.onData((data) => {
  io.emit("terminal:data", data);
});

ptyProcess.onData((data) => {
  process.stdout.write(data);
});


io.on("connection", (socket) => {
  console.log("io connected", socket.id);

  socket.on("terminal:write", (data) => {
    ptyProcess.write(data);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

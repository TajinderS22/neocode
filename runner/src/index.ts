import express from "express";
import pty from "node-pty";
import http from "http";
import { Server as SocketIoServer } from "socket.io";
import generateFileTree from "./utils/treeGenerator.js";
import fs from "fs/promises";
import cors from "cors";
import chokidar from "chokidar";
import path from "path";

const port = process.env.HTTP_SERVER_PORT || 8000;
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new SocketIoServer(server, {
  cors: { origin: "*" },
});


const HOME_DIR = process.env.HOME || process.cwd();
const userDir = path.resolve(HOME_DIR, "user");

console.log(userDir)

await fs.mkdir(userDir, { recursive: true });

console.log("User directory:", userDir);

chokidar
  .watch(userDir, { ignoreInitial: true })
  .on("all", (_event, changedPath) => {
    io.emit("file:refresh", changedPath);
  });

app.get("/files", async (_req, res) => {
  const fileTree = await generateFileTree(userDir);
  res.status(200).json({ fileTree });
});

const ptyProcess = pty.spawn("bash", [], {
  name: "xterm-color",
  cols: 80,
  rows: 30,
  cwd: userDir,
  env: process.env,
});

app.get("/", (_req, res) => {
  res.status(200).send("Server is healthy");
});

ptyProcess.onData((data) => {
  io.emit("terminal:data", data);
  process.stdout.write(data); 
});

io.on("connection", (socket) => {
  console.log("io connected", socket.id);

  socket.on("terminal:write", (data) => {
    ptyProcess.write(data);
  });

 
  socket.on("file:update", async (data) => {
    const resolvedPath = path.resolve(userDir, data.path);

    if (!resolvedPath.startsWith(userDir)) return;

    await fs.writeFile(resolvedPath, data.content);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

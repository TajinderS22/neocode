"use client"
import { Terminal as XTerminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { useEffect, useRef } from "react";
import socket from "../utils/Socket";

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const term = new XTerminal({
      rows: 15,
      cols: 120,
      cursorBlink: true,
    });

    term.open(terminalRef.current!);
    term.focus();

    term.onData((data) => {
      socket.emit("terminal:write", data);
    });

    const onTerminalData = (data: string) => {
      term.write(data);
    };

    socket.on("terminal:data", onTerminalData);

    return () => {
      socket.off("terminal:data", onTerminalData);
      term.dispose();
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      style={{
        backgroundColor: "green",
      }}
    />
  );
};

export default Terminal;

/* eslint-disable @typescript-eslint/no-unused-vars */
import Editor from "@monaco-editor/react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { FileTree } from "../types";
import socket from "../utils/Socket";
import { useEffect, useState } from "react";
// import { useState } from "react";

const MonacoEditor = () => {
  const [code, setCode] = useState("");

  console.log(code);
  const updateFile = async (content: string) => {
    socket.emit("file:update", {
      name: selectedFile?.name,
      isDir: selectedFile?.isDir,
      content: content,
      path: selectedFile?.path,
    });
  };

  const selectedFile: FileTree | null = useSelector(
    (state: RootState) => state.selectedFile
  );

  useEffect(() => {
    if (code && selectedFile) {
      const timer = setTimeout(() => {
        updateFile(code);
      }, 5 * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [code, selectedFile]);
  return (
    <div className="h-full w-full border border-white">
      <Editor
        value={selectedFile?.content || "Sample code "}
        height={"100%"}
        width={"100%"}
        language="typescript"
        theme="vs-dark"
        onChange={(value) => {
          setCode(value!);
        }}
      />
    </div>
  );
};

export default MonacoEditor;

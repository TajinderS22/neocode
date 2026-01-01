import  { useEffect, useState } from 'react'
import FilesTree from './FilesTree'
import { backend_url } from '../utils/constants';
import axios from 'axios';
import type { FileTree } from '../types';
import socket from '../utils/Socket';
import MonacoEditor from './MonacoEditor';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const Display = () => {
    const [files, setFiles] = useState<FileTree>();

    const selectedFile=useSelector((state:RootState)=>state.selectedFile)

    const getFiles = async () => {
      const response = await axios.get(`${backend_url}/files`);
      console.log(response.data.fileTree);
      setFiles(response.data.fileTree);
    };

    useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getFiles();
    }, []);

    useEffect(()=>{
      socket.on("file:refresh",getFiles)

      return ()=>{
        socket.off("file:refresh",getFiles)
      }
    },[])

  return (
    <div className="flex h-[calc(100vh-276px)]  ">
      <div className="min-w-50 h-full overflow-scroll  w-2/12 over bg-slate-900 pt-2 px-2 text-white">
        {files && <FilesTree files={files} />}
      </div>
      <div className="flex-1 flex max-w-480 flex-col">
        {selectedFile?.path && (
          <p className="font-bold px-2 bg-gray-800 text-white">
            {" "}
            {selectedFile?.path.replaceAll("/", " > ")}
          </p>
        )}
        <MonacoEditor />
      </div>
    </div>
  );
}

export default Display
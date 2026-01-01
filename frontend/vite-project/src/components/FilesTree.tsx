
import { useState } from 'react';
import type { FileTree } from '../types'
import { File, Folder } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSelectedFile } from '../store/slices/selectedFile';


const FilesTree = ({files}:{files:FileTree}) => {
  const [displayChild,setDisplayChild]=useState(true)
  const dispatch=useDispatch()
  
    
  return (
    <div className="bg-slate-900 ">
      <p onClick={()=>{
        
        if(files.isDir){
          setDisplayChild(!displayChild);
        }else{
          dispatch(setSelectedFile(files));
        }
      }}
      
      className='hover:bg-slate-600 flex gap-2 p-1 m-1 rounded-md pl-2 '
      > 
        {files.isDir && <Folder className='w-5' />}
        {!files.isDir && <File className='w-4'/>}
        {files?.name}
      </p>
      {
        <ul className="list-none pl-4">
          {displayChild &&
            files?.children?.map((file) => (
              <li key={file.name} className="list-none">
                <FilesTree files={file} />
              </li>
            ))}
        </ul>
      }
    </div>
  );
}

export default FilesTree
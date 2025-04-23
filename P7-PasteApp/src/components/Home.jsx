import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } from '../redux/pasteSlice'
import { useEffect } from 'react';

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch()
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(()=>{
    if(pasteId){
      const paste = allPastes.find((p) => p._id === pasteId);
      console.log("page found")
      setTitle(paste.title);
      setValue(paste.content);
    }
  },[pasteId])

  function createPaste(){
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: '2-digit',
      minute:'2-digit'
    };

    const paste = {
      title: title,
      content: value,
      _id: pasteId || 
          Date.now().toString(36),
      createdAt: new Date().toLocaleDateString(undefined, options),
    }

    if(pasteId){
      // update
      dispatch(updateToPaste(paste));
    }
    else{
      // create
      dispatch(addToPaste(paste));
    }

    // after creation or updation
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
        <input 
          className='p-2 rounded-2xl mt-2 w-[66%] pl-4'
          type="text" 
          placeholder='Enter Title Here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createPaste} className='p-2 rounded-2xl mt-2'>
          {
            pasteId ? "Update Paste" : "Create My Paste"
          }
        </button>
      </div>

      <div className='mt-8'>
        <textarea 
          className='rounded-2xl mt-4 min-w-[500px] p-4'
          value={value}
          placeholder='Enter Content Here'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default Home

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const ViewPaste = () => {
  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log("Final paste: ", paste);


  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
        <input 
          className='p-2 rounded-2xl mt-2 w-[66%] pl-4'
          type="text" 
          placeholder='Enter Title Here'
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />

        <button 
          className='p-2 rounded-2xl mt-2' 
          onClick={() => {
            navigator.clipboard.writeText(paste?.content);
            toast.success("Copied to Clipboard");
        }}>
          Copy Content
        </button>
      </div>

      <div className='mt-8'>
        <textarea 
          className='rounded-2xl mt-4 min-w-[500px] p-4'
          value={paste.content}
          placeholder='Enter Content Here'
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default ViewPaste

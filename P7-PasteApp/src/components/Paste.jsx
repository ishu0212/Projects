import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } from '../redux/pasteSlice'
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId){
    dispatch(removeFromPaste(pasteId));
  }


  return (
    <div>
      <input
        className='p-2 rounded-2xl mt-2 min-w-[600px] pl-4'
        type='search'
        placeholder='Search Here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='flex flex-col gap-5 mt-5'>
        {
          filteredData.length > 0 && 
          filteredData.map(
            (paste) => {
              return(
                <div className='border rounded-2xl border-[#646cffaa] flex flex-col gap-1 pt-2 pb-2' key={paste?._id}>
                  <div className='font-bold text-2xl'>
                    {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>
                  <div className='flex flex-row gap-4 place-content-evenly'>
                    <button>
                      <NavLink to={`/?pasteId=${paste?._id}`} className={`text-white hover:text-white`}>
                        Edit
                      </NavLink>
                    </button>
                    <button>
                      <NavLink to={`/pastes/${paste?._id}`} className={`text-white hover:text-white`}>
                        View
                      </NavLink>
                    </button>
                    <button onClick={() => handleDelete(paste?._id)}>
                      Delete
                    </button>
                    <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to Clipboard");
                    }}>
                      Copy
                    </button>
                    <button onClick={() => {
                      let url = window.location.href;
                      navigator.clipboard.writeText(url+"/"+paste?._id);
                      toast.success("URL Copied to Clipboard");
                    }}>
                      Share
                    </button>
                  </div>

                  <div>
                    {paste.createdAt}
                  </div>
                </div>
              )
            } 
          )
        }
      </div>
    </div>
  )
}

export default Paste

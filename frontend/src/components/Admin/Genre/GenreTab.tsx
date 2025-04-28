import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import GenreAddForm from './GenreAddForm';

const GenreTab = () => {
  const [addOpen, setAddOpen] = useState(false);


  return (
    <div className="flex flex-col gap-4 items-center px-8">

      <div className='w-full flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Manage Genres</h1>
        <button
          onClick={() => setAddOpen(true)}
          className='bg-red-600 font-medium px-4 py-1 rounded-full shadow-md shadow-red-500/50 flex items-center gap-2
                cursor-pointer hover:bg-zinc-600 hover:shadow-none transition-all'>
          <Plus />
          New Genre
        </button>
      </div>

    {addOpen && (
      <GenreAddForm onClose={() => setAddOpen(false)} />
    )}


    </div>
  )
}

export default GenreTab
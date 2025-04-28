import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import GenreAddForm from './GenreAddForm';
import GenresTable from './GenresTable';
import { useGetPaginatedGenres } from '../../../api/services/genre/query';
import GenrePagination from './GenrePagination';
import GenreEditForm from './GenreEditForm';
import Genre from '../../../types/Genre';

const GenreTab = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editGenre, setEditGenre] = useState<Genre | null>(null);
  const [page, setPage] = useState(1);

  const { data, refetch } = useGetPaginatedGenres(page);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <div className="flex flex-col gap-8 items-center px-8 h-full">

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

      <div className='h-full w-full flex justify-between flex-col gap-4'>
        <GenresTable 
          genres={data?.data.data ?? []} 
          setEditOpen={() => setEditOpen(true)}
          setEditGenre={(genre: Genre) => setEditGenre(genre)}
        />
        <GenrePagination
          currentPage={data?.data.current_page ?? 1}
          lastPage={data?.data.last_page ?? 1}
          setPage={(page: number) => setPage(page)}
          page={page}
        />
      </div>



      {addOpen && (
        <GenreAddForm onClose={() => setAddOpen(false)} />
      )}

      {editOpen && (
        <GenreEditForm
        genre={editGenre!} 
        onClose={() => setEditOpen(false)}/>
      )}

    </div>
  )
}

export default GenreTab
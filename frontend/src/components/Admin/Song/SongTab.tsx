import { useEffect, useState } from 'react'
import TablePagination from '../TablePagination';
import { useGetPaginatedSongs } from '../../../api/services/song/query';
import SongTable from './SongTable';

const SongTab = () => {
    const [page, setPage] = useState(1);
    const { data, refetch } = useGetPaginatedSongs(page);


    useEffect(() => {
        refetch()
    }, [page, refetch]);

    return (
        <div className="flex flex-col gap-8 items-center px-8 h-full">

            <h1 className='text-2xl font-bold w-full text-left'>Manage Songs</h1>

            <div className='h-full w-full flex justify-between flex-col gap-4'>
                <SongTable
                    songs={data?.data.data ?? []}
                />

                <TablePagination
                    currentPage={data?.data.current_page ?? 1}
                    lastPage={data?.data.last_page ?? 1}
                    setPage={(page: number) => setPage(page)}
                    page={page}
                />
            </div>

        </div>
    )
}

export default SongTab
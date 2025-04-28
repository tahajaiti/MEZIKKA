import { useEffect, useState } from 'react'
import { useGetPaginatedUsers } from '../../../api/services/user/query'
import UsersTable from './UsersTable';
import TablePagination from '../TablePagination';

const UserTab = () => {
  const [page, setPage] = useState(1);
  const { data, refetch } = useGetPaginatedUsers(page);


  useEffect(() => {
    refetch()
  }, [page, refetch]);

  return (
    <div className="flex flex-col gap-8 items-center px-8 h-full">

      <h1 className='text-2xl font-bold w-full text-left'>Manage Users</h1>

      <div className='h-full w-full flex justify-between flex-col gap-4'>
        <UsersTable
          users={data?.data.data ?? []}
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

export default UserTab
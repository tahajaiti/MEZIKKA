import React from 'react'

interface props {
    currentPage: number;
    lastPage: number;
    setPage: (page: number) => void;
    page: number;
}

const GenrePagination = ({ currentPage, lastPage, setPage, page }: props) => {

    const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

    return (
        <div className='flex items-center justify-center gap-2'>
            {currentPage > 1 &&
                <button
                    onClick={() => setPage(currentPage - 1)}
                    className="px-4 py-2 rounded-sm bg-zinc-800 hover:bg-red-500 cursor-pointer"
                >
                    Prev
                </button>}

            {pages.map(num => (
                <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`px-4 py-2 rounded-sm cursor-pointer transition-all
                                ${num === page ? 'bg-red-500 hover:bg-zinc-800' : 'bg-zinc-800 hover:bg-red-500'}`}
                >
                    {num}
                </button>
            ))}

            {currentPage < lastPage &&
                <button
                    onClick={() => setPage(currentPage + 1)}
                    className="px-4 py-2 rounded-sm bg-zinc-800 hover:bg-red-500 cursor-pointer"
                >
                    Next
                </button>}
        </div>
    )
}

export default GenrePagination
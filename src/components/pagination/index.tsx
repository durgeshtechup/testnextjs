import React, { useState, useEffect } from 'react';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

const Pagination = ({
  setPage,
  page,
  totalpage,
  currentPage,
  pageSize,
  setPageSize,
  arraySize,
}: {
  setPage: any;
  page?: number;
  totalpage?: number;
  currentPage?: number;
  pageSize?: number;
  setPageSize?: any;
  arraySize?: any;

}) => {
  const [psize, setPsize] = React.useState<string>('');

  const createPages = (count: number, current: number) => {
    const totalPages = count;
    const delta = 2;

    let pages: (number | 'ellipsis')[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= current - delta && i <= current + delta)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== 'ellipsis') {
        pages.push('ellipsis');
      }
    }

    return pages;
  };

  /* useEffect(() => {
     setPage(currentPage);
   }, [currentPage]);*/

  useEffect(() => {
    if (psize) {
      setPageSize(psize);
    }
  }, [psize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="border-t-1 my-4">
      <div className="flex w-full items-center justify-end ">
        <div className="flex flex-col sm:flex-row justify-between gap-2 ">
          {/*<button
            className="h-9 w-9 rounded-xl border p-1 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={page === 1}
          >
            {'<'}
          </button>
          <span className="mx-3 flex items-center gap-1">
            <div>Page</div>
            <strong>
              {currentPage} of {totalpage}
            </strong>
          </span>
          <button
            className="h-9 w-9 rounded-xl border p-1 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={page >= totalpage}
          >
            {'>'}
          </button>*/}
          <div className="mx-2 w-fit sm:w-full flex items-center font-medium whitespace-nowrap">
            Records per page
            <select
              value={pageSize}
              onChange={(e) => {
                handlePageChange(1);
                setPsize(e.target.value);
              }}
              className="mx-2 rounded-xl border px-3 py-1.5 outline-none dark:!bg-navy-800 dark:text-white"
            >
              {arraySize.map((p: number) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-fit sm:w-full items-center gap-1">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`linear flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 p-2 text-lg text-gray-900 transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 bg-brand-500 text-gray-900 font-bold hover:bg-brand-600 bg-white border hover:text-white`}

            >
              <MdChevronLeft />
            </button>

            {createPages(totalpage, currentPage).map((pageItem, index) => (
              <button
                className={`linear flex h-8 w-8 items-center justify-center rounded-full p-2 text-sm transition duration-200 ${pageItem === currentPage
                  ? 'bg-brand-500 text-white font-bold hover:bg-brand-600  border '

                  : 'border-[1px]  border-gray-400 bg-[transparent] dark:border-white dark:text-white'
                  }`}
                onClick={() => handlePageChange(pageItem === 'ellipsis' ? currentPage : pageItem as number)}
                key={index}
              >
                {pageItem === 'ellipsis' ? '...' : pageItem}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalpage}
              className={`linear flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 p-2 text-lg text-gray-900 transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 bg-brand-500 text-gray-900 font-bold hover:bg-brand-600 bg-white border hover:text-white`}
            >
              <MdChevronRight />
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Pagination;


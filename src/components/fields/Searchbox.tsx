import { useEffect, useState, useContext } from "react";
import { FiAlignJustify, FiSearch } from "react-icons/fi";


interface SearchProps {
  onSearch: (query: string) => void;
}

const Searchbox: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const delay = 1300;
    const debounceSearch = setTimeout(async () => {
      //console.log("searchTerm",searchTerm);
      await onSearch(searchTerm);
    }, delay);

    return () => {
      clearTimeout(debounceSearch);
    };
  }, [searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ser_txt = event.target.value || "";
    //console.log(ser_txt);
    setSearchTerm(ser_txt);
  };

  return (


    // <div className="relative mt-[3px] flex h-[61px] w-fit flex-grow items-center justify-around gap-3 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-fit md:flex-grow-0 md:gap-1 xl:w-fit xl:gap-3">
    // <div className="relative mt-[3px] resserc flex  h-[61px] w-fit xxl:flex-grow items-center justify-around gap-3 rounded bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-fit md:flex-grow-0 md:gap-1 xl:w-fit xl:gap-3">
      <div className="flex h-full resserc items-center rounded text-navy-700 dark:bg-navy-900 dark:text-white ">
        {/* <p className="pl-3 pr-2 text-xl">
          <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
        </p> */}
        {/* <input
          type="text"
          name="searchVal"
          value={searchTerm}
          placeholder="Search name"
          onChange={handleInputChange}
          className="block h-full w-full rounded text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
        /> */}
        <div className="relative">
         <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input 
        type="search"
        //  id="default-search"
name="searchVal"
         className="block w-full p-2.5  outline-none ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         placeholder="Search..." 
         onChange={handleInputChange}

          />
          </div>
      </div>
    //  </div >

  );
};

export default Searchbox;


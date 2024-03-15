import {
  PaginationState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import Card from "components/card";
import DivLoader from "components/divloader/DivLoader";
import React, { useEffect, useState } from "react";
import { TruncateCopy } from "../../organizations/components/CreateOrgModal";
import { ClientRowObj } from "../page";
import ArrangeClientModal from "./ArrangeClientModal";
import CreateClientGatewaysModal from "./CreateClientGatewaysModal";
import CreateClientModal from "./CreateClientModal";
import DeleteClientModal from "./DeleteClientModal";
import { FiSearch } from "react-icons/fi";
import ShortTruncateCopy from "components/common/ShortTruncateCopy";
import Searchbox from "components/fields/Searchbox";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import Pagination from "components/pagination";

function ClientsTable(props: {
  tableData: any;
  fetchClients: () => void;
  isLoading: boolean;
  roleData?: any;
  page: number;
  setPage: any;
  totalpage: number;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  setPageSize: any;
  allGateways: any;
  onValueChange: (value: string) => void;
}) {
  const {
    tableData,
    fetchClients,
    roleData,
    page,
    setPage,
    currentPage,
    totalpage,
    totalItems,
    pageSize,
    setPageSize,
    allGateways,
    onValueChange,
  } = props;
  let defaultData = tableData;
  // console.log("defaultData", defaultData);

  const [{ pageIndex }, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const pagination = React.useMemo(() => ({
    pageIndex,
    pageSize,
  }), [pageIndex, pageSize],
  );

  const columns = [
    columnHelper.accessor("org_name", {
      id: "org_name",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          Organization Name
        </p>
      ),
      //@ts-ignore
      cell: (info: any) => (
        <div className="flex items-center">
          <p className="text-sm font-normal text-navy-700 dark:text-white">
            {info?.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">NAME</p>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          <p className="text-sm font-normal text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("client_id", {
      id: "client_id",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          CLIENT ID
        </p>
      ),
      cell: (info: any) => {
        //return <TruncateCopy info={info} />;
        return <ShortTruncateCopy info={info?.getValue()} showCopy={true} />;
      },
    }),
    columnHelper.accessor("client_secret", {
      id: "client_secret",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          CLIENT SECRET
        </p>
      ),
      cell: (info: any) => {
        return <ShortTruncateCopy info={info?.getValue()} showCopy={true} />;
      },
    }),
    columnHelper.accessor("client_id", {
      id: "client_id",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          ACTION
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center gap-4 text-sm font-bold">
          {roleData?.[0]?.client?.value?.client_gateway_settings && (
            <CreateClientGatewaysModal
              fetchClients={fetchClients}
              id={info.getValue()}
              assigned_payment_methods={info?.cell?.row?.original}
            />
          )}
          {roleData?.[0]?.client?.value?.client_gateway_routing && (
            <ArrangeClientModal
              id={info.getValue()}
              value={info?.row?.original}
            />
          )}
          <CreateClientModal
            fetchClients={fetchClients}
            id={info.getValue()}
            roleData={roleData}
            allGateways={allGateways}
          />
          <CreateClientModal
            fetchClients={fetchClients}
            id={info.getValue()}
            info={true}
            roleData={roleData}
            allGateways={allGateways}
          />
          {roleData?.[0]?.client?.value?.delete_client && (
            <DeleteClientModal
              fetchClients={fetchClients}
              id={info.getValue()}
            />
          )}
        </div>
      ),
    }),
  ]; // eslint-disable-next-line
  const columnsNonAction = [
    columnHelper.accessor("org_name", {
      id: "org_name",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          Organization Name
        </p>
      ),
      //@ts-ignore
      cell: (info: any) => (
        <div className="flex items-center">
          <p className="text-sm font-normal text-navy-700 dark:text-white">
            {info?.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">NAME</p>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          <p className="text-sm font-normal text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("client_id", {
      id: "client_id",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          CLIENT ID
        </p>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          <p className="text-sm font-bold text-navy-700 dark:text-black">
            <TruncateCopy info={info} />
          </p>
        </div>

      ),
    }),
    columnHelper.accessor("client_secret", {
      id: "client_secret",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          CLIENT SECRET
        </p>
      ),
      cell: (info: any) => {
        return <TruncateCopy info={info} />;
      },
    }),
  ]; // eslint-disable-next-line

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [data, setData] = React.useState(() => [...defaultData]);
  const [searchVal, setSearchVal] = useState<any>("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const dataVal = tableData?.filter((item: any) => {
      // console.log('item', item)
      return searchVal.toLowerCase() === ""
        ? item
        : item.name.toLowerCase().includes(searchVal);
    });

    // if (searchVal.length > 0) {
    //   setData(dataVal);
    // } else {
    //   setData(tableData);
    // }
    setData(tableData)
  }, [tableData, searchVal]);

  // console.log('data', data)
  console.log("List called")

  const table = useReactTable({
    data,
    columns:
      roleData?.[0]?.client?.value?.client_gateway_settings ||
        roleData?.[0]?.client?.value?.client_gateway_routing ||
        roleData?.[0]?.client?.value?.delete_client ||
        roleData?.[0]?.client?.value?.edit_client ||
        roleData?.[0]?.client?.value?.view_client
        ? columns
        : columnsNonAction,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const handleValueChange = (e: any) => {

    onValueChange(e);
    setSearchVal(e);
  };

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      {/* <header className="relative flex items-center justify-between pt-5"> */}
      <header className="relative flex items-center justify-between pt-5 flex-wrap">
        <div className="">
        <Searchbox onSearch={handleValueChange} />
        </div>
        {/* <div className=" flex items-start justify-center">
          <select className="mb-3  flex items-center justify-center text-sm font-bold text-gray-900 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
            <option value="organization">Organization</option>
          </select>
        </div> */}
      
        <CreateClientModal
          fetchClients={fetchClients}
          roleData={roleData}
          allGateways={allGateways}
        />
      </header>

      <div className="mt-4  overflow-x-auto scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-xl scrollbar-h-1.5 relative overflow-x-auto shadow-md sm:rounded-lg">
        {props.isLoading ? (
          <DivLoader className="m-5 h-6 w-6 border-indigo-500" />
        ) : (
          <table className="w-full w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400 ">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  // className="!border-px !border-gray-400"
                  className=""
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start p-2"
                      >
                        <div className="items-center justify-between text-xs text-gray-200 ">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: "",
                            desc: "",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody >
              {table.getRowModel().rows?.length > 0 ? table.getRowModel().rows.map((row) => {
                // console.log('row', row)
                return (
                  <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] border-white/0 py-3  pr-4 p-2 font-normal text-gray-900"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              }) :

                <tr>
                  <td colSpan={5} >
                    <p className="text-center p-4" >No records found.</p>
                  </td>

                </tr>

              }


            </tbody>
          </table>
        )}
      </div>

      <Pagination
        setPage={setPage}
        page={page}
        totalpage={totalpage}
        currentPage={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        arraySize={[50, 100, 200]}
      />
    </Card>
  );
}

export default ClientsTable;
const columnHelper = createColumnHelper<ClientRowObj>();

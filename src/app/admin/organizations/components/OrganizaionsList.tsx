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
import React from "react";
import { OrgRowObj } from "../page";
import CreateOrgModal from "./CreateOrgModal";
import DeleteOrgModal from "./DeleteOrgModal";
import Searchbox from "components/fields/Searchbox";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import Pagination from "components/pagination";


function OrgTable(props: {
  tableData: any;
  fetchOrganizations: () => void;
  allGateways: any;
  isLoading: boolean;
  roleData: any;
  page: number;
  setPage: any;
  totalpage: number;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  setPageSize: any;
  onValueChange: (value: string) => void;
}) {
  const {
    tableData,
    fetchOrganizations,
    allGateways,
    roleData,
    page,
    setPage,
    totalpage,
    totalItems,
    currentPage,
    pageSize,
    setPageSize,
    onValueChange,
  } = props;
  let defaultData = tableData;

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
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">NAME</p>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          <p className="text-sm  text-gray-800 text-gray-800 text-neutral-800 text-gray-800 font-normal font-normal font-normal font-normal font-normal font-normal ">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">EMAIL</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-800 font-normal font-normal font-normal font-normal font-normal font-normal dark:text-white">
          <a href={`mailto:${info.getValue()}`}> {info.getValue()}</a>
        </p>
      ),
    }),
    columnHelper.accessor("phone", {
      id: "phone",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">PHONE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-800 font-normal font-normal font-normal font-normal font-normal font-normal dark:text-white">
          <a href={`tel:${info.getValue()}`}> {info.getValue()}</a>
          {/* {info.getValue()} */}
        </p>
      ),
    }),
    columnHelper.accessor("description", {
      id: "description",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          DESCRIPTION
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-800 font-normal font-normal font-normal font-normal font-normal font-normal dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("created_at", {
      id: "created_at",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          CREATED AT
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-800 font-normal font-normal font-normal font-normal font-normal font-normal dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          ACTION
        </p>
      ),
      cell: (info) => (
        <p className="flex items-center gap-3 text-sm font-bold">
          <CreateOrgModal
            fetchOrganizations={fetchOrganizations}
            allGateways={allGateways}
            id={info.getValue()}
            roleData={roleData}
          />
          <CreateOrgModal
            fetchOrganizations={fetchOrganizations}
            id={info.getValue()}
            allGateways={allGateways}
            info={true}
            roleData={roleData}
          />
          {roleData?.[0]?.organization?.value?.delete_organization && (
            <DeleteOrgModal
              fetchOrganizations={fetchOrganizations}
              id={info.getValue()}
              name={info?.row?.original?.name ?? ""}
            />
          )}
        </p>
      ),
    }),
  ]; // eslint-disable-next-line
  const columnsNonAction = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">NAME</p>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          <p className="text-sm text-gray-800 text-gray-800  font-normal font-normal font-normal font-normal font-normal font-normal dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">EMAIL</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-800 font-normal font-normal font-normal font-normal font-normal font-normal dark:text-white">
          <a href={`mailto:${info.getValue()}`}> {info.getValue()}</a>
        </p>
      ),
    }),
    columnHelper.accessor("phone", {
      id: "phone",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">PHONE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-800 font-normal font-normal font-normal font-normal font-normal font-normal dark:text-white">
          <a href={`tel:${info.getValue()}`}> {info.getValue()}</a>
          {/* {info.getValue()} */}
        </p>
      ),
    }),
    columnHelper.accessor("description", {
      id: "description",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          DESCRIPTION
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-800 font-normal font-normal font-normal font-normal font-normal font-normal dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("created_at", {
      id: "created_at",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          CREATED AT
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-800 font-normal font-normal font-normal font-normal font-normal font-normal font-normal dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchVal, setSearchVal] = React.useState<any>("");
  const [data, setData] = React.useState(() => [...defaultData]);

  React.useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const table = useReactTable({
    data,
    columns:
      roleData?.[0]?.organization?.value?.view_organization ||
        roleData?.[0]?.organization?.value?.edit_organization ||
        roleData?.[0]?.organization?.value?.delete_organization
        ? columns
        : columnsNonAction,
    state: {
      //pagination,
      sorting,
    },
    //onPaginationChange: setPagination,
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
    <Card extra={"w-full h-full sm:overflow-auto px-6 bg-white"}>
      {/* <header className="relative flex items-center justify-between pt-5"> */}
      <header className="relative flex items-center justify-between pt-5 flex-wrap">
        {/* <div className="text-xl font-bold text-gray-800 font-normal font-normal font-normal font-normal font-normal font-normal font-normal dark:text-white">
          All Organizations
        </div> */}
        {/* <CardMenu /> */}
        <div className=" my-2 ">

        <Searchbox  onSearch={handleValueChange} />
        </div>
        <div className=" my-2 ">
        <CreateOrgModal
          fetchOrganizations={fetchOrganizations}
          allGateways={allGateways?.filter((f: any) => f?.is_active)}
          roleData={roleData}

        />
      </div>
        
      </header>

      <div className="mt-4 overflow-x-scroll xl:overflow-x-hidden relative overflow-x-auto shadow-md sm:rounded-lg ">
        {props.isLoading ? (
          <DivLoader className="m-5 h-6 w-6 border-indigo-500" />
        ) : (
          <table className="w-full w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="!border-px !border-gray-400 "
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start p-2"
                      >
                        <div className="items-center justify-between text-xs text-gray-200">
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
                return (
                  <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] border-white/0 py-3  pr-4 p-2 opacity-100 "
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
              })

                :

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

export default OrgTable;
const columnHelper = createColumnHelper<OrgRowObj>();

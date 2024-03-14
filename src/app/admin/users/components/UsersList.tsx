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
import CreateUserModal from "./CreateUserModal";
import DeleteUserModal from "./DeleteUserModal";
import { UserRowObj } from "../page";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import Searchbox from "components/fields/Searchbox";
import Pagination from "components/pagination";

function UsersTable(props: {
  tableData: any;
  fetchUsers: () => void;
  isLoading: boolean;
  page: number;
  setPage: any;
  totalpage: number;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  setPageSize: any;
  organizations: any;
  roleData: any;
  roleDataDrop?: any;
  onValueChange: (value: string) => void;
}) {
  const {
    tableData,
    fetchUsers,
    page,
    setPage,
    currentPage,
    totalpage,
    totalItems,
    pageSize,
    setPageSize,
    organizations,
    roleData,
    roleDataDrop,
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
    columnHelper.accessor("first_name", {
      id: "first_name",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          FIRST NAME
        </p>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          <p className="text-sm font-normal text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("last_name", {
      id: "last_name",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          LAST NAME
        </p>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          <p className="text-sm font-normal text-navy-700 dark:text-white">
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
        <p className="text-sm font-normal text-navy-700 dark:text-white">
          <a href={`mailto:${info.getValue()}`}> {info.getValue()}</a>
        </p>
      ),
    }),
    columnHelper.accessor("role", {
      id: "role",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">ROLE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-normal text-navy-700 dark:text-white">
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
        <p className="text-sm font-normal text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("auth_2fa", {
      id: "auth_2fa",
      header: () => (
        <p className="ml-9 text-sm font-bold text-gray-900 dark:text-white">
          2FA
        </p>
      ),
      cell: (info) =>
        info.getValue() ? (
          <MdCheckCircle className="ml-9 h-5 w-5 text-teal-500" />
        ) : (
          <MdCancel className="ml-9 h-5 w-5 text-red-500" />
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
          <CreateUserModal
            fetchUsers={fetchUsers}
            id={info.getValue()}
            data={info.row?.original}
            organizations={organizations}
            roleDataDrop={roleDataDrop}
            roleData={roleData}
          />
          <CreateUserModal
            fetchUsers={fetchUsers}
            id={info.getValue()}
            is_info={true}
            data={info.row?.original}
            organizations={organizations}
            roleDataDrop={roleDataDrop}
            roleData={roleData}
          />
          {roleData?.[0]?.user?.value?.delete_user && (
            <DeleteUserModal
              fetchUsers={fetchUsers}
              id={info.getValue()}
              name={
                info?.row?.original?.first_name +
                " " +
                info?.row?.original?.last_name ?? ""
              }
            />
          )}
        </p>
      ),
    }),
  ]; // eslint-disable-next-line
  const columnsNonAction = [
    columnHelper.accessor("first_name", {
      id: "first_name",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          FIRST NAME
        </p>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("last_name", {
      id: "last_name",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          LAST NAME
        </p>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          <p className="text-sm font-bold text-navy-700 dark:text-white">
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
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          <a href={`mailto:${info.getValue()}`}> {info.getValue()}</a>
        </p>
      ),
    }),
    columnHelper.accessor("role", {
      id: "role",
      header: () => (
        <p className="text-sm font-bold text-gray-900 dark:text-white">ROLE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
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
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("auth_2fa", {
      id: "auth_2fa",
      header: () => (
        <p className="ml-9 text-sm font-bold text-gray-900 dark:text-white">
          2FA
        </p>
      ),
      cell: (info) =>
        info.getValue() ? (
          <MdCheckCircle className="ml-9 h-5 w-5 text-teal-500" />
        ) : (
          <MdCancel className="ml-9 h-5 w-5 text-red-500" />
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
      roleData?.[0]?.user?.value?.delete_user ||
        roleData?.[0]?.user?.value?.edit_user ||
        roleData?.[0]?.user?.value?.view_user
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

  //console.log("table",table.state.pagination.previousPage);

  const handleValueChange = (e: any) => {
    onValueChange(e);
    setSearchVal(e);
  };

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      {/* <header className="relative flex items-center justify-between pt-5"> */}
      {/* <header className="relative flex flex-wrap items-center justify-between pt-5 flex-fill "> */}
      <header className="relative flex items-center justify-between pt-5 flex-wrap">
        {/* <div className="text-xl font-bold text-navy-700 dark:text-white">
          All User
        </div> */}
        {/* <CardMenu /> */}
        <div>
        <Searchbox onSearch={handleValueChange} />

        </div>
        <div className="mt-3 ">
        <CreateUserModal
          fetchUsers={fetchUsers}
          organizations={organizations}
          roleDataDrop={roleDataDrop}
          roleData={roleData}
        />
      </div>
      </header>

      <div className="mt-4 overflow-x-auto scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-xl scrollbar-h-1.5 relative overflow-x-auto shadow-md sm:rounded-lg">
        {props.isLoading ? (
          <DivLoader className="m-5 h-6 w-6 border-indigo-500" />
        ) : (
          // <table className="w-full w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          //   <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

            <table className="w-full w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="!border-px !border-gray-400"
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
            <tbody>
              {table.getRowModel().rows?.length > 0 ? table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] border-white/0 py-3  pr-4 p-2"
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
                  <td colSpan={7} >
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

export default UsersTable;
const columnHelper = createColumnHelper<UserRowObj>();

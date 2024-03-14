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
  import { PaymentMethodRowObj } from "./layout";
  import CreatePaymentMethoddModal from "./CreateRoleMethod";
  import Pix from "../../../../assets/img/payment-clients/pix.png";
  import Stripe from "../../../../assets/img/payment-clients/stripe.png";
  import Blumon from "../../../../assets/img/payment-clients/blumon.png";
  import Sipe from "../../../../assets/img/payment-clients/sipe.png";
  import { MdCancel, MdCheckCircle, MdCheckCircleOutline } from "react-icons/md";
  import { AiOutlineCloseCircle } from "react-icons/ai";
  import DeleteRoleModal from "./DeleteRoleModal";
  import Pagination from "components/pagination";
import CreateRoleMethod from "./CreateRoleMethod";
  

  function RoleMethodTable(props: {
    tableData: any;
    fetchRole: () => void;
    isLoading: boolean;
    page: number;
    setPage: any;
    totalpage: number;
    totalItems: number;
    currentPage: number;
    pageSize: number;
    setPageSize: any;
    singleRoleData: any;
  }) {
    const {
      tableData,
      fetchRole,
      page,
      setPage,
      currentPage,
      totalpage,
      totalItems,
      pageSize,
      setPageSize,
      singleRoleData,
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
        id: "username",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            Role name
          </p>
        ),
        cell: (info: any) => (
          <div className="flex items-center">
            <p className="text-sm font-bold text-gray-800 text-gray-800 font-normal dark:text-white">
              {info?.row?.original?.role_name}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            Dashboard
          </p>
        ),
        cell: (info: any) => (
          <p className="text-sm font-bold text-gray-800 dark:text-white">
            {info?.row?.original?.dashboard?.status === "all" ? (
              <MdCheckCircle className="h-5 w-5 text-teal-500" />
            ) : info?.row?.original?.dashboard?.status === "partial" ? (
              <MdCheckCircle className="h-5 w-5 text-orange-400" />
            ) : (
              <MdCancel className="h-5 w-5 text-red-500" />
            )}
          </p>
        ),
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            Client
          </p>
        ),
        cell: (info: any) => (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info?.row?.original?.client?.status === "all" ? (
              <MdCheckCircle className="h-5 w-5 text-teal-500" />
            ) : info?.row?.original?.client?.status === "partial" ? (
              <MdCheckCircle className="h-5 w-5 text-orange-400" />
            ) : (
              <MdCancel className="h-5 w-5 text-red-500" />
            )}
          </p>
        ),
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            Organization
          </p>
        ),
        cell: (info: any) => (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info?.row?.original?.organization?.status === "all" ? (
              <MdCheckCircle className="h-5 w-5 text-teal-500" />
            ) : info?.row?.original?.organization?.status === "partial" ? (
              <MdCheckCircle className="h-5 w-5 text-orange-400" />
            ) : (
              <MdCancel className="h-5 w-5 text-red-500" />
            )}
          </p>
        ),
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            Payment
          </p>
        ),
        cell: (info: any) => (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info?.row?.original?.payment?.status === "all" ? (
              <MdCheckCircle className="h-5 w-5 text-teal-500" />
            ) : info?.row?.original?.payment?.status === "partial" ? (
              <MdCheckCircle className="h-5 w-5 text-orange-400" />
            ) : (
              <MdCancel className="h-5 w-5 text-red-500" />
            )}
          </p>
        ),
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">User</p>
        ),
        cell: (info: any) => (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info?.row?.original?.user?.status === "all" ? (
              <MdCheckCircle className="h-5 w-5 text-teal-500" />
            ) : info?.row?.original?.user?.status === "partial" ? (
              <MdCheckCircle className="h-5 w-5 text-orange-400" />
            ) : (
              <MdCancel className="h-5 w-5 text-red-500" />
            )}
          </p>
        ),
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            Payment Method
          </p>
        ),
        cell: (info: any) => (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info?.row?.original?.payment_method?.status === "all" ? (
              <MdCheckCircle className="h-5 w-5 text-teal-500" />
            ) : info?.row?.original?.payment_method?.status === "partial" ? (
              <MdCheckCircle className="h-5 w-5 text-orange-400" />
            ) : (
              <MdCancel className="h-5 w-5 text-red-500" />
            )}
          </p>
        ),
      }),
  
      columnHelper.accessor("name", {
        id: "name",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">Role</p>
        ),
        cell: (info: any) => (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info?.row?.original?.role?.status === "all" ? (
              <MdCheckCircle className="h-5 w-5 text-teal-500" />
            ) : info?.row?.original?.role?.status === "partial" ? (
              <MdCheckCircle className="h-5 w-5 text-orange-400" />
            ) : (
              <MdCancel className="h-5 w-5 text-red-500" />
            )}
          </p>
        ),
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">Subscription</p>
        ),
        cell: (info: any) => (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info?.row?.original?.subscription?.status === "all" ? (
              <MdCheckCircle className="h-5 w-5 text-teal-500" />
            ) : info?.row?.original?.subscription?.status === "partial" ? (
              <MdCheckCircle className="h-5 w-5 text-orange-400" />
            ) : (
              <MdCancel className="h-5 w-5 text-red-500" />
            )}
          </p>
        ),
      }),
      columnHelper.accessor("name", {
        id: "id",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            ACTION
          </p>
        ),
        cell: (info: any) => (
          <p className="flex items-center gap-3 text-sm font-bold">
            <CreatePaymentMethoddModal
              fetchRole={fetchRole}
              id={info?.row?.original?.id}
              data={info.row?.original}
              singleRoleData={singleRoleData}
            />
            <CreatePaymentMethoddModal
              fetchRole={fetchRole}
              is_info={true}
              id={info?.row?.original?.id}
              data={info.row?.original}
              singleRoleData={singleRoleData}
            />
            {singleRoleData?.[0]?.role?.value?.delete_role && (
              <DeleteRoleModal
                fetchRole={fetchRole}
                id={info?.row?.original?.id}
                name={info?.row?.original?.role_name ?? ""}
              />
            )}
          </p>
        ),
      }),
    ]; // eslint-disable-next-line
    const columnsNonAction = [
      columnHelper.accessor("name", {
        id: "username",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            Role name
          </p>
        ),
        cell: (info: any) => (
          <div className="flex items-center">
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              {info?.row?.original?.role_name}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            Client
          </p>
        ),
        cell: (info: any) => (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info?.row?.original?.client?.status === "all" ? (
              <MdCheckCircle className="h-5 w-5 text-teal-500" />
            ) : info?.row?.original?.client?.status === "partial" ? (
              <MdCheckCircle className="h-5 w-5 text-orange-400" />
            ) : (
              <MdCancel className="h-5 w-5 text-red-500" />
            )}
          </p>
        ),
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            Organization
          </p>
        ),
        cell: (info: any) => (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info?.row?.original?.organization?.status === "all" ? (
              <MdCheckCircle className="h-5 w-5 text-teal-500" />
            ) : info?.row?.original?.organization?.status === "partial" ? (
              <MdCheckCircle className="h-5 w-5 text-orange-400" />
            ) : (
              <MdCancel className="h-5 w-5 text-red-500" />
            )}
          </p>
        ),
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            Transaction
          </p>
        ),
        cell: (info: any) => (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info?.row?.original?.payment?.status === "all" ? (
              <MdCheckCircle className="h-5 w-5 text-teal-500" />
            ) : info?.row?.original?.payment?.status === "partial" ? (
              <MdCheckCircle className="h-5 w-5 text-orange-400" />
            ) : (
              <MdCancel className="h-5 w-5 text-red-500" />
            )}
          </p>
        ),
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">User</p>
        ),
        cell: (info: any) => (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info?.row?.original?.user?.status === "all" ? (
              <MdCheckCircle className="h-5 w-5 text-teal-500" />
            ) : info?.row?.original?.user?.status === "partial" ? (
              <MdCheckCircle className="h-5 w-5 text-orange-400" />
            ) : (
              <MdCancel className="h-5 w-5 text-red-500" />
            )}
          </p>
        ),
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            Gateway
          </p>
        ),
        cell: (info: any) => (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info?.row?.original?.payment_method?.status === "all" ? (
              <MdCheckCircle className="h-5 w-5 text-teal-500" />
            ) : info?.row?.original?.payment_method?.status === "partial" ? (
              <MdCheckCircle className="h-5 w-5 text-orange-400" />
            ) : (
              <MdCancel className="h-5 w-5 text-red-500" />
            )}
          </p>
        ),
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">Role</p>
        ),
        cell: (info: any) => (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info?.row?.original?.role?.status === "all" ? (
              <MdCheckCircle className="h-5 w-5 text-teal-500" />
            ) : info?.row?.original?.role?.status === "partial" ? (
              <MdCheckCircle className="h-5 w-5 text-orange-400" />
            ) : (
              <MdCancel className="h-5 w-5 text-red-500" />
            )}
          </p>
        ),
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: () => (
          <p className="text-sm font-bold text-gray-900 dark:text-white">Subscription</p>
        ),
        cell: (info: any) => (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info?.row?.original?.subscription?.status === "all" ? (
              <MdCheckCircle className="h-5 w-5 text-teal-500" />
            ) : info?.row?.original?.subscription?.status === "partial" ? (
              <MdCheckCircle className="h-5 w-5 text-orange-400" />
            ) : (
              <MdCancel className="h-5 w-5 text-red-500" />
            )}
          </p>
        ),
      }),
    ]; // eslint-disable-next-line
  
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [data, setData] = React.useState(() => [...defaultData]);
  
    React.useEffect(() => {
      setData(tableData);
    }, [tableData]);
  
  
    const table = useReactTable({
      data,
      columns:
        singleRoleData?.[0]?.role?.value?.view_role ||
          singleRoleData?.[0]?.role?.value?.delete_role ||
          singleRoleData?.[0]?.role?.value?.edit_role
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
  
    return (
      <Card extra={"w-full h-full sm:overflow-auto px-6"}>
        {/* <header className="relative flex items-center justify-between pt-5"> */}
        <header className="relative flex items-center justify-between pt-5 flex-wrap">
  
          {/* <div className="text-xl font-bold text-navy-700 dark:text-white">
            Role
          </div> */}
          {/* <CardMenu /> */}
<div>

</div>
          <div className="my-2">
        <CreateRoleMethod
          fetchRole={fetchRole}
          singleRoleData={singleRoleData}
        />
      </div>
        </header>
  
        <div className="mt-4 overflow-x-auto scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-xl scrollbar-h-1.5 relative overflow-x-auto shadow-md sm:rounded-lg ">
          {props.isLoading ? (
            <DivLoader className="m-5 h-6 w-6 border-indigo-500" />
          ) : (
            // <table className="w-full w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            //   <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <table className="w-full w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
                {table.getHeaderGroups().map((headerGroup: any) => (
                  <tr
                    key={headerGroup.id}
                    className="!border-px !border-gray-400"
                  >
                    {headerGroup.headers.map((header: any) => {
                      return (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          onClick={header.column.getToggleSortingHandler()}
                          // className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start p-2"
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
                {table.getRowModel().rows.map((row: any) => {
                  return (
                    <tr key={row.id} className="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      {row.getVisibleCells().map((cell: any) => {
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
                })}
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
  
  export default RoleMethodTable;
  const columnHelper = createColumnHelper<PaymentMethodRowObj>();
  
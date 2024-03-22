"use client"
import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import CreateRoleMethod from "./components/CreateRoleMethod";
import RoleMethodTable from "./components/RoleMethodTable";
import { getAllUsersData } from "api/users";
import { getRolePermission, getSingleRole } from "api/role";
import { getId } from "utils/auth";
import { ClientContext } from "clientProvider";
// import { ClientContext } from "./ider";

export type PaymentMethodRowObj = {
  id: string;
  name: string;
  logo: string;
  payments: boolean;
  authorization: boolean;
  payout: boolean;
  is_active: boolean;
};


const Role = () => {
  const [roleData, setRoleData] = useState<any>([]);
  const [userData, setUserData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [page, setPage] = useState<number>(1);
  const [totalpage, setTotalPage] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { singleRoleData, setSingleRoleData } = useContext(ClientContext);

  const fetchRole = () => {
    setIsLoading(true);
    if (pageSize === null || pageSize === undefined) {
      setIsLoading(false);
      return;
    }
    getRolePermission(page,
      pageSize,)
      .then((data) => {
        setRoleData(data?.[0] ?? []);
        setTotalPage(data?.[1]?.total_pages);
        setTotalItems(data?.[1]?.total_items);
        setCurrentPage(data?.[1]?.current_page);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
            "Something went wrong while fetching role"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const fetchSingleRole = () => {
    // setIsLoading(true);
    getSingleRole(getId())
      .then((data) => {
        setSingleRoleData(data ?? []);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
            "Something went wrong while fetching role"
        );
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchRole();
  }, [page, pageSize]);

  useEffect(() => {
    fetchSingleRole();
  }, []);

  return (
    <>
      {/* <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <CreateRoleMethod
          fetchRole={fetchRole}
          singleRoleData={singleRoleData}
        />
      </div> */}
      <div className="mt-5">
        <RoleMethodTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          tableData={roleData}
          fetchRole={fetchRole}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          totalpage={totalpage}
          totalItems={totalItems}
          currentPage={currentPage}
          singleRoleData={singleRoleData}
        />
      </div>
    </>
  );
};

export default Role;

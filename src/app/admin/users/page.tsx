"use client"
import { getAllUsers } from "api/users";
import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import CreateUserModal from "./components/CreateUserModal";
import UsersTable from "./components/UsersList";
import { getAllOrganizations } from "api/organizations";
import { getRoleDrop, getSingleRole } from "api/role";
import { getId } from "utils/auth";
import { ClientContext } from "clientProvider";

export type UserRowObj = {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  id: string;
  password: string;
  organizations: any;
  auth_2fa: boolean;
};

const Users = () => {
  const [users, setUsers] = useState<UserRowObj[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [page, setPage] = useState<number>(1);
  const [totalpage, setTotalPage] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [roleDataDrop, setRoleDataDrop] = useState<any>([]);
  const [organizations, setOrganizations] = useState<any>([]);
  const { singleRoleData, setSingleRoleData } = useContext(ClientContext);
  const [searchTexts, setSearchTexts] = useState<string>("");


  const fetchOrganizations = () => {
    // setIsLoading(true);
    getAllOrganizations()
      .then((data) => {
        setOrganizations(
          data?.[0]?.map((ele: any) => {
            return { ...ele, id: ele?.id };
          })
        );
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching organizations"
        );
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  const fetchUsers = () => {
    setIsLoading(true);

    if (pageSize === null || pageSize === undefined) {
      setIsLoading(false);
      return;
    }
    const params = { page: page, per_page: pageSize, searchTexts: searchTexts };
    getAllUsers(params)
      .then((data) => {
        setUsers(data?.users ?? []);
        setTotalPage(data.total_pages);
        setTotalItems(data.total_items);
        setCurrentPage(data.current_page);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching organizations"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchRole = () => {
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
  const fetchRoleDrop = () => {
    // setIsLoading(true);
    getRoleDrop()
      .then((data) => {
        if (data?.length > 0) {
          setRoleDataDrop(data ?? []);
        } else {
          setRoleDataDrop([]);
        }
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
    fetchUsers();
    fetchOrganizations();
    fetchRole();
    fetchRoleDrop();
  }, [page, pageSize]);

  const serchboxValueChange = async (searchTerm: string) => {
    const search_txt = searchTerm || "";

    if (search_txt !== searchTexts && searchTexts !== "") {
      await setSearchTexts(search_txt);
      setPage(1);
      setCurrentPage(1);
    } else {
      await setSearchTexts(search_txt);
    }

  }

  useEffect(() => {
    // if(searchTexts!==""){
    fetchSearchs();
    // }
  }, [searchTexts]);

  const fetchSearchs = () => {
    setIsLoading(true);
    fetchUsers();
  }

  return (
    <>
      {/* <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <CreateUserModal
          fetchUsers={fetchUsers}
          organizations={organizations}
          roleDataDrop={roleDataDrop}
          roleData={singleRoleData}
        />
      </div> */}
      <div className="mt-5">
        <UsersTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          tableData={users}
          fetchUsers={fetchUsers}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          totalpage={totalpage}
          totalItems={totalItems}
          currentPage={currentPage}
          organizations={organizations}
          roleData={singleRoleData}
          roleDataDrop={roleDataDrop}
          onValueChange={serchboxValueChange}
        />
      </div>
    </>
  );
};

export default Users;

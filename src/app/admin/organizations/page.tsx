"use client"
import {
  getAllOrganizations,
  getAllOrganizationsUser,
} from "api/organizations";
import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import CreateOrgModal from "./components/CreateOrgModal";
import OrgTable from "./components/OrganizaionsList";
import { getSingleRole } from "api/role";
import { getId } from "utils/auth";
import { getAllGateways } from "api/gateways";
import { ClientContext } from "clientProvider";
// import { ClientContext } from "ClientProvider";

export type OrgRowObj = {
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  website: string;
  created_at: string;
  id: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
};

export type AllGatewayObj = {
  name: string;
  id: string;
};

const Organizations = () => {
  const [organizations, setOrganizations] = useState<OrgRowObj[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [totalpage, setTotalPage] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [allGateways, setAllGateways] = useState<AllGatewayObj[]>([]);
  const { singleRoleData, setSingleRoleData } = useContext(ClientContext);
  const [searchTexts, setSearchTexts] = useState<string>("");

console.log("singleRoleData",singleRoleData)

  const fetchOrganizations = () => {
    setIsLoading(true);
    if (pageSize === null || pageSize === undefined) {
      setIsLoading(false);
      return;
    }
    // getAllOrganizationsUser()
    getAllOrganizations(
      page,
      pageSize,
      searchTexts,
    )
      .then((data) => {
        setOrganizations(
          data?.[0]?.map((ele: any) => {
            return { ...ele, id: ele.id };
          })
        );

        setTotalPage(data?.[1]?.total_pages);
        setTotalItems(data?.[1]?.total_items);
        setCurrentPage(data?.[1]?.current_page);
      })
      .catch((err) => {
        setOrganizations([])
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching organizations"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchAllGateways = () => {
    setIsLoading(true);
    getAllGateways()
      .then((data) => {
        setAllGateways(data?.[0] ? data : []);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching AllGateways"
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
        // alert(JSON.stringify(data))
        setSingleRoleData(data ?? []);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching role"
        );
      })
      .finally(() => {

      });
  };

  useEffect(() => {
    fetchOrganizations();
  }, [page, pageSize]);
  useEffect(() => {
    fetchRole();
  }, []);
  useEffect(() => {
    fetchAllGateways();
  }, []);

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
    fetchOrganizations();
  }
  //console.log("page",pageSize); //return; 
  return (
    <>
      {/* <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <CreateOrgModal
          fetchOrganizations={fetchOrganizations}
          allGateways={allGateways?.filter((f: any) => f?.is_active)}
          roleData={singleRoleData}

        />
      </div> */}
     
      <div className="mt-5 ">
        <OrgTable
          tableData={organizations}
          currentPage={currentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          totalItems={totalItems}
          totalpage={totalpage}
          fetchOrganizations={fetchOrganizations}
          allGateways={allGateways?.filter((f: any) => f?.is_active)}
          isLoading={isLoading}
          roleData={singleRoleData}
          onValueChange={serchboxValueChange}
        />
      </div>
    </>
  );
};

export default Organizations;

"use client"
import { getAllClients, getClients } from "api/clients";
import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import ClientsTable from "./components/ClientsList";
import CreateClientModal from "./components/CreateClientModal";
import { getSingleRole } from "api/role";
import { getAllGateways } from "api/gateways";
import { getId } from "utils/auth";
import { ClientContext } from "clientProvider";

export interface ClientRowObj {
  organization: string;
  name: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  client_id: string;
  client_secret: string;
  org_id: string;
  org_name: string;
}

export type AllGatewayObj = {
  name: string;
  id: string;
};

const Organizations = () => {
  const [clients, setClients] = useState<ClientRowObj[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const { singleRoleData, setSingleRoleData } = useContext(ClientContext);
  const [page, setPage] = useState<number>(1);
  const [totalpage, setTotalPage] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allGateways, setAllGateways] = useState<AllGatewayObj[]>([]);
  const [searchTexts, setSearchTexts] = useState<string>("");

  const fetchClients = () => {
    const params = { page: page, per_page: pageSize, searchTexts: searchTexts };
    if (pageSize === null || pageSize === undefined) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    getClients(params)
      .then((data) => {
        //console.log("cu_page",data?.[1].current_page);
        setClients(data?.[0]);
        setTotalPage(data?.[1].total_pages);
        setTotalItems(data?.[1].total_items);
        setCurrentPage(data?.[1].current_page);
      })
      .catch((err) => {
        setClients([]);

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
    fetchClients();
  }

  useEffect(() => {
    console.log("pageSize", pageSize);
    fetchClients();
    fetchRole();
  }, [page, pageSize]);
  console.log("first", clients)

  return (
    <>
      {/* <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <CreateClientModal
          fetchClients={fetchClients}
          roleData={singleRoleData}
          allGateways={allGateways}
        />
      </div> */}
      <div className="mt-5">
        <ClientsTable
          tableData={clients}
          fetchClients={fetchClients}
          isLoading={isLoading}
          roleData={singleRoleData}
          page={page}
          setPage={setPage}
          totalpage={totalpage}
          totalItems={totalItems}
          currentPage={currentPage}
          pageSize={pageSize}
          allGateways={allGateways}
          setPageSize={setPageSize}
          onValueChange={serchboxValueChange}
        />
      </div>
    </>
  );
};

export default Organizations;

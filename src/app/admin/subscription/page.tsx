"use client"
import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { getId } from "utils/auth";
import { getSingleRole } from "api/role";
import { getAllSubscription, getSubscriptuionsFilter } from "api/subscription";
import { getAllGateways } from "api/gateways";
import SubscriptionList from "./components/subscriptionlist";
//import sampledata from "./components/sampledata";
import { ClientContext } from "clientProvider";


export type SubscriptionObj = {
  start_date: string;
  interval: string;
  duration: number;
  amount: number;
  gateway_hash: string;
  currency: string;
  gateway_name: string;
  descriptor: string;
  paid_payments: number;
  transaction: string;
  billing_cycles: number;
  status: string;
  id: string;
  client: string;
  subscription_id: string;
  payment: any;
  created_at: any,
  next_payment_date: any
};



const Subscription = () => {


  const [subscriptions, setSubscriptions] = useState<SubscriptionObj[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [page, setPage] = useState<number>(1);
  const [totalpage, setTotalPage] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTexts, setSearchTexts] = useState<string>("");
  const [allGateways, setAllGateways] = useState();
  const { singleRoleData, setSingleRoleData } = useContext(ClientContext);

  const [filter, setFilter] = useState({
    clients: [],
    interval: [],
    duration: null,
    status: [],
  });

  const fetchSubscriptions = () => {

    setIsLoading(true);

    if (pageSize === null || pageSize === undefined) {
      setIsLoading(false);
      return;
    }
    const params = { page: page, per_page: pageSize, searchTexts: searchTexts };
    getAllSubscription(params)
      .then((data) => {
        setSubscriptions(data?.subscriptions ?? []);
        setTotalPage(data.total_pages);
        setTotalItems(data.total_items);
        setCurrentPage(data.current_page);
      })
      .catch((err) => {
        setSubscriptions([])
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
        setAllGateways(data);
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
    fetchAllGateways();
  }, []);

  useEffect(() => {
    fetchSubscriptions();

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

  const filterData = () => {
    const status = filter?.status?.map((m: any) => m.value);
    const clients = filter?.clients?.map((m: any) => m.value);
    const interval = filter?.interval?.map((m: any) => m.value);
    const duration = filter?.duration



    // console.log("filter?.dates?.[1]", filter?.dates?.[1]);
    setIsLoading(true);
    getSubscriptuionsFilter(
      page,
      // curretClient === "all" ? "" : curretClient + "/",
      pageSize,
      searchTexts,
      clients,

      interval,
      duration,
      status



    )
      .then((data) => {
        setSubscriptions(data?.subscriptions ?? []);

        //console.log("payments",payments);
        setTotalPage(data.total_pages);
        setTotalItems(data.total_items);
        setCurrentPage(data.current_page);
      })
      .catch((err) => {
        console.log("err",)
        if (err?.response?.status == 404) {
          setSubscriptions([]);

        }

        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching clients"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (page !== 0 && searchTexts === "") {
      if (filter?.status) {
        filterData();
      }
    } else {
      fetchSearchs();
    }
  }, [filter?.status, filter?.clients, filter?.duration, filter?.interval]);

  useEffect(() => {
    // if (searchTexts !== "") {
    fetchSearchs();
    // }
  }, [searchTexts]);

  const fetchSearchs = () => {
    setIsLoading(true);
    fetchSubscriptions();
  }

  //console.log("singleRoleData",singleRoleData);

  return (
    <>
      <div className="mt-5">
        <SubscriptionList

          pageSize={pageSize}
          setPageSize={setPageSize}
          data={subscriptions}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          totalpage={totalpage}
          totalItems={totalItems}
          currentPage={currentPage}
          onValueChange={serchboxValueChange}
          roleData={singleRoleData}
          allGateways={allGateways}
          fetchSubscriptions={fetchSubscriptions}
          filterData={filterData}
          filter={filter}
          setFilter={setFilter}


        />
      </div>
    </>
  )
}

export default Subscription;
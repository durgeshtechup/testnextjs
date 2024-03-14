"use client"
import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
// import PaymentTable from "./components/PaymentsList";
import { getAllPayments, getPaymentsFilter, getCardType, getSearchPayments } from "api/payments";
import { getAllClients } from "api/clients";
import { ClientContext } from "clientProvider";
import { getSingleRole } from "api/role";
import { getAllGateways } from "api/gateways";
import { getId } from "utils/auth";
import { getImage } from "utils/commonFunction";

export type PaymentRowObj = {
  id: string;
  payment_id: string;
  et_id: string;
  amount: string;
  currency: string;
  gateway_id: string;
  gateway_name: string;
  status: string;
  meta_info: string;
  payment_type: string;
  client: string;
  refund_info: string;
  created_at: string;
  image: string;
  all_data: any[];
  expanded: boolean;
  payment_history: any;
};
// interface Filter {
//   status: string;
//   client: Array<any>;
//   dates?: [Date, Date];
//   payment_status?: Array<any>;
//   gateway?: Array<any>;
// }

const Transactions = () => {
  const [payments, setPayments] = useState<PaymentRowObj[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [page, setPage] = useState<number>(0);
  const [totalpage, setTotalPage] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [clients, setClients] = useState();
  const [value, setValue] = useState(false);
  const [curretClient, setCurrentClient] = useState<string>("all");
  const [allGateways, setAllGateways] = useState();
  const [allCardType, setCardType] = useState();
  const [searchTexts, setSearchTexts] = useState<string>("");
  // const [filter, setFilter] = useState<Filter>({
  //   status: "all",
  //   client: [],
  //   dates: null,
  //   payment_status: [],
  //   gateway: [],
  // });
  const { paymentType, singleRoleData, setSingleRoleData, filter, setFilter } =
    useContext(ClientContext);

  const fetchClients = () => {
    setIsLoading(true);
    getAllClients()
      .then((data) => {
        setClients(data);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching clients"
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

  const fetchCardType = () => {
    setIsLoading(true);
    getCardType()
      .then((data) => {
        setCardType(data);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching CardType"
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
    fetchClients();
    fetchRole();
    fetchAllGateways();
    fetchCardType();
  }, []);

  const serchboxValueChange = async (searchTerm: string) => {
    const search_txt = searchTerm || "";

    if (search_txt !== searchTexts && searchTexts !== "") {
      await setSearchTexts(search_txt);
      setPage(1);
    } else {
      await setSearchTexts(search_txt);
    }

  }

  useEffect(() => {
    fetchSearchs();
  }, [searchTexts]);

  const fetchSearchs = () => {
    setIsLoading(true);
    if (pageSize === null || pageSize === undefined) {
      setIsLoading(false);
      return;
    }

    getSearchPayments(
      page,
      curretClient === "all" ? "" : curretClient + "/",
      pageSize,
      searchTexts,
      paymentType
    )
      .then((data) => {
        setPayments(
          Object.entries(data.payments ?? {}).map(([key, value]: any) => {
            //console.log("111",value);
            return {
              ...value[0],
              payment_id: key,
              expanded: false,
              all_data: value,
            };
          })
        );
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
  }


  const fetchPayments = () => {
    setIsLoading(true);
    getAllPayments(
      page,
      curretClient === "all" ? "" : curretClient + "/",
      pageSize,
      paymentType,
      searchTexts
    )
      .then((data) => {
        setPayments(
          Object.entries(data.payments ?? {}).map(([key, value]: any) => {
            //console.log("222",value);
            return {
              ...value[0],
              payment_id: key,
              expanded: false,
              all_data: value,
            };
          })
        );
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

  const filterData = () => {
    const paymentType = filter?.status;
    const client = filter?.client;
    const gateway = filter?.gateway;
    const payment_status = filter?.payment_status;
    const card_type = filter?.card_type;
    const start_date = filter?.dates?.[0];
    const end_date = filter?.dates?.[1];
    const timezone = filter?.timezone;

    console.log("filter?.dates?.[1]", filter?.dates?.[1]);
    setIsLoading(true);
    getPaymentsFilter(
      page,
      // curretClient === "all" ? "" : curretClient + "/",
      pageSize,
      paymentType,
      client,
      gateway,
      card_type,
      payment_status,

      timezone,
      start_date,
      searchTexts,
      end_date
    )
      .then((data) => {
        setPayments(
          Object.entries(data.payments ?? {}).map(([key, value]: any) => {
            //console.log("333",value);
            return {
              ...value[0],
              payment_id: key,
              expanded: false,
              all_data: value,
            };
          })
        );

        //console.log("payments",payments);
        setTotalPage(data.total_pages);
        setTotalItems(data.total_items);
        setCurrentPage(data.current_page);
      })
      .catch((err) => {
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
  }, [filter?.status, page, curretClient, pageSize, value]);

  useEffect(() => {
    setPage(1);
    setPageSize(50);
    setValue(!value);
  }, [paymentType]);

  useEffect(() => {

  }, [paymentType]);

  console.log("payments", payments)

  useEffect(() => {
    if (page !== 0 && searchTexts === "") {
      if (
        filter?.status &&
        filter?.client?.length === 0 &&
        filter?.gateway?.length === 0 &&
        filter?.payment_status?.length === 0 &&
        filter?.card_type?.length === 0 &&
        filter?.dates === null
      ) {
        filterData();
        setPage(1);
      }
    }
  }, [filter]);

  return (

    <>
      <div className="mt-5 pt-5">
        {/* <PaymentTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          tableData={payments}
          fetchPayments={fetchPayments}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          totalpage={totalpage}
          totalItems={totalItems}
          currentPage={currentPage}
          clients={clients}
          allGateways={allGateways}
          allCardType={allCardType}
          curretClient={curretClient}
          setCurrentClient={setCurrentClient}
          roleData={singleRoleData}
          filterData={filterData}
          filter={filter}
          setFilter={setFilter}
          onValueChange={serchboxValueChange}
        /> */}
      </div>
    </>
  );
};

export default Transactions;

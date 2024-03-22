"use client"
import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import CreatePaymentMethoddModal from "./components/CreatePaymentMethod";
import PaymentMethodTable from "./components/PaymentMethodTable";
import { getAllUsers } from "api/users";
import { getAllGateways } from "api/gateways";
import { getTimeZone, getCardType } from "api/payments";
import { getSingleRole } from "api/role";
import { getId } from "utils/auth";
import { ClientContext } from "clientProvider";


export type PaymentMethodRowObj = {
  id: string;
  name: string;
  logo: string;
  payments: boolean;
  authorization: boolean;
  subscription: boolean;
  payout: boolean;
  refund: boolean;
  apm: boolean;
  is_active: boolean;
  direct_debit: boolean;
};

const PaymentMethod = () => {
  const [paymentData, setPaymentData] = useState<PaymentMethodRowObj[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [page, setPage] = useState<number>(1);
  const [totalpage, setTotalPage] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { singleRoleData, setSingleRoleData } = useContext(ClientContext);
  const [searchTexts, setSearchTexts] = useState<string>("");
  const [timeZone, setTimeZone] = useState<any>();
  const [allCardType, setCardType] = useState<any>();


  const fetchUsers = () => {
    setIsLoading(true);
    getAllGateways(
      searchTexts
    )
      .then((data) => {

        setPaymentData(data ?? []);
        setPageSize(data?.length)
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
  const fetchTimeZone = () => {

    getTimeZone()
      .then((data) => {
        //console.log("data",data);
        setTimeZone(data ?? []);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching time zone"
        );
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  const fetchCardType = () => {
    setIsLoading(true);
    //console.log("dataff");
    getCardType()
      .then((data) => {
        //console.log("data",data);
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
    fetchSearchs();
  }, [searchTexts]);

  const fetchSearchs = () => {
    setIsLoading(true);
    fetchUsers();
  }


  useEffect(() => {
    fetchUsers();
    fetchRole();
    fetchTimeZone();
    fetchCardType();
  }, []);


  //console.log("allCardType2",allCardType);
  return (
    <>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <CreatePaymentMethoddModal fetchUsers={fetchUsers} roleData={singleRoleData} />
      </div>
      <div className="mt-5">
        <PaymentMethodTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          tableData={paymentData}
          fetchUsers={fetchUsers}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          totalpage={totalpage}
          totalItems={totalItems}
          currentPage={currentPage}
          roleData={singleRoleData}
          timeZone={timeZone}
          allCardType={allCardType}
          onValueChange={serchboxValueChange}
        />
      </div>
    </>
  );
};

export default PaymentMethod;

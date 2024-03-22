"use client"
import MiniCalendar from "components/calendar/MiniCalendar";
import {
  MdCancel,
  MdCheckCircle,
  MdOutlineReplayCircleFilled,
  MdPayment,
  MdPeople,
  MdTransform,
  MdOutlineError
} from "react-icons/md";
// import TotalSpent from "views/admin/default/components/TotalSpent";

// import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";

import { getAllTabs, getClientDetails, getOrganizationDetails, getTransactionByCurrency } from "api/dashboard";
import { getCardType, getRecentPayments } from "api/payments";
// import Widget from "components/widget/Widget";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
// import ComplexTable from "views/admin/default/components/ComplexTable";
// import TaskCard from "views/admin/default/components/TaskCard";
import { PaymentRowObj } from "../../transactions/page";
// import PaymentsListDashboard from "../payments/components/PaymentsListDashboard";
import TransactionPieChartCard from "./components/TransactionPieChartCard";
import tableDataComplex from "./variables/tableDataComplex";
import ADPaymentsList from "./components/ADPaymentsList";
import { ClientContext } from "clientProvider";
import DivLoader from "components/divloader/DivLoader";
import { getRolePermission, getSingleRole } from "api/role";
import { getId } from "utils/auth";
import TransactionAnalysisPieChartCard from "./components/TransactionAnalysisPieChartCard";
import DateRange from "components/fields/DateRange";
import Select from 'react-select'
import { MultiSelect } from "react-multi-select-component";
import { GrTransaction } from "react-icons/gr";
import Navbar from "components/navbar";
import moment from "moment";
import TotalSpent from "./components/TotalSpent";
import WeeklyRevenue from "./components/WeeklyRevenue";
import Widget from "components/rtl/dashboard/Widget";
import ComplexTable from "./components/ComplexTable";
import TaskCard from "./components/TaskCard";
import PaymentsListDashboard from "app/admin/transactions/components/PaymentsListDashboard";


const Dashboard = () => {



  const { singleRoleData, setSingleRoleData, dashboardData,
    setDashboardData, } = useContext(ClientContext);
  const [timeFrameTop, setTimeFrameTop] = useState<any>("today");
  const [orgDetails, setOrgDetails] = useState<any>([]);
  const [selectOrg, setSelectOrg] = useState<any>([]);
  const [clientDetails, setClientDetails] = useState<any>([]);
  const [selectClient, setSelectClientDetails] = useState<any>([]);

  const [cardDetails, setCardDetails] = useState<any>([]);

  const [selectCard, setSelectCard] = useState<any>([]);


  const [datesTop, setDatesTop] = useState<[Date | null, Date | null]>();



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

  const fetchOrgDetails = () => {
    // setIsLoading(true);
    getOrganizationDetails()
      .then((data) => {

        // setSingleRoleData(data ?? []);
        setOrgDetails(data?.map((d: any) => {
          return {
            ...d?.organization,
            label: d?.organization?.name,
            value: d?.organization?.id
          }
        }))

        setSelectOrg(data?.map((d: any) => {
          return {
            ...d?.organization,
            label: d?.organization?.name,
            value: d?.organization?.id
          }
        }))

        let clientArr: any = []

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

  const fetchClientDetails = () => {
    // setIsLoading(true);
    let data = {
      org_ids: selectOrg?.length > 0 ? selectOrg?.map((m: any) => m?.id)?.toString() : "all"
    }
    getClientDetails(data)
      .then((data) => {

        // setSingleRoleData(data ?? []);
        setClientDetails(data?.map((d: any) => {
          return {
            ...d,
            label: d?.name,
            value: d?.id
          }
        }))

        setSelectClientDetails(data?.map((d: any) => {
          return {
            ...d,
            label: d?.name,
            value: d?.id
          }
        }))

        // let clients = filterOrData[0]?.clients
        let clientArr: any = []
     

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

  const fetchCardTypeDetails = () => {
    // setIsLoading(true);
    getCardType()
      .then((data) => {
        let filterData = data?.map((card: any) => {
          return {
            label: card,
            value: card,

          }
        })

        setCardDetails(filterData)
        setSelectCard(filterData)




      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching card type"
        );
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

 

  useEffect(() => {
    fetchClientDetails()
  }, [selectOrg])

  useEffect(() => {
    fetchSingleRole();
    fetchOrgDetails();
    fetchClientDetails()
    fetchCardTypeDetails()
  }, []);


  let dashboardHeader = singleRoleData[0]?.dashboard?.value?.view_dashboard_header;
  let recentTtransactions = singleRoleData[0]?.dashboard?.value?.view_dashboard_recent_transactions;
  let approvedTransPiechart = singleRoleData[0]?.dashboard?.value?.view_dashboard_approved_transactions_piechart;
  let declinedTransPiechart = singleRoleData[0]?.dashboard?.value?.view_dashboard_declined_transactions_piechart;
  let approvedTransList = singleRoleData[0]?.dashboard?.value?.view_dashboard_approved_transactions_list;
  let declinedTransList = singleRoleData[0]?.dashboard?.value?.view_dashboard_declined_transactions_list;
  let transactionAnaylsis = singleRoleData[0]?.dashboard?.value?.view_dashboard_transaction_anaylsis;
  let wavechart = singleRoleData[0]?.dashboard?.value?.view_dashboard_wavechart;
  let show_paymentName = singleRoleData[0]?.dashboard?.value?.show_dashboard_method_name;

  const handleDateRangeChange = (dateRange: [Date | null, Date | null]) => {
    if (dateRange[0] !== null && dateRange[1] !== null) {
      let a = moment(new Date(dateRange[0])).format("YYYY-MM-DD")
      let b = moment(new Date(dateRange[1])).format("YYYY-MM-DD")
      console.log("Date", [a, b])

      setDatesTop([new Date(a), new Date(b)]);
      setTimeFrameTop('custom');
    } else {
      setTimeFrameTop('today');
      setDatesTop(null);

    }
  };

  const handleOrgSelect = (event: any) => {
    // if (event?.length > 0) {
    //   setSelectOrg(event);
    // } else {
    //   // setSelectOrg(orgDetails);

    // }
    setSelectOrg(event);


  };

  const handleClientSelect = (event: any) => {
    // if (event?.length > 0) {
    //   setSelectClientDetails(event);

    // } else {
    //   // setSelectClientDetails(clientDetails);
    // }
    setSelectClientDetails(event);

  };

  const handleCardSelect = (event: any) => {
    // if (event?.length > 0) {
    //   setSelectCard(event);

    // } else {
    //   // setSelectCard(cardDetails);

    // }
    setSelectCard(event);

  };

  const handleToggle = () => {
    setDashboardData(!dashboardData);
  };
  return (
    <div className="" >



      <div
        className="border mt-3 grid grid-cols-1 p-3 px-3 rounded-[20px]  gap-5 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-5"
        // className="mt-3 w-full flex   rounded-[15px] p-5 justify-between gap-5 overflow-auto "
        style={{
          background: "white",
          // overflowX: "scroll",
          width: "100%",
          // overflowY: "hidden",
          // position: "relative",
          // zIndex: 1



        }}
      >



        <div className="justify-center flex-auto" >

          <label htmlFor="Organization" className="h5  text-sm font-bold text-gray-900 dark:text-white" >Organization</label>
          <MultiSelect
            options={orgDetails}
            value={selectOrg}
            onChange={handleOrgSelect}
            labelledBy={"Organization(s)"}
            isCreatable={false}
            className="my-2"

          />
        </div>
        <div className="justify-center flex-auto" >

          <label htmlFor="Client" className="h5 text-sm font-bold text-gray-900 dark:text-white" >Client</label>

          <MultiSelect
            options={clientDetails}
            value={selectClient}
            onChange={handleClientSelect}
            labelledBy={"Client(s)"}
            isCreatable={false}

            className="my-2"

          />
        </div>
        <div className=" justify-center flex-auto" >
          <label htmlFor="cardType" className="h5 text-sm font-bold text-gray-900 dark:text-white" >Card Type</label>

          <MultiSelect
            options={cardDetails}
            value={selectCard}
            onChange={handleCardSelect}
            labelledBy={"Card Types(s)"}
            isCreatable={false}

            className="my-2"



          />

          
        </div>




        <div className="pt-1">
          <div className="md: justify-start" style={{ background: "white" }} >

            <div className=" mt-5" >
           

              {["today", "yesterday", "weekly", "monthly", "yearly", "all"]?.map((ele: any,index:any) => {
                return (
                  <button
                  key={index}
                    className={`border  rounded-md px-2 py-2 m-1 capitalize outline-none ${timeFrameTop === ele ? "border-blue-500" : "border gray-200"}`}
                    onClick={() => { setTimeFrameTop(ele); }}
                  >
                    {ele}
                  </button>
                )
              })}




            </div>



          </div>
        </div>



        <div className="flex ">

          <div className=" mt-5" >


            <div className="mt-2" style={{ minWidth: "8rem" }} >

              <DateRange onDateChange={(e) => { handleDateRangeChange(e) }} />

            </div>
          </div>
          <div className="mt-5  p-3">
            <label className="relative mb-3 inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                // @ts-ignore
                checked={dashboardData ? true : false}
                onChange={handleToggle}
              />

              <div className="peer h-6 w-11 rounded-full bg-gray-400 after:absolute after:left-[2px] after:top-[4px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-indigo-800" />

              <span className="ml-3 text-lg font-medium text-gray-900 dark:text-gray-300">
                {dashboardData ? "Live" : "Test"}
              </span>
            </label>
          </div>
        </div>

        <div>



         

        </div>
      </div>
   
      <br />

      {dashboardHeader ? (
        <InfoTabs selectOrg={selectOrg} selectClient={selectClient} selectCard={selectCard} datesTop={datesTop} timeFrameTop={timeFrameTop} />
      ) : null}






      <div className="mb-6 mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
        {recentTtransactions ? (
          <LatestPayments selectOrg={selectOrg} selectClient={selectClient} selectCard={selectCard} datesTop={datesTop} timeFrameTop={timeFrameTop} paymentName={show_paymentName} />
        ) : null}
        {approvedTransPiechart || declinedTransPiechart ? (
          <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
            {approvedTransPiechart ? (
              <TransactionPieChartCard type="approved" selectOrg={selectOrg} selectClient={selectClient} selectCard={selectCard} datesTop={datesTop} timeFrameTop={timeFrameTop} />
            ) : null}
            {declinedTransPiechart ? (
              <TransactionPieChartCard type="decline" selectOrg={selectOrg} selectClient={selectClient} selectCard={selectCard} datesTop={datesTop} timeFrameTop={timeFrameTop} />
            ) : null}
          </div>
        ) : null}

        {/*<div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">*/}
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
        {(approvedTransList && timeFrameTop) ? (<AllADPayments type="approved" selectOrg={selectOrg} selectClient={selectClient} selectCard={selectCard} datesTop={datesTop} timeFrameTop={timeFrameTop} />) : null}
        {(declinedTransList && timeFrameTop) ? (<AllADPayments type="decline" selectOrg={selectOrg} selectClient={selectClient} selectCard={selectCard} datesTop={datesTop} timeFrameTop={timeFrameTop} />) : null}
     </div>
        {/*</div>*/}


        {/*<div className="my-5 grid grid-cols-1 gap-5 md:grid-cols-2">*/}
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
        {wavechart ? (<TotalSpent selectOrg={selectOrg} selectClient={selectClient} selectCard={selectCard} datesTop={datesTop} timeFrameTop={timeFrameTop} />) : null}
        {transactionAnaylsis ? (<TransactionAnalysisPieChartCard type="approved" selectOrg={selectOrg} selectClient={selectClient} selectCard={selectCard} datesTop={datesTop} timeFrameTop={timeFrameTop} />) : null}
</div>
        {/* <WeeklyRevenue /> */}
        {/*</div>*/}

      </div>


    </div>
  );
};

export default Dashboard;

const InfoTabs = ({ datesTop, timeFrameTop, selectOrg, selectClient, selectCard }: { datesTop: any, timeFrameTop: string, selectOrg: any, selectClient: any, selectCard?: any }) => {
  const [infoTabs, setInfoTabs] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dashboardData } = useContext(ClientContext);
  const [dates, setDates] = useState<[Date, Date]>(datesTop);
  const [timeFrame, setTimeFrame] = useState<string>(timeFrameTop);


  const fetchClients = () => {
    setIsLoading(true);
    // alert(dashboardData)
    var data: any = {
      time_frame: timeFrame,
      // org_ids: selectOrg?.length > 0 ? selectOrg?.map((m: any) => m?.id)?.toString() : "all",
      // client_ids: selectClient?.length > 0 ? selectClient?.map((m: any) => m?.id)?.toString() : "all",
      // card_type: selectCard?.length > 0 ? selectCard?.map((m: any) => m?.value)?.toString() : "all"

      org_ids: selectOrg?.length > 0 ? selectOrg?.map((m: any) => m?.id)?.toString() : "",
      client_ids: selectClient?.length > 0 ? selectClient?.map((m: any) => m?.id)?.toString() : "",
      card_type: selectCard?.length > 0 ? selectCard?.map((m: any) => m?.value)?.toString() : ""
    };

    if (dates) {
      data = {
        ...data,
        start_date: dates[0].toISOString().substring(0, 10),
        end_date: dates[1].toISOString().substring(0, 10),
      };
    }
    if (timeFrame !== "custom") {
      if ('start_date' in data) {
        delete data.start_date;
      }
      if ('end_date' in data) {
        delete data.end_date;
      }
    }
    getAllTabs(dashboardData, data)
      .then((data) => {
        setIsLoading(false);
        setInfoTabs(data);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching tabs data"
        );
      });
  };

  //console.log("singleRoleData",singleRoleData);

  useEffect(() => {
    fetchClients();
  }, [dashboardData, dates, timeFrame, selectOrg, selectClient, selectCard]);

  useEffect(() => {
    setDates(datesTop)
    setTimeFrame(timeFrameTop)
  }, [datesTop, timeFrameTop])

  return (
    <>
      {isLoading ? (
        <DivLoader className="mt-50 m-5 h-6 w-6 border-indigo-500" />
      ) : (
        <div className="mt-3 grid grid-cols-1   gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 px-5 ">
        
          <Widget
            icon={<GrTransaction className="h-7 w-7" />}
            title={"Total Transactions"}
            subtitle={infoTabs?.total_transactions}
          />
          <Widget
            icon={<MdCheckCircle className="h-7 w-7 text-teal-500" />}
            title={"Approved Transactions"}
            subtitle={infoTabs?.transactions_approved}
          />
          <Widget
            icon={<MdCancel className="h-7 w-7 text-orange-600" />}
            title={"Declined Transactions"}
            subtitle={infoTabs?.transactions_declined}
          />
          <Widget
            icon={
              <MdOutlineReplayCircleFilled className="h-7 w-7 text-blue-500" />
            }
            title={"Refunded Transactions"}
            subtitle={infoTabs?.transactions_refunded}
          />
          <Widget
            icon={
              <MdOutlineError className="h-7 w-7 text-orange-500" />
            }
            title={"Errored Transactions"}
            subtitle={infoTabs?.transactions_errored}
          />
        </div>
      )}
    </>
  );
};

const AllADPayments = ({ type, datesTop, timeFrameTop, selectOrg, selectClient, selectCard }: { type?: string, datesTop: any, timeFrameTop: string, selectOrg: any, selectClient: any, selectCard?: any }) => {
  const [payments, setPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [timeFrame, setTimeFrame] = useState<string>(timeFrameTop);
  const [dates, setDates] = useState<[Date, Date]>(datesTop);
  const { dashboardData, setDashboardData } = useContext(ClientContext);
  const fetchPayments = () => {
    console.log("timeFrameTop", timeFrameTop, "timeFrame", timeFrame)
    setIsLoading(true);
    var data: any = {
      time_frame: timeFrame,
      // org_ids: selectOrg?.length > 0 ? selectOrg?.map((m: any) => m?.id)?.toString() : "all",
      // client_ids: selectClient?.length > 0 ? selectClient?.map((m: any) => m?.id)?.toString() : "all",
      // card_type: selectCard?.length > 0 ? selectCard?.map((m: any) => m?.value)?.toString() : "all"

      org_ids: selectOrg?.length > 0 ? selectOrg?.map((m: any) => m?.id)?.toString() : "",
      client_ids: selectClient?.length > 0 ? selectClient?.map((m: any) => m?.id)?.toString() : "",
      card_type: selectCard?.length > 0 ? selectCard?.map((m: any) => m?.value)?.toString() : ""

    };

    if (dates) {
      data = {
        ...data,
        start_date: dates[0].toISOString().substring(0, 10),
        end_date: dates[1].toISOString().substring(0, 10),
      };
    }
    if (timeFrame !== "custom") {
      if ('start_date' in data) {
        delete data.start_date;
      }
      if ('end_date' in data) {
        delete data.end_date;
      }
    }

    getTransactionByCurrency(type, data, dashboardData)
      .then((data) => {
        setPayments(() => {
          let arr = Object.entries(data)?.map(([key, value]) => {
            return { key: key, value: value };
          });
          //console.log("ARRR",arr);
          return arr;
        });
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching payments"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setTimeFrame(timeFrameTop)
    setDates(datesTop)
  }, [timeFrameTop, datesTop])

  useEffect(() => {
    fetchPayments();
  }, [timeFrame, dates, dashboardData, selectOrg, selectClient, selectCard]);

  return (
    <ADPaymentsList
      tableData={payments}
      isLoading={isLoading}
      timeFrame={timeFrame}
      setTimeFrame={setTimeFrame}
      type={type}
      dates={dates}
      setDates={setDates}
    />
  );
};

const LatestPayments = ({ paymentName, datesTop, timeFrameTop, selectOrg, selectClient, selectCard }: { paymentName?: boolean, datesTop: any, timeFrameTop: string, selectOrg: any, selectClient: any, selectCard?: any }) => {
  const [payments, setPayments] = useState<PaymentRowObj[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const { dashboardData, setDashboardData } = useContext(ClientContext);

  const [timeFrame, setTimeFrame] = useState<string>(timeFrameTop);
  const [dates, setDates] = useState<[Date, Date]>(datesTop)

  const fetchPayments = () => {
    setIsLoading(true);

    var data: any = {
      time_frame: timeFrame,
      // org_ids: selectOrg?.length > 0 ? selectOrg?.map((m: any) => m?.id)?.toString() : "all",
      // client_ids: selectClient?.length > 0 ? selectClient?.map((m: any) => m?.id)?.toString() : "all",
      // card_type: selectCard?.length > 0 ? selectCard?.map((m: any) => m?.value)?.toString() : "all"

      org_ids: selectOrg?.length > 0 ? selectOrg?.map((m: any) => m?.id)?.toString() : "",
      client_ids: selectClient?.length > 0 ? selectClient?.map((m: any) => m?.id)?.toString() : "",
      card_type: selectCard?.length > 0 ? selectCard?.map((m: any) => m?.value)?.toString() : ""

    };

    if (dates) {
      data = {
        ...data,
        start_date: dates[0].toISOString().substring(0, 10),
        end_date: dates[1].toISOString().substring(0, 10),
      };
    }
    if (timeFrame !== "custom") {
      if ('start_date' in data) {
        delete data.start_date;
      }
      if ('end_date' in data) {
        delete data.end_date;
      }
    }
    getRecentPayments(1, "", dashboardData, 10, data)
      .then((data) => {
        setPayments(data.payments);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching payment data"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  useEffect(() => {
    setTimeFrame(timeFrameTop)
    setDates(datesTop)
  }, [timeFrameTop, datesTop])

  useEffect(() => {
    fetchPayments();
  }, [timeFrame, dates, dashboardData, selectOrg, selectClient, selectCard]);

  return (
    <PaymentsListDashboard
      tableData={payments}
      fetchPayments={fetchPayments}
      isLoading={isLoading}
      paymentName={paymentName}
    />
  );
};

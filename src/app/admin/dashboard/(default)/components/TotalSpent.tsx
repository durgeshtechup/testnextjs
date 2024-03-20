import { getWawechratData } from "api/dashboard";
import Card from "components/card";
import LineChart from "components/charts/LineChart";
// import LineArea from "components/charts/LineAreaChart";
import DivLoader from "components/divloader/DivLoader";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import {
  lineChartOptionsTotalSpent as lineChartOptionsTotalSpentinit,
} from "variables/charts";
//import { DateRangePicker } from 'rsuite';
import { ClientContext } from "clientProvider";
// import DateRange from "components/fields/DateRange";
// import nodatafound from "assets/img/Data-not-found.jpg";


const TotalSpent = ({ type, datesTop, timeFrameTop, selectOrg, selectClient, selectCard }: { type?: string, datesTop?: any, timeFrameTop?: any, selectOrg?: any, selectClient?: any, selectCard?: any }) => {
  const [chartData, setChartData] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [lineChartDataTotalSpent, setLineChartDataTotalSpent] = useState<any[]>()
  const [lineChartOptionsTotalSpent, setLineChartOptionsTotalSpent] = useState<any>()
  const { dashboardData, setDashboardData } = useContext(ClientContext);

  // const [dates, setDates] = useState<[Date, Date]>()

  const [dates, setDates] = useState<[Date, Date]>(datesTop);
  const [timeFrame, setTimeFrame] = useState<string>(timeFrameTop);


  const getInitialDates = () => {
    const currentDate = new Date();
    const fiveMonthsBack = new Date(currentDate);
    fiveMonthsBack.setMonth(fiveMonthsBack.getMonth() - 3);
    setDates([fiveMonthsBack, new Date()])
  }

  const handleDateRangeChange = (dateRange: [Date | null, Date | null]) => {
    if (dateRange[0] !== null && dateRange[1] !== null) {
      setDates(dateRange);
    }
  };

  const fetchPayments = () => {
    setIsLoading(true)

    var dataP: any = {
      time_frame: timeFrame,
      // org_ids: selectOrg?.length > 0 ? selectOrg?.map((m: any) => m?.id)?.toString() : "all",
      // client_ids: selectClient?.length > 0 ? selectClient?.map((m: any) => m?.id)?.toString() : "all",
      // card_type: selectCard?.length > 0 ? selectCard?.map((m: any) => m?.value)?.toString() : "all"

      org_ids: selectOrg?.length > 0 ? selectOrg?.map((m: any) => m?.id)?.toString() : "",
      client_ids: selectClient?.length > 0 ? selectClient?.map((m: any) => m?.id)?.toString() : "",
      card_type: selectCard?.length > 0 ? selectCard?.map((m: any) => m?.value)?.toString() : ""

    };

    if (dates) {
      dataP = {
        ...dataP,
        start_date: dates[0].toISOString().substring(0, 10),
        end_date: dates[1].toISOString().substring(0, 10),
      };
    }
    if (timeFrame !== "custom") {
      if ('start_date' in dataP) {
        delete dataP.start_date;
      }
      if ('end_date' in dataP) {
        delete dataP.end_date;
      }
    }


    let xAxis: any[] = []
    if (1) {
      getWawechratData(dataP, dashboardData)
        .then((data) => {
          setChartData(data)
          setLineChartDataTotalSpent(() => {
            let arr = Object.entries(data).map(([key, value]: any) => {
              if (key === "APPROVED" || key === "DECLINED") {
                let modiifedValues = Object.entries(value)
                  .map(([key, value]: any) => {
                    var monthSplit = key.split("-");
                    var month = data?.grouped_by === "day" ? monthSplit[0] : monthSplit[1]
                    var date = new Date(2000, month - 1);
                    var monthName = date.toLocaleString('default', { month: 'long' });
                    return {
                      month: [monthName + "-" + (data?.grouped_by === "day" ? monthSplit[1] : monthSplit[0])],
                      value: value
                    }
                  })
                xAxis = modiifedValues.map(ele => ele.month)
                return {
                  name: key,
                  data: modiifedValues.map(ele => ele.value),
                  color: key === "APPROVED" ? "#53c1ff" : "#4E2BEA"
                }
              } else {
                return null
              }
            })
            return arr.filter(data => data ?? false)
          })
          setLineChartOptionsTotalSpent(() => {
            return {
              ...lineChartOptionsTotalSpentinit,
              xaxis: { ...lineChartOptionsTotalSpentinit.xaxis, categories: xAxis }
            }
          })
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message ??
            "Something went wrong while fetching wawe chart data"
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  useEffect(() => {
    getInitialDates();
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [dates, timeFrame, dashboardData, selectOrg, selectClient, selectCard]);

  useEffect(() => {
    setDates(datesTop)
    setTimeFrame(timeFrameTop)
  }, [datesTop, timeFrameTop])

  console.log("first", lineChartOptionsTotalSpent, lineChartDataTotalSpent)
  return (
    <Card extra="!p-[20px] text-center">
      {/* <div className="flex justify-between">
        <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <MdOutlineCalendarToday />
          <span className="text-sm font-medium text-gray-600">This month</span>
        </button>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div> */}

      <div className="flex px-3 pt-2">
        <h4 className="flex w-fit items-center py-3 text-xl font-bold capitalize  text-navy-700 dark:text-white">
          Transaction Info
        </h4>
      </div>

      <div className="flex h-full w-full flex-col sm:flex-wrap lg:flex-nowrap">
        {/* <div className="w-full justify-between flex items-center" style={{ maxWidth: '100%', width: '300px' }}>
          <DateRange onDateChange={handleDateRangeChange} />
        </div> */}
        {chartData?.total_transactions > 0 && <div className="grid w-full grid-cols-2 pt-2 w-1/4">
          <div className="flex flex-col items-start justify-between">
            <p className="mt-1 text-sm font-bold text-gray-500">Total</p>
            <p className="mt-1 text-sm font-bold text-gray-500">Approved</p>
            <p className="mt-1 text-sm font-bold text-gray-500">Failed</p>
          </div>
          <div className="flex flex-col items-end justify-between">
            <span className="mt-1 ml-4 text-sm font-bold text-navy-700">{chartData?.total_transactions}</span>
            <span className="mt-1 ml-4 text-sm font-bold text-brand-500">{chartData?.transactions_approved}</span>
            <span className="mt-1 ml-4 text-sm font-bold text-teal-600">{chartData?.transactions_declined}</span>
          </div>
        </div>}
      </div>
      <div className="h-full w-full">
        {isLoading ? <DivLoader className="h-6 w-6 border-indigo-500 m-5" /> : <>
          {(lineChartOptionsTotalSpent &&
            lineChartDataTotalSpent && chartData?.total_transactions > 0) ?
            <LineChart
              chartOptions={lineChartOptionsTotalSpent}
              chartData={lineChartDataTotalSpent}
            /> :
            <p className="text-center">Data not found. </p>

          }
        </>}
      </div>
    </Card>
  );
};

export default TotalSpent;

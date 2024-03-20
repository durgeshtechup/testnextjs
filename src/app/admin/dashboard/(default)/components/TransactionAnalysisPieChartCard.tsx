import { ClientContext } from "clientProvider";
import {
  getTransactionByAnalysis,
  getTransactionByGateway,
} from "api/dashboard";
import Card from "components/card";
import PieChart from "components/charts/PieChart";
import DivLoader from "components/divloader/DivLoader";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { pieChartOptions as pieChartOptionsPayload } from "variables/charts";


function calculatePercentage(obj: Object) {
  const totalSum = Object.values(obj).reduce((sum, value) => sum + value, 0);
  const percentages = Object.entries(obj).map(([key, value]) => {
    return {
      key,
      value: Math.round((value / totalSum) * 100),
      original: value,
    };
  });
  return percentages;
}

const TransactionAnalysisPieChartCard = ({ type, datesTop, timeFrameTop, selectOrg, selectClient, selectCard }: { type?: string, datesTop?: any, timeFrameTop?: any, selectOrg?: any, selectClient?: any, selectCard?: any }) => {
  const [pieChartData, setPieChartData] = useState<any>();
  const [pieChartOptions, setPieChartOptions] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dashboardData, setDashboardData } = useContext(ClientContext);

  const [dates, setDates] = useState<[Date, Date]>(datesTop);
  const [timeFrame, setTimeFrame] = useState<string>(timeFrameTop);

  const fetchData = () => {
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

    getTransactionByAnalysis(type, dashboardData, data)
      .then((dataR) => {
        setPieChartData(calculatePercentage(dataR));
        setPieChartOptions({
          ...pieChartOptionsPayload,
          labels: Object.keys(dataR),
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching approved transactions data"
        );
      });
  };

  useEffect(() => {
    fetchData();
  }, [dashboardData, dates, timeFrame, selectOrg, selectClient, selectCard]);

  useEffect(() => {
    setDates(datesTop)
    setTimeFrame(timeFrameTop)
  }, [datesTop, timeFrameTop])
  console.log("pieChartData::", pieChartData, pieChartOptions)
  return (
    <Card extra="rounded-[20px] p-3 ">
      <div className="flex px-3 pt-2">
        <h4 className="flex w-fit items-center py-3 text-xl font-bold capitalize text-navy-700 dark:text-white">
          Transaction Analysis : Approved vs Declined
        </h4>
      </div>
      {isLoading ? (
        <DivLoader className="mt-50 m-5 h-6 w-6 border-indigo-500" />
      ) : (
        <>
          <div className="lg:flex md:block flex flex-col  items-center justify-between gap-4">

            {(pieChartData?.filter((f: any) => f?.value)?.length > 0 && pieChartOptions) ? (
              <div className="flex h-[300px] w-full items-center justify-center">
                <PieChart
                  chartOptions={pieChartOptions}
                  chartData={pieChartData?.map((data: any) => data?.original)}
                  chartType="pie"
                />


              </div>

            ) :
              <p className="text-center">Data not found. </p>


            }


            {false && <div className="w-full rounded-2xl sm:px-8 md:px-12 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              {pieChartData?.map((data: any, index: number) => {
                return (
                  <div className="lg:flex md:block flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-4">
                      <div
                        className={`h-2 w-2 rounded-full`}
                        style={{
                          backgroundColor: pieChartOptionsPayload.colors[index],
                        }}
                      />
                      <p className="ml-1 text-sm font-normal text-gray-600" >
                        {data?.key}
                      </p>
                      <p className="mt-px text-lg font-bold text-navy-700  dark:text-white" >
                        {isNaN(data?.value) ? 0 : data?.value}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>}

          </div>
        </>
      )}
    </Card>
  );
};

export default TransactionAnalysisPieChartCard;

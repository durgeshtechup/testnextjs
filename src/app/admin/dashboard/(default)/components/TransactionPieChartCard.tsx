import { ClientContext } from "clientProvider";
import { getTransactionByGateway } from "api/dashboard";
import Card from "components/card";
import PieChart from "components/charts/PieChart";
import DivLoader from "components/divloader/DivLoader";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
// import { MdCancel, MdCheckCircle } from "react-icons/md";
import { pieChartOptions as pieChartOptionsPayload } from "variables/charts";
// import ShortTruncateCopy from "components/common/ShortTruncateCopy";
// import nodatafound from "assets/img/Data-not-found.jpg";


function calculatePercentage(obj: Object) {
  const totalSum = Object.values(obj).reduce((sum, value) => sum + value, 0);
  if (totalSum === 0) {
    return null;
  }
  const percentages = Object.entries(obj).map(([key, value]) => {
    return {
      key,
      value: Math.round((value / totalSum) * 100),
      original: value,
    };
  })
    .filter(entry => entry.value !== 0);
  return percentages;
}

const TransactionPieChartCard = ({ type, datesTop, timeFrameTop, selectOrg, selectClient, selectCard }: { type?: string, datesTop?: any, timeFrameTop?: any, selectOrg?: any, selectClient?: any, selectCard?: any }) => {
  const [pieChartData, setPieChartData] = useState<any>();
  const [pieChartOptions, setPieChartOptions] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dashboardData, setDashboardData } = useContext(ClientContext);

  const [timeFrame, setTimeFrame] = useState<string>(timeFrameTop);
  const [dates, setDates] = useState<[Date, Date]>(datesTop);

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

    console.log("dashboardDatadashboardDatadashboardData",dashboardData)

    getTransactionByGateway(type, dashboardData, data)
      .then((data) => {
        setPieChartData(calculatePercentage(data));
        setPieChartOptions({
          ...pieChartOptionsPayload,
          labels: Object.keys(data),
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
    setTimeFrame(timeFrameTop)
    setDates(datesTop)
  }, [timeFrameTop, datesTop])

  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex px-3 pt-2">
        <h4 className="flex w-fit items-center text-xl font-bold capitalize text-navy-700 dark:text-white">
          {type == "decline" ? (
            <>
              {/*<MdCancel className="mr-2 h-6 w-6 text-orange-500" />*/}
              Declined{" "}
            </>
          ) : (
            <>
              {/*<MdCheckCircle className="mr-2 h-6 w-6 text-indigo-500" />*/}
              Approved{" "}
            </>
          )}
          Transactions
        </h4>
      </div>
      {isLoading ? (
        <DivLoader className="mt-50 m-5 h-6 w-6 border-indigo-500" />
      ) : (
        <>
          {(pieChartData && pieChartOptions) ? (
            <div className="mb-auto flex h-[300px] lg:h-[15vmax] 2xl:h-[20vmax] 3xl:h-[15vmax] w-full  items-center justify-center pt-10 mt-15">
              <PieChart
                chartOptions={pieChartOptions}
                chartData={pieChartData.map((data: any) => data.original)}
                chartType="pie"
              />
            </div>
          ) : (
            <div className="mb-auto flex h-[300px] w-full items-center justify-center pt-10">

              <p className="text-center" >Data not found.</p>
            </div>
          )

          }
          {/* {false && <div className="flex flex-col items-center justify-center">
            <div className="rounded-2xl place-content-center px-6 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              {pieChartData?.map((data: any, index: number) => (
                <div key={index} className="flex items-center justify-start">
                  <div
                    className={`h-2 w-2 rounded-full !justify-start !content-start`}
                    style={{
                      backgroundColor: pieChartOptionsPayload.colors[index],
                    }}
                  />
                  <p className="px-1 py-0 text-md font-bold text-navy-700 dark:text-white">
                    {data.value}%
                  </p>
                  <p className="ml-1 !my-0 px-2 text-sm font-normal text-gray-600 break-all">
                    <ShortTruncateCopy info={data?.key} showCopy={false} />
                  </p>
                </div>
              ))}
            </div>
          </div>} */}
        </>
      )}
    </Card>
  );
};

export default TransactionPieChartCard;

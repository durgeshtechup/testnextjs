"use client"
import TextArea from "components/fields/TextArea";

import { useEffect, useState } from "react";
import { AiFillMinusCircle } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import { MdFileCopy } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

import {
  allCountries,
  allCardType,
  allCurrency,
  allDays,
} from "./variables/routingVars";
// import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
// import {
//   createSmartRouting,
//   updateSmartRouting,
//   getSmartRouting,
// } from "../../../api/smart-routing";
// import { getAllGatewaysByClient } from "../../../api/gateways";
import DivLoader from "components/divloader/DivLoader";
import { RiErrorWarningLine } from "react-icons/ri";
import { createSmartRouting, getSmartRouting, updateSmartRouting } from "api/smart-routing";
import { getAllGatewaysByClient } from "api/gateways";
import { useParams } from "next/navigation";
// import {  toast,ToastContainer } from "react-toastify";



let gatewayOption = [
  { name: "Select", value: "" },
  { name: "SIPE", value: "SIPE" },
  { name: "STRIPE", value: "STRIPE" },
  { name: "BLUMON", value: "BLUMON" },
  { name: "PIX", value: "PIX" },
];

const rootOption = [
  { name: "ACTION", value: "ACTION" },
  { name: "CONDITION", value: "CONDITION" },
];

const ConditionOperators = [
  { name: "equals", value: "EQUALS" },
  { name: "not equals", value: "NOT_EQUALS" },
  { name: "in", value: "IN" },
  { name: "not in", value: "NOT_IN" },
  { name: "greater than", value: "GREATER_THAN" },
  { name: "less than", value: "LESS_THAN" },
];

const LeftConditionOperands = [
  { name: "amount", value: "amount" },
  { name: "geo location", value: "geo-location" },
  { name: "card type", value: "card-type" },
  { name: "currency", value: "currency" },
  { name: "time", value: "time" },
  { name: "day", value: "day" },
  // { name: "date", value: "date", },
];

const ConditionTypes = [
  { name: "OR", value: "OR" },
  { name: "AND", value: "AND" },
];

const ActionObj = {
  type: "ACTION",
  action: {
    type: "FUNCTION",
    name: "process_payment",
    arguments: [{ type: "STATIC", name: "gateway", value: "stripe" }],
  },
};

const ConditionObj = {
  type: "EQUALS",
  left: { type: "VARIABLE", name: "geo-location" },
  right: { type: "STATIC", value: "" },
};

const Condition = {
  type: "CONDITION",
  condition_type: "SOLO",
  conditions: ConditionObj,
  1: {},
  0: {},
};

const SmartRouting = () => {
  // client ID
  let { id } = useParams()
  const [routing, setRouting] = useState<any>({});
  const [routingE, setRoutingE] = useState<string>("");
  const [viewMode, setViewMode] = useState<string>("FLOW");
  const [paymentGateway, setPaymentGateway] = useState<string>("Stripe");
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [fetchData, setFetchData] = useState<any>();
  const [editData, setEditData] = useState<boolean>(false);
  const [storeDropDownData, setStoreDropDownData] = useState([]);
  const [loading, setLoading] = useState(false);

  //console.log("line 105", storeDropDownData);

  const fetchDropDownData =
    storeDropDownData &&
    storeDropDownData.map((elem,index) => {
      
      //console.log("elem",elem.name,index);
      return {
        name: elem?.name.toUpperCase(),
        value: elem?.name.toUpperCase(),
      };
    });
  // console.log("line 109", fetchDropDownData);

  gatewayOption = fetchDropDownData;
  // console.log('gatewayOption', gatewayOption)

  useEffect(() => {
    getAllGatewaysByClient(id)
      .then((data) => {
        //console.log("ASDFadfd",data[0].name,data[0].name.toUpperCase())
        setStoreDropDownData(data);
        if(data[0]){
          setPaymentGateway(data[0].name.toUpperCase());
        }
      })
      .catch((err) => {
        //console.log("err", err);
      });
  }, []);

  // console.log('storeDropDownData', storeDropDownData)

  // if(Array.isArray(storeDropDownData)){
  //   storeDropDownData?.map((dropVal) => {
  //     console.log('dropVal', dropVal.name)

  //   })
  // }

  useEffect(() => {
    const init = { ...Condition, id: uuidv4() };
    setRouting(init);
    setRoutingE(JSON.stringify(init, null, 4));
  }, []);

  const handleChange = (e: any, id: string) => {};

  useEffect(() => {
    // calling GET API

    getSmartRouting(id)
      .then((data: any) => {
        //console.log("data1111", data);
        setFetchData(data?.route_info?.conditions?.right?.value);
        setRouting(data?.route_info);
        setRoutingE(JSON.stringify(data?.route_info, null, 4));
        // setLoading(false);
        if (data?.route_info) {
          setEditData(true);
        }
      })
      .catch((err: any) => {
        toast(err?.response?.data?.message ?? "Unable to fetch data", {
          icon: (
            <RiErrorWarningLine
              className="h-6 w-6"
              style={{ color: "#ca8a04" }}
            />
          ),
        });
      });
  }, [id]);

  useEffect(() => {
    // console.log("routing128", routing);
  }, [routing]);

  const getDropdownValue = (outerIndex: any, innerIndex: any) => {
    //console.log("outerIndex143", outerIndex);
    //console.log("line jhkjh", routing.conditions, outerIndex, innerIndex);

    const condition = routing.conditions?.[outerIndex];
    // console.log("routing.conditions", routing.conditions);

    // console.log("condition186", condition);

    if (Array.isArray(condition?.right?.value)) {
      return condition?.right?.value.map((data: any) => ({
        value: data.value,
        label: data.label,
      }));
    }

    return null;
  };

  function findAndUpdateObjectMultiple(
    data: any,
    targetId: string,
    key: any,
    newValue: any
  ) {
    if (typeof data === "object") {
      if (data.hasOwnProperty("id") && data["id"] === targetId) {
        key.forEach((element: any, index: number) => {
          data[element] = newValue[index];
          console.log("111",data[element]);
        });
        
        return true;
      }
      for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
          if (findAndUpdateObject(data[prop], targetId, key, newValue)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  function findAndUpdateObject(
    data: any,
    targetId: string,
    key: any,
    newValue: any
  ) {
    if (typeof data === "object") {
      if (data.hasOwnProperty("id") && data["id"] === targetId) {
        data[key] = newValue;
        //console.log("222",data[key]);
        return true;
      }
      for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
          if (findAndUpdateObject(data[prop], targetId, key, newValue)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  const handleNodeUpdate = (id: any, key: any, newValue: any) => {
    //console.log("key",key,"routing",routing,"newValue",newValue);
    if (key) {
      var data = { ...routing };
      if (Array.isArray(key)) {
        findAndUpdateObjectMultiple(data, id, key, newValue);
      } else {
        findAndUpdateObject(data, id, key, newValue);
      }
      setRoutingE(JSON.stringify(data, null, 4));
      setRouting(data);
    } else {
      setRoutingE(JSON.stringify(newValue, null, 4));
      setRouting(newValue);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRoutingE(event.target.value);
    setHasError(false);
  };

  // const handleSave = () => {
  //   try {
  //     const parsedData = JSON.parse(routingE);
  //     console.log("🚀 ~ file: index.tsx:172 ~ handleSave ~ parsedData:", parsedData)

  //     setRoutingE(JSON.stringify(parsedData, null, 4));
  //     setRouting(parsedData);
  //     console.log("parsded dara", parsedData)
  //     setHasError(false);
  //   } catch (error) {
  //     setErrorText(JSON.stringify(error))
  //     setHasError(true);
  //   }
  // };

  const removeElementById = (object: any, idToRemove: string) => {
    if (object.id === idToRemove) {
      return { type: "NO_EFFECT" };
    }
    if (typeof object === "object") {
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          object[key] = removeElementById(object[key], idToRemove);
        }
      }
    }
    return object;
  };

  const handleRemoveNode = (idToRemove: string) => {
    const updatedData = removeElementById({ ...routing }, idToRemove);
    setRouting(updatedData);
  };
  const handleSave = async () => {
    try {
      const parsedData = JSON.parse(routingE);

      //console.log("parsedData:",parsedData); return;
      setRoutingE(JSON.stringify(parsedData, null, 4));
      setRouting(parsedData);

      if (routing) {
        // POST API
        if (editData) {
          setLoading(true);
          await updateSmartRouting(routing, id).then(async (res) => {
            if (res?.client_id) {
              await getSmartRouting(res?.client_id)
                .then((data: any) => {
                  // console.log("data1111", data);

                  setFetchData(data?.route_info?.conditions?.right?.value);
                  setRouting(data?.route_info);
                  setRoutingE(JSON.stringify(data?.route_info, null, 4));
                  setLoading(false);
                  if (data?.route_info) {
                    setEditData(true);
                  }
                })
                .catch((err: any) => {
                  setLoading(false);
                  toast.error(
                    err?.response?.data?.message ?? "Unable to fetch data"
                  );
                });
            } else {
              setLoading(false);
            }
          });
        } else {
          setLoading(false);
          await createSmartRouting(routing, id);
        }

        // Display a success toast if the API call is successful.
        toast.success("Saved");
        // setLoading(false);
      }

      setHasError(false);
    } catch (error) {
      toast.error("Invalid JSON Data");
      setErrorText(JSON.stringify(error));
      setHasError(true);
    }
  };
  return (
    <>
      {loading ? (
        <div className="mt-4 overflow-x-auto scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-xl scrollbar-h-1.5">
          <p className="text-center">Please wait ...</p>
          <DivLoader className="m-5 h-6 w-6 border-indigo-500" />
        </div>
      ) : (
        <div className="flex w-full flex-col gap-5">
          <div className="w-ful h-fit">
            <div className="col-span-2 lg:!mb-0">
              {/* <p>loading</p> */}
              {/* <p className="text-xl text-gray-900 my-3">Routing Scheme</p> */}
              <div className="my-5 flex gap-3">
                <button
                  className={`w-fit rounded-lg border px-4 py-2 outline-none ${
                    viewMode === "FLOW"
                      ? "border-indigo-300 bg-indigo-50 text-indigo-500"
                      : "border-gray-200 bg-white"
                  }`}
                  onClick={() => {
                    setViewMode("FLOW");
                  }}
                >
                  FLOW View
                </button>
                <button
                  className={`w-fit rounded-lg border px-4 py-2 outline-none ${
                    viewMode === "JSON"
                      ? "border-indigo-300 bg-indigo-50 text-indigo-500"
                      : "border-gray-200 bg-white"
                  }`}
                  onClick={() => {
                    setViewMode("JSON");
                  }}
                >
                  JSON View
                </button>
              </div>
              <div className="flex flex-col justify-center overflow-auto rounded-xl border border-indigo-200 bg-white bg-clip-border p-5 shadow-3xl shadow-shadow-500 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-h-2 dark:!bg-navy-700 dark:shadow-none">
                {viewMode === "JSON" ? (
                  <div className="relative">
                    <TextArea
                      variant="auth"
                      extra="mb-2 w-full"
                      label=""
                      placeholder=""
                      id={"routing"}
                      cols={80}
                      height="700px"
                      maxHeight="1000px"
                      value={routingE}
                      onChange={handleInputChange}
                      // state={hasError ? "error" : ""}
                    />
                    <div className="absolute right-2 top-3 flex items-center gap-4">
                      <button
                        className={`w-fit rounded-xl border border-teal-300 bg-teal-50 px-5 py-2 text-teal-500 outline-none`}
                        onClick={handleSave}
                      >
                        Save Changes
                      </button>

                      <MdFileCopy
                        className="h-6 w-6 cursor-pointer text-teal-500"
                        onClick={async () => {
                          await navigator.clipboard.writeText(routingE);
                          // console.log('routingE', routingE)
                          if (routingE) {
                            toast.success("Copied");
                          }

                          // if(routing){
                          //   toast.success("Copied ");
                          // }
                        }}
                      />
                    </div>
                    {/* {hasError && <span className="error">{errorText}</span>} */}
                  </div>
                ) : (
                  <>
                    <div className={`mb-3 flex justify-end`}>
                      <button
                        className={`w-fit rounded-xl border border-teal-300 bg-teal-50 px-5 py-2 text-teal-500 outline-none`}
                        onClick={handleSave}
                      >
                        Save Changes
                      </button>
                    </div>
                    {routing?.type === "CONDITION" && (
                      <ConditionJson
                        id={routing?.id}
                        condition_obj={routing}
                        handleChange={handleChange}
                        handleNodeUpdate={handleNodeUpdate}
                        handleRemoveNode={handleRemoveNode}
                        getDropdownValue={getDropdownValue}
                        paymentGateway={paymentGateway}
                      />
                    )}
                    {routing?.type === "ACTION" && (
                      <ActionJson
                        id={routing?.id}
                        action_obj={routing}
                        handleNodeUpdate={handleNodeUpdate}
                        handleRemoveNode={handleRemoveNode}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SmartRouting;

const ConditionJson = ({
  condition_obj,
  handleChange,

  handleNodeUpdate,
  // handleSave,
  objKey,
  id,
  handleRemoveNode,
  getDropdownValue,
  paymentGateway,
}: {
  condition_obj: any;
  handleChange: any;
  // handleSave:any;
  handleNodeUpdate: any;
  objKey?: string | undefined;
  id?: string | undefined;
  getDropdownValue: any;

  handleRemoveNode: any;
  paymentGateway: string | undefined;
}) => {
  //console.log("cond", getDropdownValue);

  return (
    <>
      {condition_obj?.type === "CONDITION" && (
        <>
          <div className="relative flex w-full items-center gap-3 pr-8">
            <select
              name="org_id"
              id="org_id"
              className={`w-30 dark:text-neutral-950 flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-3 py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:!border-white/10 ${
                !condition_obj?.type
                  ? "border-orange-500 text-orange-500 placeholder:text-orange-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                  : ""
              }`}
              disabled={!objKey}
              onChange={() =>{

                const newObj2 = {
                    ...ActionObj,
                    action: {
                      ...ActionObj.action,
                      //name: "process_payment",
                      arguments: [
                        {
                          name: "gateway",
                          type: "STATIC",
                          value: paymentGateway,
                        },
                      ],
                    },
                  };

                handleNodeUpdate(id ? id : condition_obj?.id, objKey, {
                  ...newObj2,
                  id: uuidv4(),
                })
              }}
              value={condition_obj?.type}
            >
              {rootOption.map((data: any, index) => {
                return (
                  <option key={index} value={data?.value}>
                    {data?.name}
                  </option>
                );
              })}
            </select>
            <div className="flex gap-3 ">
              {condition_obj?.condition_type === "SOLO" && (
                <ConditionRender
                  condition_obj={condition_obj}
                  handleNodeUpdate={handleNodeUpdate}
                  getDropdownValue={getDropdownValue}
                />
              )}
              {(condition_obj?.condition_type === "OR" ||
                condition_obj?.condition_type === "AND") && (
                <>
                  {condition_obj?.conditions?.map((ele: any, index: number) => (
                    <div key={index} className="flex items-center gap-3 text-blue-500">
                      <ConditionRender
                        condition_obj={condition_obj}
                        handleNodeUpdate={handleNodeUpdate}
                        index={index}
                        getDropdownValue={getDropdownValue}
                      />
                      <ConditionJoinRender
                        index={index}
                        handleNodeUpdate={handleNodeUpdate}
                        condition_obj={condition_obj}
                        getDropdownValue={getDropdownValue}
                      />
                    </div>
                  ))}
                </>
              )}
              {/* {condition_obj?.condition_type === "AND" && (
                <>
                  {condition_obj?.conditions?.map((ele: any, index: number) => (
                    <div className="flex items-center gap-3 text-blue-500">
                      <ConditionRender
                        condition_obj={condition_obj}
                        handleNodeUpdate={handleNodeUpdate}
                        index={index}
                      />
                      <ConditionJoinRender
                        index={index}
                        handleNodeUpdate={handleNodeUpdate}
                        condition_obj={condition_obj}
                      />
                    </div>
                  ))}
                </>
              )} */}
            </div>

            {/* below code plus btn */}
            <button
              className="flex items-center justify-center rounded-full border-2 border-blue-200 bg-blue-50/50 p-1 outline-none"
              onClick={() => {
                let arr = [];
                const conditions = condition_obj?.conditions;
                // console.log("conditions516", conditions);

                if (Array.isArray(conditions)) {
                  // console.log('conditions518', conditions)
                  conditions.push(ConditionObj);
                } else {
                  arr = Array(2).fill(conditions);
                  // console.log('arr 542', arr)
                }

                const newObj = {
                  ...condition_obj,
                  condition_type: ["OR", "AND"].includes(
                    condition_obj.condition_type
                  )
                    ? condition_obj.condition_type
                    : "AND",
                  conditions: Array.isArray(conditions) ? conditions : arr,
                };

                handleNodeUpdate(
                  id ? id : condition_obj?.id,
                  objKey ? objKey : null,
                  newObj
                );
              }}
            >
              <BsPlus className="h-8 w-8 text-blue-500" />
            </button>
            {objKey && (
              <RemoveNodeRender
                handleRemoveNode={handleRemoveNode}
                id={condition_obj?.id}
              />
            )}
          </div>

          <div className="relative mx-5">
            {Object.keys(condition_obj["1"]).length ? (
              <>
                <div className="absolute left-0 top-0 z-[8] h-10 w-8 rounded-bl-xl border-b-2 border-l-2 border-teal-500" />
                <div className="m-5 ml-8 w-fit gap-3 rounded-xl border bg-gray-50/10 p-5">
                  {condition_obj["1"]?.type === "CONDITION" && (
                    <ConditionJson
                      objKey={"1"}
                      id={condition_obj?.id}
                      handleChange={handleChange}
                      condition_obj={condition_obj["1"]}
                      handleNodeUpdate={handleNodeUpdate}
                      handleRemoveNode={handleRemoveNode}
                      getDropdownValue={getDropdownValue}
                      paymentGateway={paymentGateway}
                    />
                  )}
                  {condition_obj["1"]?.type === "ACTION" && (
                    <ActionJson
                      objKey={"1"}
                      id={condition_obj?.id}
                      action_obj={condition_obj["1"]}
                      handleNodeUpdate={handleNodeUpdate}
                      handleRemoveNode={handleRemoveNode}
                    />
                  )}
                  {condition_obj["1"]?.type === "NO_EFFECT" && (
                    <NoEffectJson
                      objKey={"1"}
                      id={condition_obj?.id}
                      action_obj={condition_obj}
                      handleNodeUpdate={handleNodeUpdate}
                      paymentGateway={paymentGateway}
                    />
                  )}
                </div>
              </>
            ) : (
              <AddNodeRender
                objKey="1"
                condition_obj={condition_obj}
                handleNodeUpdate={handleNodeUpdate}
                paymentGateway={paymentGateway}
              />
            )}
            {Object.keys(condition_obj["0"]).length ? (
              <>
                <div className="absolute bottom-10 left-0 top-0 w-8 rounded-bl-xl border-b-2 border-l-2 border-orange-500" />
                <div className="m-5 ml-8 w-fit gap-3 rounded-xl border bg-gray-50/10 p-5">
                  {condition_obj["0"]?.type === "CONDITION" && (
                    <ConditionJson
                      objKey={"0"}
                      id={condition_obj?.id}
                      handleChange={handleChange}
                      condition_obj={condition_obj["0"]}
                      handleNodeUpdate={handleNodeUpdate}
                      handleRemoveNode={handleRemoveNode}
                      getDropdownValue={getDropdownValue}
                      paymentGateway={paymentGateway}
                    />
                  )}
                  {condition_obj["0"]?.type === "ACTION" && (
                    <ActionJson
                      objKey={"0"}
                      id={condition_obj?.id}
                      action_obj={condition_obj["0"]}
                      handleNodeUpdate={handleNodeUpdate}
                      handleRemoveNode={handleRemoveNode}
                    />
                  )}
                  {condition_obj["0"]?.type === "NO_EFFECT" && (
                    <NoEffectJson
                      objKey={"0"}
                      id={condition_obj?.id}
                      action_obj={condition_obj}
                      handleNodeUpdate={handleNodeUpdate}
                      paymentGateway={paymentGateway}
                    />
                  )}
                </div>
              </>
            ) : (
              <AddNodeRender
                objKey="0"
                condition_obj={condition_obj}
                handleNodeUpdate={handleNodeUpdate}
                paymentGateway={paymentGateway}
              />
            )}
          </div>
        </>
      )}
      {condition_obj?.type === "ACTION" && (
        <ActionJson
          id={condition_obj?.id}
          action_obj={condition_obj}
          handleNodeUpdate={handleNodeUpdate}
          handleRemoveNode={handleRemoveNode}
        />
      )}
    </>
  );
};

const ActionJson = ({
  id,
  objKey,
  action_obj,
  handleNodeUpdate,
  handleRemoveNode,
}: {
  id?: string | undefined;
  objKey?: string | undefined;
  action_obj: any;
  handleNodeUpdate: any;
  handleRemoveNode: any;
}) => {
  
  return (
    <>
      <div className="flex w-fit items-center gap-3">
        <select
          name="org_id"
          id="org_id"
          className={`w-30 dark:text-neutral-950 flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-3 py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:!border-white/10 ${
            !action_obj?.type
              ? "border-orange-500 text-orange-500 placeholder:text-orange-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
              : ""
          }`}
          disabled={!objKey}
          onChange={() =>
            handleNodeUpdate(id ? id : action_obj.id, objKey, {
              ...Condition,
              id: uuidv4(),
            })
          }
          value={action_obj?.type}
        >
          {rootOption.map((data: any,index:any) => {
            return <option key={index} value={data?.value}>{data?.name}</option>;
          })}
        </select>
        <div className="flex w-fit items-center gap-3 rounded-xl border-2 border-amber-200 bg-amber-50 pl-5">
          <strong>{action_obj?.action?.name}</strong>
          <p>with gateway</p>
          {/* {console.log("line 746", action_obj?.action)} */}
          {action_obj?.action?.arguments.map((data: any,index:any) => {
            return (
              <select
              key={index}
                name="org_id"
                id="org_id"
                value={data?.value}
                className={`w-30 dark:text-neutral-950 flex items-center justify-center rounded-xl border-l-2 border-amber-200 bg-white py-3 pl-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:!border-white/10`}
                onChange={(e) => {
                  const newObj = {
                    ...action_obj,
                    action: {
                      ...action_obj.action,
                      arguments: [
                        {
                          name: "gateway",
                          type: "STATIC",
                          value: e.target.value,
                        },
                      ],
                    },
                  };
                  handleNodeUpdate(id ? id : action_obj.id, objKey, newObj);
                }}
              >
                {gatewayOption.map((data: any, index:any) => {
                  return <option key={index} value={data?.value}>{data?.name}</option>;
                })}
              </select>
            );
          })}
        </div>
        {objKey && (
          <RemoveNodeRender
            handleRemoveNode={handleRemoveNode}
            id={action_obj.id}
          />
        )}
      </div>
    </>
  );
};

const NoEffectJson = ({
  action_obj,
  handleNodeUpdate,
  objKey,
  id,
  paymentGateway,
}: {
  action_obj: any;
  handleNodeUpdate: any;
  objKey: string;
  id?: string | undefined;
  paymentGateway?:string;
}) => {
  console.log("uuuu",paymentGateway);
  return (
    <>
      <div className="flex w-fit items-center gap-3">
        <select
          name="org_id"
          id="org_id"
          className={`w-30 dark:text-neutral-950 flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-3 py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:!border-white/10 ${
            !action_obj?.type
              ? "border-orange-500 text-orange-500 placeholder:text-orange-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
              : ""
          }`}
          onChange={(e) => {

            const newObj7 = {
              ...ActionObj,
              action: {
                ...ActionObj.action,
                //name: "process_payment",
                arguments: [
                  {
                    name: "gateway",
                    type: "STATIC",
                    value: paymentGateway,
                  },
                ],
              },
            };


            let AppendObj =
              e.target.value === "CONDITION" ? Condition : newObj7;
            handleNodeUpdate(id ? id : action_obj.id, objKey, {
              ...AppendObj,
              id: uuidv4(),
            });
          }}
          value={"NO_EFFECT"}
        >
          <option value={"NO_EFFECT"}>NO EFFECT</option>
          {rootOption.map((data: any,index:any) => {
            return <option key={index} value={data?.value}>{data?.name}</option>;
          })}
        </select>
      </div>
    </>
  );
};

const ConditionJoinRender = ({
  index,
  condition_obj,
  handleNodeUpdate,
  getDropdownValue,
}: {
  index: number;
  condition_obj: any;
  handleNodeUpdate: any;
  getDropdownValue: any;
}) => {
  return (
    <>
      {index + 1 !== condition_obj?.conditions.length && (
        <select
          name="org_id"
          id="org_id"
          className={`w-30 dark:text-neutral-950 flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-2 text-sm outline-none dark:!border-white/10 ${
            !condition_obj?.condition_type
              ? "border-orange-500 text-orange-500 placeholder:text-orange-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
              : ""
          }`}
          onChange={(e) =>
            handleNodeUpdate(
              condition_obj?.id,
              "condition_type",
              e.target.value
            )
          }
          value={condition_obj?.condition_type}
        >
          {ConditionTypes.map((data: any,index:any) => {
            return <option key={index} value={data?.value}>{data?.name}</option>;
          })}
        </select>
      )}
    </>
  );
};

const ConditionRender = ({
  condition_obj,
  handleNodeUpdate,
  index,
  getDropdownValue,
}: {
  condition_obj: any;
  handleNodeUpdate: any;
  index?: number;
  getDropdownValue: any;
}) => {
  // console.log('condition_obj',condition_obj)
  const [startDate, setStartDate] = useState(new Date());
  const [conditionOperator, setConditionOperator] = useState<any[]>();
  const [rightDropdown, setRightDropdown] = useState<any[]>();

  const rightVal =
    index !== undefined
      ? condition_obj?.conditions[index]?.right
      : condition_obj?.conditions?.right;
  // console.log("rightVal", rightVal);

  const leftVal =
    index !== undefined
      ? condition_obj?.conditions[index]?.left
      : condition_obj?.conditions?.left;

  const conditions =
    index !== undefined
      ? condition_obj?.conditions[index]
      : condition_obj?.conditions;

  useEffect(() => {
    if (leftVal.name === "amount" || leftVal.name === "time") {
      setConditionOperator([
        { name: "equals", value: "EQUALS" },
        { name: "not equals", value: "NOT_EQUALS" },
        { name: "greater than", value: "GREATER_THAN" },
        { name: "less than", value: "LESS_THAN" },
      ]);
    }
    if (
      leftVal.name === "geo-location" ||
      leftVal.name === "card-type" ||
      leftVal.name === "currency" ||
      leftVal.name === "day"
    ) {
      setConditionOperator([
        { name: "equals", value: "EQUALS" },
        { name: "not equals", value: "NOT_EQUALS" },
        { name: "in", value: "IN" },
        { name: "not in", value: "NOT_IN" },
      ]);
    }
    if (leftVal.name === "geo-location") {
      setRightDropdown(allCountries);
    }
    if (leftVal.name === "card-type") {
      setRightDropdown(allCardType);
    }
    if (leftVal.name === "currency") {
      setRightDropdown(allCurrency);
    }
    if (leftVal.name === "day") {
      setRightDropdown(allDays);
    }
  }, [condition_obj, leftVal]); // TODO: modify to refresh value based on left value change

  const getValue = (variable: string) => {
    if (variable === "amount") {
      return 0;
    }
    if (variable === "geo-location") {
      return "";
    }
    if (variable === "card-type") {
      return "";
    }
    if (variable === "currency") {
      return "";
    }
    if (variable === "time") {
      return "";
    }
    if (variable === "day") {
      return "";
    }
    // if (variable === "date") {
    //   return ""
    // }
  };

  const getNewObj = (changeObj: any) => {
    let newConditions: any;
    if (index !== undefined) {
      let arr = condition_obj?.conditions;
      arr[index] = { ...arr[index], ...changeObj };
      newConditions = arr;
    } else {
      newConditions = { ...condition_obj?.conditions, ...changeObj };
    }
    return newConditions;
  };

  const handleTimeInput = (date: Date | null) => {
    setStartDate(date);
    // localStorage.setItem('items', JSON.stringify( moment(startDate).format("HH:mm")));

    let right = {
      left: { type: "VARIABLE", name: leftVal?.name },
      right: { type: "STATIC", value: moment(date).format("HH:mm") },
    };
    handleNodeUpdate(condition_obj?.id, "conditions", getNewObj(right));
  };
  const updateIndex = index;
  // check is array or not
  const multipleCondition = Array.isArray(condition_obj.conditions);
  // console.log('condition_obj', condition_obj)

  const dropdownValue = multipleCondition
    ? condition_obj?.conditions[updateIndex]?.right?.value
    : condition_obj?.conditions?.right?.value;
  // console.log("dropdownValue", dropdownValue);

  // console.log('dropdownValue', dropdownValue)
  return (
    <div className="relative flex w-fit items-center whitespace-nowrap rounded-xl border-2 border-blue-200 bg-blue-50/50 text-blue-500">
      {Array.isArray(condition_obj?.conditions) &&
        condition_obj?.conditions.length &&
        index >= 1 && (
          <button
            className="absolute right-[-8px] top-[-8px] z-10 text-orange-600 outline-none"
            onClick={(e) => {
              let arr = condition_obj?.conditions;
              arr.splice(index, 1);
              if (arr.length === 1) {
                handleNodeUpdate(
                  condition_obj?.id,
                  ["condition_type", "conditions"],
                  ["SOLO", arr[0]]
                );
              } else {
                handleNodeUpdate(condition_obj?.id, "conditions", arr);
              }
            }}
          >
            <AiFillMinusCircle className="h-5 w-5" />
          </button>
        )}
      <select
        className={`flex items-center justify-center rounded-l-xl bg-blue-50/50 p-3 pr-0 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50`}
        value={leftVal?.name}
        onChange={(e) => {
          let left = {
            left: { type: "VARIABLE", name: e.target.value },
            right: { type: "STATIC", value: getValue(e.target.value) },
          };
          handleNodeUpdate(condition_obj?.id, "conditions", getNewObj(left));
        }}
      >
        {LeftConditionOperands.map((data: any,index:any) => {
          return <option key={index} value={data?.value}>{data?.name}</option>;
        })}
      </select>
      <select
        className={`flex items-center justify-center border-l-2 border-r-2 border-blue-200 bg-blue-50/50 p-3 pr-0 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50`}
        onChange={(e) => {
          handleNodeUpdate(
            condition_obj?.id,
            "conditions",
            getNewObj({ type: e.target.value })
          );
        }}
        value={conditions?.type}
      >
        {conditionOperator?.map((data: any, index) => {
          return (
            <option  value={data?.value} key={index}>
              {data?.name}
            </option>
          );
        })}
      </select>

      <div
        className={`flex items-center justify-center rounded-r-xl bg-blue-50/50 pl-0 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50`}
      >
        {(leftVal?.name === "geo-location" ||
          leftVal?.name === "card-type" ||
          leftVal?.name === "currency" ||
          leftVal?.name === "day") && (
          <>
            {(
              multipleCondition
                ? condition_obj.conditions[updateIndex]?.type === "IN" ||
                  condition_obj.conditions[updateIndex]?.type === "NOT_IN"
                : // condition_obj.conditions[innerIndex]?.type === "IN" ||
                  // condition_obj.conditions[updateIndex]?.type === "NOT_IN"
                  condition_obj?.conditions?.type === "IN" ||
                  condition_obj?.conditions?.type === "NOT_IN"
            ) ? (
              <Select
                options={
                  leftVal?.name === "geo-location"
                    ? allCountries.map((data: any) => {
                        return {
                          value: data.code,
                          label: data?.name,
                        };
                      })
                    : leftVal?.name === "card-type"
                    ? allCardType.map((data: any) => {
                        return {
                          value: data?.value,
                          label: data?.name,
                        };
                      })
                    : leftVal?.name === "currency"
                    ? allCurrency.map((data: any) => {
                        return {
                          value: data?.value,
                          label: data?.name,
                        };
                      })
                    : leftVal?.name === "day"
                    ? allDays.map((data: any) => {
                        return {
                          value: data?.value,
                          label: data?.name,
                        };
                      })
                    : []
                }
                placeholder={
                  leftVal?.name === "geo-location"
                    ? "Select location"
                    : leftVal?.name === "card-type"
                    ? "Select card type"
                    : leftVal?.name === "currency"
                    ? "Select currency"
                    : leftVal?.name === "day"
                    ? "Select days"
                    : ""
                }
                onChange={(e:any) => {
                  let right = {
                    left: { type: "VARIABLE", name: leftVal?.name },
                    right: { type: "STATIC", value: e },
                  };
                  handleNodeUpdate(
                    condition_obj?.id,
                    "conditions",
                    getNewObj(right)
                  );
                }}
                isSearchable={true}
                isMulti
                value={dropdownValue}
                // value={getDropdownValue(updateIndex)}
                // isMulti={['IN', 'NOT_IN'].indexOf(condition_obj?.conditions?.type) !== -1}
              />
            ) : (
              <select
                className="w-24 rounded-r-xl bg-blue-50/50 p-3 outline-none"
                value={rightVal?.value}
                onChange={(e) => {
                  let right = {
                    left: { type: "VARIABLE", name: leftVal?.name },
                    right: { type: "STATIC", value: e.target.value },
                  };
                  handleNodeUpdate(
                    condition_obj?.id,
                    "conditions",
                    getNewObj(right)
                  );
                }}
              >
                {rightDropdown?.map((data: any, index) => {
                  return (
                    <option  value={data.code || data.value} key={index}>
                      {data?.name}
                    </option>
                  );
                })}
              </select>
            )}
          </>
        )}
        {leftVal?.name === "amount" && (
          <input
            type="number"
            className="w-24 rounded-r-xl bg-white p-3 outline-none"
            value={rightVal?.value}
            onChange={(e) => {
              let right = {
                left: { type: "VARIABLE", name: leftVal?.name },
                right: { type: "STATIC", value: e.target.value },
              };
              handleNodeUpdate(
                condition_obj?.id,
                "conditions",
                getNewObj(right)
              );
            }}
          />
        )}

        {leftVal?.name === "time" && (
          <DatePicker
            selected={startDate}
            onChange={handleTimeInput}
            // @ts-ignore
            value={rightVal?.value.length > 0 ? rightVal?.value : "Select Time"}
            // value={startDate? moment(startDate).format('LT'):moment().format('LT')}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            dateFormat="HH:mm" // Use "HH:mm" to display time in 24-hour format
            timeCaption="Time" // Add a label for the time picker
          />
        )}
      </div>

      {/* {condition_obj?.condition_type === "OR" && <>or</> } */}
    </div>
  );
};

const AddNodeRender = ({
  objKey,
  condition_obj,
  handleNodeUpdate,
  paymentGateway,
}: {
  objKey: string;
  condition_obj: any;
  handleNodeUpdate: any;
  paymentGateway: string;
}) => {
  return (
    <div className="ml-8 flex gap-3">
      {objKey === "1" ? (
        <div className="absolute left-0 top-0 z-[8] h-10 w-8 rounded-bl-xl border-b-2 border-l-2 border-teal-500" />
      ) : (
        <div className="absolute bottom-10 left-0 top-0 w-8 rounded-bl-xl border-b-2 border-l-2 border-orange-500" />
      )}
      <button
        className="my-5 h-10 rounded-xl border-2 bg-white px-3 py-2 outline-none"
        onClick={() => {
          const newObj4 = {
                    ...ActionObj,
                    action: {
                      ...ActionObj.action,
                      arguments: [
                        {
                          name: "gateway",
                          type: "STATIC",
                          value: paymentGateway,
                        },
                      ],
                    },
                  };

          handleNodeUpdate(condition_obj?.id, objKey, {
            ...newObj4,
            id: uuidv4(),
          });
        }}
      >
        Add Action
      </button>
      <button
        className="my-5 h-10 rounded-xl border-2 bg-white px-3 py-2 outline-none"
        onClick={() => {
          handleNodeUpdate(condition_obj?.id, objKey, {
            ...Condition,
            id: uuidv4(),
          });
        }}
      >
        Add Condition
      </button>
    </div>
  );
};

const RemoveNodeRender = ({
  handleRemoveNode,
  id,
}: {
  id: string;
  handleRemoveNode: any;
}) => {
  return (
    <button
      className={`rounded-full border-2 border-orange-200 bg-orange-50 p-2 outline-none`}
      onClick={() => handleRemoveNode(id)}
    >
      <IoMdTrash className="h-6 w-6 text-orange-500" />
    </button>
  );
};

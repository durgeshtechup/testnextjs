import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { createClientGateway } from "api/client-gateways";

import {
  enableGateway,
  getEnabledSmartRoute,
} from "../../../../api/client-gateways";

import { getAllGatewaysByClient } from "api/gateways";
import Card from "components/card";
import DivLoader from "components/divloader/DivLoader";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { toast } from "react-hot-toast";
import { MdListAlt } from "react-icons/md";
import { GatewayTypes } from "./CreateClientGatewaysModal";

import { Link } from "react-router-dom";
import Image from "next/image";

const smart_routingimg = require("../../../../assets/svg/smart_routing.svg");

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result as any[];
};

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  background: isDragging ? "rgb(224, 231, 255)" : "#fff",
  position: "relative",
  ...draggableStyle,
});

const ArrangeClientModal = ({ id, value }: { id: string; value: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [addedGateways, setAddedGateways] = useState<any[]>([]);
  const [newArr, setNewArr] = useState<any[]>([]);
  const [isSmartRoutingEnabled, setIsSmartRoutingEnabled] =
    useState<Boolean>(false);

  useEffect(() => {
    setIsSmartRoutingEnabled(value?.isSmartRouteEnabled);
  }, [value]);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   getEnabledSmartRoute(id)
  //     .then((data) => {
  //       // console.log('data122', data[0].isSmartRouteEnabled)
  //       setIsSmartRoutingEnabled(data[0].isSmartRouteEnabled);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // }, [id]);

  const fetchAddedGateways = () => {
    setIsLoading(true);
    getAllGatewaysByClient(id)
      .then((data) => {
        // console.log('data52', data)
        setAddedGateways(() => {
          let arr = data.map((ele: any) => {
            return {
              ...ele,
              auth_info: {
                ...ele.auth_info,
                priority: ele.auth_info?.priority ?? 0,
              },
            };
          });
          arr.sort(
            (a: any, b: any) => a.auth_info?.priority - b.auth_info?.priority
          );
          return arr;
        });
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching gateways"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClose = () => {
    setAddedGateways([]);
    onClose();
    // setIsSmartRoutingEnabled(false);
  };
  const handleSmartRouting = () => {
    // Save the id in localStorage
    localStorage.setItem("clientIds", id);

    const inputData = {
      id: id,
      isSmartRouteEnabled: isSmartRoutingEnabled,
    };

    // @ts-ignore
    enableGateway(inputData)
      .then((data) => {
        // console.log("data87", data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onDragEnd = (newItems: any[]) => {
    setAddedGateways(newItems);
    let arr: any[] = [];
    newItems.forEach((ele, index) => {
      arr.push({
        ...ele,
        auth_info: { ...ele.auth_info, priority: index + 1 },
      });
    });
    setNewArr(arr);
  };

  // useEffect(() => {
  //   // console.log("isSmartRoutingEnabled", isSmartRoutingEnabled);
  // }, [isSmartRoutingEnabled]);

  const handleSubmit = () => {
    // console.log(isSmartRoutingEnabled,"line 134")
    if (isSmartRoutingEnabled === false) {
      const inputData = {
        id: id,
        isSmartRouteEnabled: isSmartRoutingEnabled,
      };

      // @ts-ignore
      enableGateway(inputData)
        .then((data) => {
          // console.log("data189", data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }

    newArr.forEach((input_data) => {

      Object.keys(input_data)?.forEach((key) => {
        if (!["auth_info", "client_id", "gateway_id"].includes(key)) {
          delete input_data[key]

        }
      })
      const inputs = {
        client_id: input_data.client_id,
        gateway_id: input_data.gateway_id,
        method: "put",
        body: input_data,
      };

      // console.log("inputs", inputs);
      createClientGateway(inputs)
        .then((data) => {
          // console.log("data106", data);
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message ??
            "Client gateway adding failed for" + input_data.name
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
    toast.success("Priority saved");
    onClose();
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      onDragEnd(addedGateways);
    } else {
      const newItems = reorder(
        addedGateways,
        result.source.index,
        result.destination.index
      );
      onDragEnd(newItems);
    }
  };

  const handleToggle = () => {

    setIsSmartRoutingEnabled(!isSmartRoutingEnabled);
  };

  return (
    <>
      <button className="text-indigo-500 outline-none" title="Change Gateway">
        <MdListAlt
          className="h-5 w-5 cursor-pointer"
          onClick={() => {
            fetchAddedGateways();
            onOpen();
          }}
        />
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay className="bg-[#000] !opacity-30" />
        {/* <ModalContent className="!z-[1002] !m-auto !w-max min-w-[500px] !max-w-[85%] md:top-[12vh]"> */}
        <ModalContent className="z-[1002] !m-auto !p-3 sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-center min-h-[100vh]">
          <ModalBody>

            <Card extra="px-[30px] pt-[35px] pb-[35px] max-w-[800px]  flex flex-col !z-[1004]">
              <h1 className="mb-[30px] text-3xl font-bold">
                {isSmartRoutingEnabled
                  ? "Smart Routing"
                  : "Change gateways priority"}
              </h1>

              {addedGateways.length > 0 && (
                <div className="flex justify-end">
                  <label className="relative mb-3 inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      //@ts-ignore
                      checked={isSmartRoutingEnabled}
                      onChange={handleToggle}
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-400 after:absolute after:left-[2px] after:top-[4px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-indigo-800" />
                    <span className="ml-3 text-lg font-medium text-gray-900 dark:text-gray-300">
                      Smart Routing
                    </span>
                  </label>
                </div>
              )}

              {isLoading && (
                <DivLoader className="m-5 h-6 w-6 border-indigo-500" />
              )}
              {isSmartRoutingEnabled ? (
                <>
                  <div style={{ height: "400px", overflow: "auto" }}>
                    <div className="flex items-center justify-center p-3">
                      <Image
                        src={smart_routingimg?.default}
                        alt="smart_routing_img"
                        className=""
                        loading="lazy"
                      />
                    </div>
                    <h1 className="mb-[35px] text-xl font-bold ">
                      Do you require the Smart Routing feature? You can
                      conveniently configure custom routing.
                    </h1>
                    <div className="flex gap-2">
                      <button
                        onClick={handleClose}
                        className="linear rounded-xl bg-gray-100 px-5 py-2 text-base font-medium text-navy-700 outline-none transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                      >
                        Close
                      </button>
                      <a
                        className="inline-flex"
                        href={`/admin/smart-routing/${id}`}
                      >
                        <button
                          className="linear rounded-lg bg-indigo-600 px-5 py-2 text-base
                   font-medium text-white outline-none transition duration-200 hover:bg-indigo-700 hover:text-white active:bg-indigo-600 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                          //@ts-ignore
                          onClick={handleSmartRouting}
                        >
                          Smart Routing
                        </button>
                        
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {addedGateways.length > 0 ? (
                    <>
                      {/* <div className="max-h-[calc(100vh-400px)] overflow-auto overflow-x-hidden px-[30px] scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1"> */}
                      <div className="mt-5 sm:max-h-[calc(100vh-500px)]  max-h-[calc(100vh-310px)] overflow-auto overflow-x-hidden px-[30px] scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1">
                        <DragDropContext onDragEnd={handleDragEnd}>
                          <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
                                {addedGateways?.map((data, index) => {
                                  // console.log("data235", data);
                                  let img_src = GatewayTypes.filter(
                                    (ele) => ele.name === data.name
                                  )[0]?.image;
                                  return (
                                    <Draggable
                                      key={data?.gateway_id}
                                      draggableId={data?.gateway_id?.toString()}
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                          )}
                                          className="mb-5 rounded-xl border border-gray-200 shadow-3xl shadow-shadow-500"
                                        >
                                          <div className="flex h-fit items-center justify-between">
                                            <div className="flex items-center justify-center p-3">
                                              <Image
                                                src={img_src}
                                                alt={data?.name}
                                                loading="lazy"
                                                className="h-24 w-24 object-contain"
                                              />
                                            </div>
                                            <p
                                              className={
                                                "h-full w-full text-center text-xl font-bold capitalize"
                                              }
                                            >
                                              {data?.name}
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      </div>
                      <div className="mt-5 inline-flex justify-start gap-2">
                        <button
                          onClick={handleClose}
                          className="linear rounded-xl bg-gray-100 px-5 py-2 text-base font-medium text-navy-700 outline-none transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                        >
                          Close
                        </button>
                        <button
                          onClick={handleSubmit}
                          className="linear rounded-xl bg-indigo-50 px-5 py-2 text-base font-medium text-indigo-500 outline-none transition duration-200 hover:bg-indigo-600/5 active:bg-indigo-700/5 dark:bg-indigo-400/10 dark:text-white dark:hover:bg-indigo-300/10 dark:active:bg-indigo-200/10"
                        >
                          {isLoading ? (
                            <DivLoader className="h-6 w-6 border-indigo-500" />
                          ) : (
                            "Save"
                          )}
                        </button>
                      </div>
                    </>
                  ) : (
                    !isLoading && (
                      <>
                        <h1 className="mb-[20px] text-2xl font-bold">
                          No Payment Gateways added
                        </h1>
                        <p>Please add at least two gateways to continue.</p>
                        <div className="mt-5 flex gap-2">
                          <button
                            onClick={handleClose}
                            className="linear rounded-xl bg-gray-100 px-5 py-2 text-base font-medium text-navy-700 outline-none transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                          >
                            Close
                          </button>
                        </div>
                      </>
                    )
                  )}
                </>
              )}
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ArrangeClientModal;

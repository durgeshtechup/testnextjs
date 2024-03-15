import React, { useState, useRef, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import DivLoader from "components/divloader/DivLoader";
import { FaChevronDown } from "react-icons/fa";
import { useOnClickOutsideSingel } from "utils/useOnClickOutside";
import { MultiSelect } from "react-multi-select-component";


const ClientPayment = ({
  Organization,
  slectedOrg,
  assignPaymentMethod,
  showPaymnets = true,
  handleSelectionChange,
  errorclass,
  methodName,
  viewMode,
  allGateways,
}: {
  Organization?: any;
  slectedOrg?: string;
  assignPaymentMethod?: any,
  showPaymnets?: boolean;
  handleSelectionChange: any;
  errorclass?: boolean;
  methodName?: boolean;
  viewMode?: boolean;
  allGateways: any;
}) => {

  const [isLoading, setIsLoading] = useState<boolean>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = React.useState([]);
  const [options, setGatewayOption] = React.useState([]);



  const handleChildChange = (e: any) => {
    setSelected(e)
    handleSelectionChange(e)

  };

  React.useEffect(() => {
    if (selected && assignPaymentMethod.length > 0) {
      //console.log("gggg",allGateways);
      const opt = assignPaymentMethod.map((ele: any) => {
        const gateway = allGateways?.find((item: any) => item.id === ele.value);
        return {
          value: ele.value,
          label: methodName ? (gateway?.name) : ele.label,
        }
      });
      //console.log("gggg",opt);
      setSelected(opt);
    }
    if (Organization !== undefined) {
      const newOptions = Organization.map((ele: any) => {
        const gateway = allGateways?.find((item: any) => item.id === ele);
        return {
          value: ele,
          label: methodName ? (gateway?.name) : ele,
        }
      });
      setGatewayOption(newOptions);
    }
    // console.log("sdfsdf", allGateways)




  }, [Organization]);
  useEffect(() => {

    // if (!Organization) {
    console.log("sdfsdf", allGateways)
    setGatewayOption(
      allGateways.map((ele: any) => {
        return {
          ...ele,
          value: ele.id,
          label: ele?.name
        }
      })
    )
    // }
  }, [])



  console.log("disabled={viewMode}", viewMode);
  return (
    <>
      {slectedOrg !== "" ? (
        <div className="mb-2 mt-2 text-sm text-navy-700 dark:text-white">
          <label className="ml-1.5 block pb-1 text-sm font-bold text-gray-900 dark:text-white">
            Gateways
          </label>
          <MultiSelect
            options={options}
            value={selected}
            onChange={handleChildChange}
            labelledBy={"Select"}
            isCreatable={true}
            disabled={viewMode}
            className={
              (errorclass === false) ? 'errormultiselect '
                : viewMode === true ? 'disableClass'

                  : ''}

          />
        </div>
      ) : (

        <label className="ml-1.5 block pb-1 text-sm font-bold text-gray-900 dark:text-white">
          No Payment Gateways
        </label>
      )}
    </>
  );

};


export default ClientPayment;
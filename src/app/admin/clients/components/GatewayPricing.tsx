import React, { useState,useRef,useEffect } from "react";
import { Select } from '@chakra-ui/react';
import DivLoader from "components/divloader/DivLoader";
import InputField from "components/fields/InputField";



const GatewayPricing = ({
	  pricingType,
	  info,
    formValues,
    setFormValues,
	  infoErr,
	  handleSelectionChange,
    handleInputChange,
	}: {
	  pricingType?: string;
    info?: any;
    formValues?: any;
	  setFormValues?: (e: any) => void;
	  infoErr?: any;
	  handleSelectionChange?: (e: any) => void;
    handleInputChange?: (value: string) => void;
	}) => {
	  const [type, setType] = useState<string>("");
	  const [selected, setSelected] = useState<string | undefined>(undefined);

	  const priceOptions = [
	    { label: 'Percentage', value: 'percentage' },
	    { label: 'Fixed', value: 'fixed' },
	    { label: 'Percentage + Fixed', value: 'percentage_fixed' },
	  ];

	  const handleValueChange = (e: any) => {
      setFormValues({ ...formValues, [e.target.id]: e.target.value });
    }

	  const handleOnchange = (e:any) => {
	  	
	    setSelected(e.target.value);
	    handleSelectionChange && handleSelectionChange(e.target.value);
      setFormValues({ ...formValues, [e.target.id]: e.target.value });
     
	  };

	  useEffect(() => {
	    setType(pricingType);
	  }, [pricingType]);
	return (
	  <div>

	  	<div className="mb-3 block items-center gap-3 ">
          <label className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium">
            {type===""} {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
          <select
            id={type}
            name={type}
            value={selected}
            onChange={handleOnchange}
            className="mt-1 flex h-10 w-full items-center justify-center rounded-xl border  bg-white/0 p-2 text-sm text-gray-700 outline-none dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
          >
            <option value="">Select {type}</option>
            {priceOptions?.map((data: any) => {
              return (
                <option
                  value={data?.value}
                >{`${data?.label}`}</option>
              );
            })}
          </select>

        </div>
        {selected === 'percentage' || selected === 'percentage_fixed' ? (
        <InputField
            variant="auth"
            extra="mb-2 w-full"
            label="Percentage"
            placeholder="Percentage"
            id={`percentage_${type}`}
            type="text"
            disabled={false}
            value={info?.percentage}
            state={infoErr?.percentage ? "error" : ""}
            onChange={handleValueChange}
        
            
        />
        ) : null}
        {selected === 'fixed' || selected === 'percentage_fixed' ? (
        <InputField
            variant="auth"
            extra="mb-2 w-full"
            label="Fixed"
            placeholder="Fixed"
            id={`fixed_${type}`}
            type="text"
            disabled={false}
            value={info?.fixed}
            state={infoErr?.fixed ? "error" : ""}
            onChange={handleValueChange}
        
            
        />
        ) : null}

	  </div>
	);

}; 
export default GatewayPricing;

import React, { useState,useRef,useEffect } from "react";
import { Select } from '@chakra-ui/react';
import DivLoader from "components/divloader/DivLoader";
import InputField from "components/fields/InputField";


interface FormData {
  id: number;
  address: string;    
}

const WalletAddress = ({
	  index,   
    formValues,
    setFormValues,
    infoErr,
  }: {
    index:any;    
    formValues?: any;
    setFormValues?: (e: any) => void;
    infoErr: any;
  }) => {
    const [count, setCount] = useState<number>(1);  
    const FormField = [
      {value:'address',lable:"Address"},      
    ];

    const handleValueChange = (e: any) => {
      setFormValues({ ...formValues, [e.target.id]: e.target.value });
    }
     
  return (    
    <div className="grid grid-cols-3">
      {FormField.map((row) => {        
        return (        
           <InputField
            key={index} 
            variant="auth"
            extra="mb-2 w-full"
            name={`${row.value}[${index}]`}
            label={`${row.lable}`}
            placeholder={`${row.lable}`}
            id={`${row.value}_${index}`}
            type="text"
            disabled={false}
            onChange={handleValueChange}
            value={formValues ? formValues[row.value] : ''} 
            state={infoErr && infoErr[row.value] ? "error" : ""}
          />
          )}
        )}
    </div>    
  );
};
export default WalletAddress;
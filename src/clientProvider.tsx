import React, { useState, createContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
// create context

export const ClientContext = createContext({
    singleRoleData:[],
    setSingleRoleData :(a:any)=>{},
    paymentGateway:false,
    setPaymentGateway:(b:any)=>{},
    dashboardData:true,
    setDashboardData:(c:any)=>{},
    paymentType:"all",
    setPaymentType:(d:any)=>{},
    filter:{
      card_type:"",
      timezone:"",
      status: "all",
      client: [],
      dates: [],
      payment_status: [],
      gateway: [],
    },
        setFilter:(d?:any)=>{},
});

// export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {

  // const [updateUser, setUpdateUser] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState(false);
  const [dashboardData, setDashboardData] = useState(true);
  const [paymentType, setPaymentType] = useState("all");
  const [singleRoleData, setSingleRoleData] = useState([]);
  // interface Filter {
  //   status: string;
  //   client: Array<any>;
  //   dates?: [Date, Date];
  //   payment_status?: Array<any>;
  //   gateway?: Array<any>;
  // }
  const [filter, setFilter] = useState({
    status: "all",
    client: [],
    dates: null,
    payment_status: [],
    gateway: [],
    card_type:"",
    timezone:"",
  });

  return (
    <ClientContext.Provider
      value={{
        paymentGateway,
        setPaymentGateway,
        dashboardData,
        setDashboardData,
        paymentType,
        setPaymentType,
        singleRoleData,
        setSingleRoleData,
        filter,
        setFilter,
        // updateUser,
        // setUpdateUser
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

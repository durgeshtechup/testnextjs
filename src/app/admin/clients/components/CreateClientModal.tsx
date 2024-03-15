import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { createClient, getClient, updateClientById } from "api/clients";
import {
  getAllOrganizations,
  getAllOrganizationsUser,
  getOrganization,
} from "api/organizations";
import Card from "components/card";
import DivLoader from "components/divloader/DivLoader";
import InputField from "components/fields/InputField";
import TextArea from "components/fields/TextArea";
import ClientPayment from "./ClientPayment";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { BsPlusCircle } from "react-icons/bs";
import { MdEdit, MdInfo } from "react-icons/md";

interface iCreateOrgForm {
  name: string;
  org_id: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  assigned_payment_methods?: string;
}

interface Organization {
  id: string;
  name: string;
  description: string;
  payment_methods: string[];
}

const CreateClientModal = ({
  fetchClients,
  id,
  info,
  roleData,
  allGateways,
}: {
  fetchClients: () => void;
  id?: string;
  info?: boolean;
  roleData?: any;
  allGateways?: any;
}) => {
  const rootForm = {
    name: "",
    org_id: "",
    description: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    assigned_payment_methods: "",
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formValues, setFormValues] = React.useState<iCreateOrgForm>(rootForm);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [allorganizations, setallOrganizations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [viewMode, setViewMode] = React.useState<boolean>(info);
  const [org, setOrg] = React.useState();
  const [orgID, setOrgID] = React.useState();
  const [paymentMethods, setPaymentMethods] = React.useState([]);
  const [checkedpaymentMethods, setCheckedPaymentMethods] = React.useState([]);
  const [multiselectError, setMultiselectError] = useState<boolean>(false);
  const [formValuesErr, setFormValuesErr] = React.useState<iCreateOrgForm>(rootForm);
  const [methodName, setMethodName] = useState<boolean>(false);


  const fetchOrganizations = () => {
    setIsLoading(true);
    // getAllOrganizationsUser()
    getAllOrganizations()
      .then((data) => {
        setOrganizations(
          data?.[0]?.map((ele: any) => {
            return {
              name: ele.name,
              id: ele.id,
            };
          })
        );
        setallOrganizations(data);
        //console.log("TTTTTTT",organizations,allorganizations);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching organizations"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function fetchClient() {

    getClient(id)
      .then((data: any) => {
        setFormValues(data[0]);

        setOrgID(data[0].org_id);

        const selectedOptions = data[0]?.assigned_payment_methods.map((ele: any) => {
          const gateway = allGateways?.find((item: any) => item.id === ele);
          return {
            value: ele,
            label: methodName ? (gateway?.name) : ele,
          }
        });


        setCheckedPaymentMethods(selectedOptions);
        if (data[0]?.assigned_payment_methods?.length > 0) {
          setMultiselectError(true)
        } else {
          setMultiselectError(false)
        }

      })
      .catch((err: any) => {
        toast.error(err?.response?.data?.message ?? "Unable to fetch data");
      });

  }

  React.useEffect(() => {
    setMultiselectError(true);
    if (orgID !== undefined) {

      let method = roleData[0]?.client?.value?.client_show_method_name;
      setMethodName(method);

      getOrganization({ id: orgID })
        .then((data: any) => {
          setPaymentMethods(data[0]?.payment_methods);

        })
        .catch((err: any) => {
          toast.error(err?.response?.data?.message ?? "Unable to fetch data");
        });
    }
  }, [orgID]);



  const handleClose = () => {
    setFormValues(rootForm);
    setFormValuesErr(rootForm);
    onClose();
  };


  function handleChildSelectionChange(selected: any) {
    setFormValues((prevData: any) => {
      return { ...prevData, assigned_payment_methods: selected?.map((ele: any) => ele.value) };
    });

    if (selected?.length > 0) {
      setMultiselectError(true)
    } else {
      setMultiselectError(false)
    }

  }
  function handleValueChange(e: any) {

    let method = roleData[0]?.client?.value?.client_show_method_name;
    setMethodName(method);
    setFormValues((preVal: any) => {

      return { ...preVal, [e.target.id]: e.target.value };

    });
    setFormValuesErr((preVal: any) => {
      return { ...preVal, [e.target.id]: "" };
    });
    const orgData = (e.target.value) ? e.target.value : "";


    const getPaymentMethods = findPaymentMethods(orgData);

    setOrg(orgData);

  }

  function findPaymentMethods(orgData: string) {

    const scrap_data: Organization[] = allorganizations[0];


    const selected2 = scrap_data.find((organization) => organization.id === orgData);
    //console.log("yyyyyyy2",selected2); //need to change   
    if (selected2) {
      setPaymentMethods(selected2.payment_methods);
      //console.log("yyyyyyy",selected2.payment_methods); //need to change   
    }

  }

  function validateData() {
    let verifier: iCreateOrgForm;
    //console.log("formValues3",formValues);
    if (!formValues?.name) {
      verifier = { ...verifier, name: "Please enter a value" };
    }
    if (!formValues?.org_id) {
      verifier = { ...verifier, org_id: "Please enter a value" };
    }
    if (formValues?.assigned_payment_methods?.length < 1) {
      verifier = { ...verifier, assigned_payment_methods: "Please enter a value" };
      //console.log("eee",verifier);
      setMultiselectError(false);

    } else {
      //console.log("ffff",verifier);
      setMultiselectError(true);

    }
    if (verifier) {
      setFormValuesErr(verifier);
      //console.log("verifier",verifier);
      return false;
    }
    return true;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();


    let validate = validateData();
    //console.log('formvalues:',formValues); return; 

    if (validate) {
      try {
        setIsLoading(true);
        if (id) {
          //console.log("updateClientById", updateClientById);
          await updateClientById(formValues);
          //console.log("updateClientById", updateClientById);
        } else {
          await createClient(formValues);
        }
        fetchClients();
        handleClose();
      } catch (err: any) {
        if (err?.response?.status === 422) {
          toast.error("Please provide valid values");
        } else {
          toast.error(err?.response?.data?.message ?? "Login failed");
        }
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      {info ? (
        roleData?.[0]?.client?.value?.view_client && (
          <div
            onClick={() => {
              if (id) {
                fetchClient();
              }
              fetchOrganizations();
              onOpen();
            }}
          >
            <MdInfo
              className="h-5 w-5 cursor-pointer text-indigo-500"
              title="View"
            />
          </div>
        )
      ) : id ? (
        roleData?.[0]?.client?.value?.edit_client && (
          <div
            onClick={() => {
              if (id) {
                fetchClient();
              }
              fetchOrganizations();
              onOpen();
            }}
          >
            <MdEdit
              className="h-5 w-5 cursor-pointer text-indigo-500"
              title="Edit"
            />
          </div>
        )
      ) : roleData?.[0]?.client?.value?.add_client ? (
        <div
          onClick={() => {
            onOpen();
            fetchOrganizations();
          }}
        >
          {/* <Card extra="w-fit px-5 cursor-pointer border-brand-500"> */}
            <button className="flex items-center justify-center gap-2 whitespace-nowrap border p-2 rounded-md text-navy-700 outline-none dark:text-gray-200">
              <BsPlusCircle className="h-5 w-5 text-brand-500" /><span className="text-brand-500"> Add new client</span>
            </button>
          {/* </Card> */}
        </div>
      ) : null}

      <Modal isOpen={isOpen} onClose={() => { }}>
        <ModalOverlay className="bg-[#000] !opacity-30" />
        {/* <ModalContent className="z-[1002] rounded-2 md:!m-auto sm:my-8 sm:w-full sm:max-w-lg md:top-[12vh] top-[12vh] !m-3"> */}
        {/* <ModalContent className="z-[1002] !m-auto !p-3 sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-center min-h-[100vh]">
          <ModalBody>

            <Card extra=" max-w-[800px]  flex flex-col !z-[1004]"> */}

        <ModalContent className="z-[1002] !m-auto   sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-start  min-h-[85vh] max-h-[100vh] overflow-auto scrollbarhide ">
          <ModalBody className="py-2">

            <Card extra=" max-w-[800px]  flex flex-col !z-[1004] ">
              <h1 className="p-5 px-[30px] text-2xl font-bold">
                {info ? "View" : id ? "Edit Clients " : "Create Client"}
              </h1>
              {info && (
                <MdEdit
                  className="absolute right-7 top-10 h-6 w-6 cursor-pointer text-indigo-500"
                  onClick={() => {
                    setViewMode(!viewMode);
                  }}
                />
              )}
              {/* <div className="max-h-[calc(100vh-300px)] overflow-y-auto overflow-auto overflow-x-hidden px-[30px] scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1"> */}
              {/* <div className="sm:max-h-[calc(100vh-300px)] max-h-[calc(100vh-190px)] overflow-y-auto overflow-auto overflow-x-hidden px-[30px] scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1"> */}
              {/* <div className="sm:max-h-[calc(100vh-300px)] max-h-[calc(100vh-190px)] overflow-y-auto overflow-auto overflow-x-hidden px-[30px] scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1"> */}
              <div className="px-[35px]">

                <div className="mb-2">
                  <label
                    htmlFor="org_id"
                    className={`ml-1.5 text-sm font-bold text-gray-900 dark:text-white`}
                  >
                    Organization<span className="important">*</span>
                  </label>
                  <select
                    name="org_id"
                    id="org_id"
                    className={`mt-2 flex h-12 w-full items-center text-gray-700 justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white ${formValuesErr?.org_id
                      ? "border-orange-500 text-orange-500 placeholder:text-orange-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                      : ""
                      } `}
                    onChange={handleValueChange}
                    disabled={viewMode}

                  >
                    <option
                      disabled={viewMode}
                      value={""}
                      selected={formValues?.org_id === ""}
                    >
                      No organization
                    </option>
                    {organizations.map((data, index) => {
                      return (
                        <option
                          disabled={viewMode}
                          value={data.id}
                          id={index.toString()}
                          selected={data.id === formValues?.org_id}
                        >
                          {data.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {/* <label
                  className={`ml-1.5 text-sm font-bold text-gray-900 dark:text-white`}
                >
                  {" "}
                  Name<span className="important">*</span>
                </label> */}
                <InputField
                  label="Name*"
                  variant="auth"
                  extra="mb-2 w-full"
                  placeholder="Google inc."
                  id="name"
                  type="text"
                  disabled={viewMode}
                  value={formValues?.name}
                  state={formValuesErr?.name ? "error" : ""}
                  onChange={handleValueChange}
                />

                <div className="flex gap-5">
                  <InputField
                    variant="auth"
                    extra="mb-2 w-full"
                    label="Website"
                    placeholder="www.google.com"
                    id="website"
                    type="text"
                    disabled={viewMode}
                    value={formValues?.website}
                    state={formValuesErr?.website ? "error" : ""}
                    onChange={handleValueChange}
                  />
                  <InputField
                    variant="auth"
                    extra="mb-2 w-full"
                    label="Email"
                    placeholder="google@gmail.com"
                    id="email"
                    type="text"
                    disabled={viewMode}
                    value={formValues?.email}
                    state={formValuesErr?.email ? "error" : ""}
                    onChange={handleValueChange}
                  />
                </div>

                <InputField
                  variant="auth"
                  extra="mb-2 w-full"
                  label="Phone"
                  placeholder="+919909988088"
                  id="phone"
                  type="text"
                  disabled={viewMode}
                  value={formValues?.phone}
                  state={formValuesErr?.phone ? "error" : ""}
                  onChange={handleValueChange}
                />

                <InputField
                  variant="auth"
                  extra="mb-2 w-full"
                  label="Address line"
                  placeholder="45 - Test street"
                  id="address"
                  type="text"
                  disabled={viewMode}
                  value={formValues?.address}
                  state={formValuesErr?.address ? "error" : ""}
                  onChange={handleValueChange}
                />

                <div className="flex gap-5">
                  <InputField
                    variant="auth"
                    extra="mb-2 w-full"
                    label="City"
                    placeholder="Mountain View"
                    id="city"
                    type="text"
                    disabled={viewMode}
                    value={formValues?.city}
                    state={formValuesErr?.city ? "error" : ""}
                    onChange={handleValueChange}
                  />
                  <InputField
                    variant="auth"
                    extra="mb-2 w-full"
                    label="State"
                    placeholder="California"
                    id="state"
                    type="text"
                    disabled={viewMode}
                    value={formValues?.state}
                    state={formValuesErr?.state ? "error" : ""}
                    onChange={handleValueChange}
                  />
                </div>

                <div className="flex gap-5">
                  <InputField
                    variant="auth"
                    extra="mb-2 w-full"
                    label="Country"
                    placeholder="USA"
                    id="country"
                    type="text"
                    disabled={viewMode}
                    value={formValues?.country}
                    state={formValuesErr?.country ? "error" : ""}
                    onChange={handleValueChange}
                  />
                  <InputField
                    variant="auth"
                    extra="mb-2 w-full"
                    label="Postal Code"
                    placeholder="850125"
                    id="postal_code"
                    type="text"
                    disabled={viewMode}
                    value={formValues?.postal_code}
                    state={formValuesErr?.postal_code ? "error" : ""}
                    onChange={handleValueChange}
                  />
                </div>

                <TextArea
                  variant="auth"
                  extra="mb-2 w-full"
                  label="Description"
                  placeholder=""
                  id="description"
                  disabled={viewMode}
                  value={formValues?.description}
                  state={formValuesErr?.description ? "error" : ""}
                  onChange={handleValueChange}
                />

                <ClientPayment
                  Organization={paymentMethods}
                  slectedOrg={org}
                  assignPaymentMethod={checkedpaymentMethods}
                  handleSelectionChange={handleChildSelectionChange}
                  errorclass={multiselectError}
                  methodName={methodName}
                  viewMode={viewMode}
                  allGateways={allGateways}
                />


              </div>

              <div className="mt-5 flex gap-2 px-[30px] pb-[30px]">
                <button
                  onClick={handleClose}
                  className="linear rounded-xl bg-gray-100 px-5 py-2 text-base font-medium text-navy-700 outline-none transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                >
                  Close
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={viewMode || isLoading}
                  className={
                    viewMode
                      ? "linear rounded-xl bg-indigo-50 px-5 py-2 text-base font-medium text-indigo-500 outline-none transition duration-200 hover:bg-indigo-600/5 active:bg-indigo-700/5 dark:bg-indigo-400/10 dark:text-white dark:hover:bg-indigo-300/10 dark:active:bg-indigo-200/10"
                      : "linear update rounded-xl bg-indigo-50 px-5 py-2 text-base font-medium text-indigo-500 outline-none transition duration-200 hover:bg-indigo-600/5 active:bg-indigo-700/5 dark:bg-indigo-400/10 dark:text-white dark:hover:bg-indigo-300/10 dark:active:bg-indigo-200/10"
                  }
                >
                  {isLoading ? (
                    <DivLoader className="h-6 w-6 border-indigo-500" />
                  ) : (
                    <>{id ? "Update" : "Create"}</>
                  )}
                </button>
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateClientModal;

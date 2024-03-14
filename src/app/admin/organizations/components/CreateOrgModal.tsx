import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay } from "@chakra-ui/modal";
import {
  createOrganization,
  getOrganization,
  updateOrganization,
} from "api/organizations";
import sipe from "assets/img/payment-clients/sipe.png";
import pixLotus from "assets/img/payment-clients/pix.png";
import pix from "assets/img/payment-clients/pix.png";
import blumon from "assets/img/payment-clients/blumon.png";
import stripe from "assets/img/payment-clients/stripe.png";
import memphis from "assets/img/payment-clients/memphis.png";

import repyd from "assets/img/payment-clients/rapyd.png";
import mit from "assets/img/payment-clients/mit.png";
import banwire from "assets/img/payment-clients/banwire.jpg";
import valitor from "assets/img/payment-clients/valitor.png";
import Card from "components/card";
import DivLoader from "components/divloader/DivLoader";
import InputField from "components/fields/InputField";
import TextArea from "components/fields/TextArea";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { BsPlusCircle } from "react-icons/bs";
import { MdCheck, MdEdit, MdFileCopy, MdInfo } from "react-icons/md";
import { MultiSelect } from "react-multi-select-component";
import { getImage } from "utils/commonFunction";

export interface iCreateOrgForm {
  name: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  payment_method_ids: string[];
  payment_methods: string;
}

const CreateOrgModal = ({
  fetchOrganizations,
  allGateways,
  id,
  info,
  roleData,
}: {
  fetchOrganizations: () => void;
  allGateways?: any;
  id?: string;
  info?: boolean;
  roleData?: any;
}) => {
  const rootForm = {
    name: "",
    description: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    payment_method_ids: [] as string[],
    payment_methods: "st",
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [formValues, setFormValues] = React.useState<iCreateOrgForm>(rootForm);
  const [viewMode, setViewMode] = React.useState<boolean>(info);
  const [selected, setSelected] = React.useState([]);
  const [options, setGatewayOption] = React.useState([]);
  const [formValuesErr, setFormValuesErr] = React.useState<iCreateOrgForm>(rootForm);
  const [multiselectError, setMultiselectError] = React.useState<boolean>(true);
  const [methodName, setMethodName] = React.useState<boolean>(false);




  React.useEffect(() => {

    if (allGateways.length > 0) {
      //console.log('roleData25',roleData[0]?.organization?.value?.organization_show_method_name);
      const method2 = roleData[0]?.organization?.value?.organization_show_method_name;
      setMethodName(method2);
      const newOptions = allGateways.map((ele: any) => {
        //console.log('mmmmmmm2666',ele.name,methodName,method2);
        return {
          value: ele.id,
          label: method2 ? ele.name : ele.id,
        };
      });
      setGatewayOption(newOptions);
      //console.log('roleData2666',newOptions,methodName);
    }
  }, [allGateways]);

  const handleClose = () => {
    setFormValues(rootForm);
    setFormValuesErr(rootForm);
    onClose();
  };

  const handleMultiSelectChange = (sel?: string[]) => {

    setSelected(sel);
    setFormValues((prevData: any) => {
      return { ...prevData, payment_method_ids: sel?.map((ele: any) => ele.value) };
    });
    setFormValues((prevData: any) => {
      return { ...prevData, payment_methods: "any" };
    });
    if (sel?.length > 0) {
      setMultiselectError(true)
    } else {
      setMultiselectError(false)
    }

  };

  function handleValueChange(e: any) {
    setFormValues((preVal: any) => {
      return { ...preVal, [e.target.id]: e.target.value };
    });
    setFormValuesErr((preVal: any) => {
      return { ...preVal, [e.target.id]: "" };
    });
  }



  function validateData() {
    let verifier: iCreateOrgForm;
    console.log("formValues33", formValues, "tytytyt");
    Object.keys(formValues).forEach((key: any) => {
      if (!formValues[key as keyof iCreateOrgForm]) {
        //console.log("lables",[key]);
        if (key !== "payment_methods") {
          verifier = { ...verifier, [key]: "Please enter a value" };
        }
      }


    });

    if (formValues?.payment_method_ids?.length < 1) {
      verifier = { ...verifier, payment_methods: "Please select gateway" };

      setMultiselectError(false);

    } else {
      //console.log("ffff",verifier);
      setMultiselectError(true);

    }

    setFormValuesErr(verifier);

    const hasEmptyValues = Object.values(formValues).some(
      (value) => value === ""
    );
    //console.log("ffff",hasEmptyValues,"ttttt"); return;  
    if (hasEmptyValues) {
      return false;
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
    //console.log(formValues);

    let validate = validateData();
    //return;
    if (validate) {
      try {
        setIsLoading(true);
        if (id) {
          await updateOrganization(formValues);
        } else {
          await createOrganization(formValues);
        }
        fetchOrganizations();
        handleClose();
      } catch (err: any) {
        if (err?.response?.status === 422) {
          toast.error("Please provide valid values");
        } else {
          toast.error(
            err?.response?.data?.message ?? "Unable update organization data"
          );
        }
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function fetchOrganization(id: string) {

    await getOrganization({ id: id })
      .then((data: any) => {
        //console.log(data);
        setFormValues(data[0])
        //setGatewayOption(options)
        //console.log("recived data",data[0]);

        let methodName = roleData[0]?.organization?.value?.organization_show_method_name;

        const selectedOptions = data[0].payment_methods.map((id: string) => {

          const gateway = allGateways?.find((item: any) => item.id === id);
          //console.log("methodName",methodName);
          return {
            value: id,
            label: methodName ? (gateway?.name) : id,
          };
        });



        //console.log("payment_methods",data[0].payment_methods);
        //console.log("selected",selectedOptions);
        setSelected(selectedOptions);

        if (data[0].payment_methods?.length > 0) {
          setMultiselectError(true);
        } else {
          setMultiselectError(false);
        }


      })
      .catch((err: any) => {
        toast.error(err?.response?.data?.message ?? "Unable to fetch data");
      });
  }



  return (
    <>
      {info ? (
        roleData?.[0]?.organization?.value?.view_organization && (
          <div
            onClick={() => {
              if (id) {
                fetchOrganization(id);
              }
              onOpen();
            }}
          >
            {" "}
            <MdInfo
              className="h-5 w-5 cursor-pointer text-indigo-500"
              title="View"
            />
          </div>
        )
      ) : id ? (
        roleData?.[0]?.organization?.value?.edit_organization && (
          <div
            onClick={() => {
              if (id) {
                fetchOrganization(id);
              }
              onOpen();
            }}
          >
            <MdEdit
              className="h-5 w-5 cursor-pointer text-indigo-500"
              title="Edit"
            />
          </div>
        )
      ) : roleData?.[0]?.organization?.value?.add_organization ? (
        <div
          onClick={() => {
            if (id) {
              fetchOrganization(id);
            }
            onOpen();
          }}
        >
          {/* <Card extra="w-fit px-5 cursor-pointer"> */}
            <button 
            className="flex items-center justify-center gap-2 whitespace-nowrap p-2 text-navy-700 outline-none dark:text-gray-200 border rounded "
            // className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <BsPlusCircle className="h-5 w-5 text-brand-500" /><span className="text-brand-500"> Add new organization</span>
            </button>
          {/* </Card> */}
        </div>
      ) : null}
      <Modal isOpen={isOpen} onClose={() => { }} >
        <ModalOverlay className="bg-[#000] !opacity-30" />
        {/* <ModalContent className="!z-[1002] md:!m-auto sm:my-8 sm:w-full sm:max-w-lg md:top-[12vh]  bg-white !m-3 "> */}
        {/* <ModalContent className="z-[1002] !m-auto sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-center  max-h-[100vh] overflow-auto bg-white">
          <ModalBody className="overflow-visible">



            <Card extra=" max-w-[800px]  flex flex-col !z-[1004] "> */}


        <ModalContent className="z-[1002] !m-auto  sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-start  min-h-[85vh] max-h-[100vh] overflow-auto scrollbarhide ">
          <ModalBody className="py-2 ">

            <Card extra=" max-w-[800px]  flex flex-col !z-[1004]  ">
              <h1 className="p-5 px-[30px] text-2xl font-bold">
                {info
                  ? "View"
                  : id
                    ? "Update Organization "
                    : "Create Organization"}
              </h1>
              {info && (
                <MdEdit
                  className="absolute right-7 top-10 h-6 w-6 cursor-pointer text-indigo-500"
                  onClick={() => {
                    setViewMode(!viewMode);
                  }}
                />
              )}
              {/* <div className="max-h-[calc(100vh-300px)] overflow-auto overflow-x-hidden px-[30px] scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1 scrollbarhide"> */}
              {/* <div className="sm:max-h-[calc(100vh-300px)] max-h-[calc(100vh-200px)] overflow-auto overflow-x-hidden px-[30px] scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1 scrollbarhide"> */}
              <div className="px-[35px]">
                <InputField
                  variant="auth"
                  extra="mb-2 w-full text-sm font-bold text-gray-900 dark:text-white"
                  label="Name*"
                  placeholder="Google inc."
                  id="name"
                  type="text"
                  disabled={viewMode}
                  value={formValues?.name}
                  state={formValuesErr?.name ? "error" : ""}
                  onChange={handleValueChange}
                />

                <div className="flex w-full gap-5 text-gray-900">
                  <InputField
                    variant="auth"
                    extra="mb-2 w-full"
                    label="Website*"
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
                    label="Email*"
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
                  label="Phone*"
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
                  label="Address line*"
                  placeholder="45 - Test street"
                  id="address"
                  type="text"
                  disabled={viewMode}
                  value={formValues?.address}
                  state={formValuesErr?.address ? "error" : ""}
                  onChange={handleValueChange}
                />

                <div className="flex w-full gap-5">
                  <InputField
                    variant="auth"
                    extra="mb-2 w-full"
                    label="City*"
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
                    label="State*"
                    placeholder="California"
                    id="state"
                    type="text"
                    disabled={viewMode}
                    value={formValues?.state}
                    state={formValuesErr?.state ? "error" : ""}
                    onChange={handleValueChange}
                  />
                </div>

                <div className="flex w-full gap-5">
                  <InputField
                    variant="auth"
                    extra="mb-2 w-full"
                    label="Country*"
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
                    label="Postal Code*"
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
                  extra="mb-2 w-full "
                  label="Description*"
                  placeholder=""
                  id="description"
                  disabled={viewMode}
                  value={formValues?.description}
                  state={formValuesErr?.description ? "error" : ""}
                  onChange={handleValueChange}

                />
                <div className="mb-3 block items-center gap-3">


                  {/* <div className="mb-2 mt-2 text-sm text-navy-700 dark:text-white relative"> */}
                  <label className="ml-1.5 block pb-1 text-sm font-bold text-gray-900 dark:text-white">
                    Gateways
                  </label>
                  <div className="relative" >
                    <MultiSelect
                      options={options}
                      value={selected}
                      onChange={handleMultiSelectChange}
                      labelledBy={"Select"}
                      isCreatable={true}
                      disabled={viewMode}

                      className={(multiselectError === false) ? 'errormultiselect '
                        : viewMode === true ? 'disableClass'
                          : ''}
                    />

                  </div>

                  {/* </div> */}
                </div>
              </div>

              <div className="mt-5  flex gap-2 px-[30px] pb-[30px]">
                <button
                  onClick={handleClose}
                  className="linear rounded-xl bg-gray-100 px-5 py-2 text-base font-medium text-navy-700 outline-none transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                >
                  Close
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={viewMode}
                  className="linear rounded-xl bg-indigo-50 px-5 py-2 text-base font-medium text-indigo-500 outline-none transition duration-200 hover:bg-indigo-600/5 active:bg-indigo-700/5 dark:bg-indigo-400/10 dark:text-white dark:hover:bg-indigo-300/10 dark:active:bg-indigo-200/10"
                >
                  {isLoading ? (
                    <DivLoader className="h-6 w-6 border-indigo-500" />
                  ) : id ? (
                    "Update"
                  ) : (
                    "Create"
                  )}
                </button>
              </div>


            </Card>
          </ModalBody>
          {/* <ModalFooter className="bg-white">
        
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateOrgModal;

export const TruncateCopy = ({
  info,
  slice = 15,
  showCopy = true,
}: {
  info: any;
  slice?: number;
  showCopy?: boolean;
}) => {
  const [copy, setCopy] = React.useState<boolean>();
  return (
    <div className={"flex items-center gap-2"}>
      <p className="overflow-auto text-sm font-bold text-navy-700 dark:text-white">
        {info?.getValue()}
      </p>
      {showCopy && (
        <>
          {copy ? (
            <MdCheck className="cursor-pointer text-teal-500" />
          ) : (
            <MdFileCopy
              className="cursor-pointer text-teal-500"
              onClick={() => {
                navigator.clipboard.writeText(info?.getValue());
                setCopy(true);
                setTimeout(() => {
                  setCopy(false);
                }, 1500);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

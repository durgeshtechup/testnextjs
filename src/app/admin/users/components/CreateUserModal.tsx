import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { createUser, updateUser } from "api/users";
import Card from "components/card";
import DivLoader from "components/divloader/DivLoader";
import InputField from "components/fields/InputField";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { BsPlusCircle } from "react-icons/bs";
import { MdCheck, MdEdit, MdFileCopy, MdInfo } from "react-icons/md";
import { MultiSelect } from "react-multi-select-component";

const CreateUserModal = ({
  fetchUsers,
  id,
  is_info,
  data,
  organizations,
  roleDataDrop,
  roleData,
}: {
  fetchUsers: () => void;
  id?: string;
  is_info?: boolean;
  data?: any;
  organizations?: any;
  roleDataDrop?: any;
  roleData?: any;
}) => {
  const rootForm = {
    first_name: "",
    last_name: "",
    email: "",
    role_id: "",
    password: "",
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [formValues, setFormValues] = React.useState<any>(rootForm);
  const [viewMode, setViewMode] = React.useState<boolean>(is_info);
  const [formValuesErr, setFormValuesErr] = React.useState<any>(rootForm);
  const [selected, setSelected] = React.useState([]);
  const [passwordShow, setPasswordShow] = React.useState(false);

  /*console.log(fetchUsers)
  console.log(organizations)
  console.log(roleDataDrop)
  console.log(roleData)*/

  const options =
    organizations?.length > 0
      ? organizations?.map((data: any) => {
        return { label: data?.name, value: data?.id };
      })
      : [];

  const handleClose = () => {
    setFormValues(rootForm);
    setFormValuesErr(rootForm);
    onClose();
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
    let verifier: any;

    Object.keys(formValues).forEach((key: any) => {
      if (!(key === "password") && !formValues[key as keyof any]) {
        verifier = { ...verifier, [key]: "Please enter a value" };
      } else if (
        key === "password" &&
        formValues[key as keyof any]?.length < 8 &&
        (!id || formValues[key as keyof any])
      ) {
        verifier = {
          ...verifier,
          [key]: "Password must contain at least 8 characters",
        };
      }
    });

    setFormValuesErr(verifier);

    const hasEmptyValues = Object.entries(formValues).some(([key, value]) => {
      if (key === "password") {
        let val = (value as string)?.length;
        if (value && val < 8) {
          return val < 8;
        }
      } else {
        return value === "";
      }
    });
    if (hasEmptyValues) {
      return false;
    }
    return true;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    let validate = validateData();
    if (validate) {
      try {
        setIsLoading(true);
        var data: any = {
          first_name: formValues.first_name,
          last_name: formValues.last_name,
          email: formValues.email,
          role_id: formValues.role_id,
          organizations: selected?.map((data) => {
            return data?.value;
          }),
        };
        if (formValues.password) {
          data = { ...data, password: formValues.password };
        }
        if (id) {
          await updateUser(data, id);
        } else {
          await createUser(data);
        }
        fetchUsers();
        handleClose();
      } catch (err: any) {
        if (err?.response?.status === 422) {
          toast.error("Please provide valid values");
        } else {
          toast.error(err?.response?.data?.message ?? "Unable save user data");
        }
      } finally {
        setIsLoading(false);
      }
    }
  }

  const initForm = () => {
    if (data) {
      setFormValues(() => {
        return {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          role_id: data.role_id,
          password: data.password,
        };
      });
      setSelected(
        organizations
          ?.filter((item: any) => data?.organizations?.includes(item?.id))
          ?.map((data: any) => {
            return { label: data?.name, value: data?.id };
          })
      );
    }
  };

  return (
    <>
      {is_info ? (
        roleData?.[0]?.user?.value?.view_user && (
          <div
            onClick={() => {
              if (data) {
                initForm();
              }
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
        roleData?.[0]?.user?.value?.edit_user && (
          <div
            onClick={() => {
              if (data) {
                initForm();
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
      ) : roleData?.[0]?.user?.value?.add_user ? (
        <div
          onClick={() => {
            if (data) {
              initForm();
            }
            onOpen();
          }}
        >
          {/* <Card extra="w-fit px-5 cursor-pointer"> */}
            <button 
            // className="flex items-center justify-center gap-2 whitespace-nowrap p-5 text-navy-700 outline-none dark:text-gray-200"
            

            className="flex items-center justify-center gap-2 whitespace-nowrap p-2 text-navy-700 outline-none dark:text-gray-200 border rounded "

            >
              
              <BsPlusCircle className="h-5 w-5 text-brand-500" /><span className="text-brand-500"> Add new user</span>
            </button>
          {/* </Card> */}
        </div>
      ) : null}
      <Modal isOpen={isOpen} onClose={() => { }}>
        <ModalOverlay className="bg-[#000] !opacity-30" />
        {/* <ModalContent className="!z-[1002] !m-auto sm:my-8 sm:w-full sm:max-w-lg md:top-[12vh]"> */}
        {/* <ModalContent className="z-[1002] !m-auto !p-3 sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-center min-h-[100vh]">
          <ModalBody>

            <Card extra=" max-w-[800px]  flex flex-col !z-[1004]"> */}
        <ModalContent className="z-[1002] !m-auto   sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-start  min-h-[85vh] max-h-[100vh] overflow-auto scrollbarhide ">
          <ModalBody className="py-2">

            <Card extra=" max-w-[800px]  flex flex-col !z-[1004] ">
              <h1 className="p-5 px-[30px] text-2xl font-bold">
                {is_info ? "View" : id ? "Update User Info " : "Create User"}
              </h1>
              {is_info && (
                <MdEdit
                  className="absolute right-7 top-10 h-6 w-6 cursor-pointer text-indigo-500"
                  onClick={() => {
                    setViewMode(!viewMode);
                  }}
                />
              )}
              {/* <div className="max-h-[calc(100vh-300px)] overflow-auto overflow-x-hidden px-[30px] scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1"> */}
              {/* <div className="sm:max-h-[calc(100vh-300px)] max-h-[calc(100vh-200px)] overflow-auto overflow-x-hidden px-[30px] scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1"> */}
              <div className="px-[35px]">

                <InputField
                  variant="auth"
                  extra="mt-3 w-full"
                  label="First Name*"
                  placeholder="Google inc."
                  id="first_name"
                  type="text"
                  disabled={viewMode}
                  value={formValues?.first_name}
                  state={formValuesErr?.first_name ? "error" : ""}
                  onChange={handleValueChange}
                />

                <InputField
                  variant="auth"
                  extra="mt-3 w-full"
                  label="Last Name*"
                  placeholder="Google inc."
                  id="last_name"
                  type="text"
                  disabled={viewMode}
                  value={formValues?.last_name}
                  state={formValuesErr?.last_name ? "error" : ""}
                  onChange={handleValueChange}
                />

                <div className="my-3 w-full ">
                  <div className="flex gap-8">
                    <div className="flex gap-2">
                      <label
                        className={`ml-1.5 mr-3 text-sm font-bold text-gray-900 dark:text-white`}
                      >
                        Role Name
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <select
                      id="role_id"
                      value={formValues?.role_id}
                      disabled={viewMode}
                      onChange={handleValueChange}
                      className="mt-1 flex h-10 w-full items-center justify-center rounded-xl border  bg-white/0 p-2 text-sm text-gray-700 outline-none dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                    >
                      <option value="">Select Role</option>
                      {roleDataDrop?.map((data: any,index:number) => {
                        return (
                          <option key={index} value={data?.id}>{data?.role_name}</option>
                        );
                      })}
                    </select>
                  </div>
                  {formValuesErr?.role_id && (
                    <p className="text-sm text-orange-500">
                      Role must be select
                    </p>
                  )}
                </div>

                {/* <InputField
                  variant="auth"
                  extra="mt-3 w-full"
                  label="Role*"
                  placeholder="ADMIN"
                  id="role_id"
                  type="text"
                  value={formValues?.role_id}
                  state={formValuesErr?.role_id ? "error" : ""}
                  onChange={handleValueChange}
                /> */}

                <div className="mb-2 mt-2 text-sm text-navy-700 dark:text-white">
                  <label className="ml-1.5 block pb-1 text-sm font-bold text-gray-900 dark:text-white">
                    Organizations
                  </label>
                  <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy={"Select"}
                    isCreatable={true}
                    disabled={viewMode}
                  />
                </div>

                <InputField
                  variant="auth"
                  extra="mt-3 w-full"
                  label="Email*"
                  placeholder="user@lightningchecks.com"
                  id="email"
                  type="text"
                  disabled={viewMode}
                  value={formValues?.email}
                  state={formValuesErr?.email ? "error" : ""}
                  onChange={handleValueChange}
                />

                <InputField
                  variant="auth"
                  extra="mt-3 w-full"
                  label="Password*"
                  placeholder="*****"
                  id="password"
                  type={passwordShow ? "text" : "password"}
                  disabled={viewMode}
                  value={formValues?.password}
                  state={formValuesErr?.password ? "error" : ""}
                  errMessage={formValuesErr?.password}
                  onChange={handleValueChange}
                  passwordShow={passwordShow}
                  setPasswordShow={setPasswordShow}
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
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateUserModal;

export const TruncateCopy = ({
  is_info,
  slice = 15,
  showCopy = true,
}: {
  is_info: any;
  slice?: number;
  showCopy?: boolean;
}) => {
  const [copy, setCopy] = React.useState<boolean>();
  return (
    <div className={"flex items-center gap-2"}>
      <p className="overflow-auto text-sm font-bold text-navy-700 dark:text-white">
        {is_info?.getValue()}
      </p>
      {showCopy && (
        <>
          {copy ? (
            <MdCheck className="cursor-pointer text-teal-500" />
          ) : (
            <MdFileCopy
              className="cursor-pointer text-teal-500"
              onClick={() => {
                navigator.clipboard.writeText(is_info?.getValue());
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

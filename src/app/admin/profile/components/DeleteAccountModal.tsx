import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { deleteProfile } from "api/users";
import Card from "components/card";
import DivLoader from "components/divloader/DivLoader";
import InputField from "components/fields/InputField";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { clearAllCookie } from "utils/auth";


const DeleteAccountModal = () => {
  const rootForm = {
    password: "",
  };
  // const navigate = useNavigate();
  const navigate = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [formValues, setFormValues] = React.useState<any>(rootForm);
  const [formValuesErr, setFormValuesErr] = React.useState<any>(rootForm);

  const logout = () => {
    clearAllCookie();
    navigate.replace("/auth/sign-in");
  }

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
      if (key !== "password" && !formValues[key as keyof any]) {
        verifier = { ...verifier, [key]: "Please enter a value" };
      } else {
        if (key === "password" && formValues[key as keyof any] && formValues[key as keyof any].length < 8) {
          verifier = { ...verifier, [key]: "Password must contain at least 8 characters" };
        }
      }
    });

    setFormValuesErr(verifier);

    const hasEmptyValues = Object.entries(formValues).some(([key, value]) => {
      if (key === "password") {
        let val = (value as string).length
        if (value && val < 8) {
          return val < 8
        }
      }
      else {
        return value === ''
      }
    });
    if (hasEmptyValues) {
      return false
    }
    return true;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    let validate = validateData();
    if (validate) {
      try {
        setIsLoading(true);
        await deleteProfile(formValues);
        handleClose()
        logout()
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

  return (
    <>
      <button className="flex gap-1.5 items-center text-sm font-medium text-white dark:text-white bg-orange-600 w-fit px-3 py-1.5 rounded-lg mt-3" onClick={onOpen}>
        <MdDelete className="h-4 w-4 cursor-pointer" />
        Delete Account
      </button>
      <Modal isOpen={isOpen} onClose={() => { }}>
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[600px] !max-w-[85%] md:top-[12vh]">
          <ModalBody>
            <Card extra="max-w-[600px] flex flex-col !z-[1004]">
              <h1 className="p-5 px-[30px] text-2xl font-bold">
                Delete Account
              </h1>
              <div className="px-[35px]">
                <p className="text-sm text-gray-600">Are you sure you want to delete your account?
                  This action is irreversible and will result in the permanent deletion of all your data.
                </p>
                <p className="text-sm text-gray-600 my-2">Please consider the consequences before proceeding.</p>
              </div>
              <div className="px-[30px] max-h-[calc(100vh-300px)] overflow-auto overflow-x-hidden scrollbar scrollbar-w-1 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 scrollbar-track-gray-100">

                <InputField
                  variant="auth"
                  extra="mt-3 w-full"
                  label="Password*"
                  placeholder="********"
                  id="password"
                  type="password"
                  value={formValues?.password}
                  state={formValuesErr?.password ? "error" : ""}
                  errMessage={formValuesErr?.password}
                  onChange={handleValueChange}
                />
              </div>

              <div className="mt-5 flex gap-2 px-[30px] pb-[30px]">
                <button
                  onClick={handleClose}
                  className="outline-none linear rounded-xl bg-gray-100 px-5 py-2 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                >
                  Close
                </button>
                <button
                  onClick={handleSubmit}
                  className="outline-none linear rounded-xl bg-red-50 px-5 py-2 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                >
                  {isLoading ? (
                    <DivLoader className="h-6 w-6 border-red-500" />
                  ) : (
                    "Delete"
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
export default DeleteAccountModal;

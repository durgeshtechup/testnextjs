import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { updatePassword } from "api/users";
import Card from "components/card";
import DivLoader from "components/divloader/DivLoader";
import InputField from "components/fields/InputField";
import React from "react";
import { toast } from "react-hot-toast";

const ChangePasswordModal = () => {
  const rootForm = {
    old_password: "",
    new_password: "",
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [formValues, setFormValues] = React.useState<any>(rootForm);
  const [formValuesErr, setFormValuesErr] = React.useState<any>(rootForm);

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
    if (formValues.old_password.length < 8) {
      setFormValuesErr((preval: any) => { return { ...preval, old_password: "Password must contain at least 8 characters" } });
      return false;
    }
    if (formValues.new_password.length < 8) {
      setFormValuesErr((preval: any) => { return { ...preval, new_password: "Password must contain at least 8 characters" } });
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
        await updatePassword(formValues);
        handleClose()
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
      <button onClick={() => { onOpen() }} className="text-indigo-500 w-fit px-5 py-2 bg-indigo-50 rounded-xl outline-none border-2 border-indigo-200">
        Change Password
      </button>
      <Modal isOpen={isOpen} onClose={() => { }}>
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[600px] !max-w-[85%] md:top-[12vh]">
          <ModalBody>
            <Card extra="max-w-[600px] flex flex-col !z-[1004]">
              <h1 className="p-5 px-[30px] text-2xl font-bold">
                Profile Information
              </h1>
              <div className="px-[30px] max-h-[calc(100vh-300px)] overflow-auto overflow-x-hidden scrollbar scrollbar-w-1 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <InputField
                  variant="auth"
                  extra="mt-3 w-full"
                  label="Old Password*"
                  placeholder="********"
                  id="old_password"
                  type="password"
                  value={formValues?.old_password}
                  state={formValuesErr?.old_password ? "error" : ""}
                  errMessage={formValuesErr?.old_password}
                  onChange={handleValueChange}
                />
                <InputField
                  variant="auth"
                  extra="mt-3 w-full"
                  label="New Password*"
                  placeholder="********"
                  id="new_password"
                  type="password"
                  value={formValues?.new_password}
                  state={formValuesErr?.new_password ? "error" : ""}
                  errMessage={formValuesErr?.new_password}
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
                  className="outline-none linear rounded-xl bg-indigo-50 px-5 py-2 text-base font-medium text-indigo-500 transition duration-200 hover:bg-indigo-600/5 active:bg-indigo-700/5 dark:bg-indigo-400/10 dark:text-white dark:hover:bg-indigo-300/10 dark:active:bg-indigo-200/10"
                >
                  {isLoading ? (
                    <DivLoader className="h-6 w-6 border-indigo-500" />
                  ) : (
                    "Update Password"
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
export default ChangePasswordModal;

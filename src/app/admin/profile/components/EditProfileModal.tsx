import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { updateProfile } from "api/users";
import Card from "components/card";
import DivLoader from "components/divloader/DivLoader";
import InputField from "components/fields/InputField";
import React from "react";
import { toast } from "react-hot-toast";
import { MdEdit } from "react-icons/md";

const EditProfileModal = ({ data, fetchProfile }: { data: any, fetchProfile?: () => void }) => {
  const rootForm = {
    first_name: "",
    last_name: "",
    email: "",
    role: "ADMIN",
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
    let verifier: any;
    Object.keys(formValues).forEach((key: any) => {
      if (!formValues[key as keyof any]) {
        verifier = { ...verifier, [key]: "Please enter a value" };
      }
    });
    setFormValuesErr(verifier);

    const hasEmptyValues = Object.values(formValues).some(value => value === '');
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
        await updateProfile(formValues);
        fetchProfile()
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

  const initForm = () => {
    if (data) {
      setFormValues(() => {
        return {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          role: data.role,
          password: data.password,
        }
      })
    }
  }

  return (
    <>
      <button onClick={() => {
        if (data) { initForm() }
        onOpen()
      }}
        className="text-indigo-500 w-fit px-5 py-2 bg-indigo-50 rounded-xl outline-none border-2 border-indigo-200"
      >
        Change Details
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
                  label="First Name*"
                  placeholder="Google inc."
                  id="first_name"
                  type="text"
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
                  value={formValues?.last_name}
                  state={formValuesErr?.last_name ? "error" : ""}
                  onChange={handleValueChange}
                />

                <InputField
                  variant="auth"
                  extra="mt-3 w-full"
                  label="Email*"
                  placeholder="user@lightningchecks.com"
                  id="email"
                  type="text"
                  value={formValues?.email}
                  state={formValuesErr?.email ? "error" : ""}
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
                    "Save Details"
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
export default EditProfileModal;

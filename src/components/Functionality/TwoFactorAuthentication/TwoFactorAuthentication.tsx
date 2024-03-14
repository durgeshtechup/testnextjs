import { useDisclosure } from '@chakra-ui/hooks';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { get2FTAuth, get2FTAuthVerify } from 'api/users';
import Card from 'components/card';
import DivLoader from 'components/divloader/DivLoader';
import InputField from 'components/fields/InputField';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { MdCheck, MdFileCopy } from 'react-icons/md';
import { setToken } from 'utils/auth';

function TwoFactorAuthentication({
  status,
  data,
  profileData,
  fetch2fa,
  fetchProfile,
  model2FA,
  setModel2FA,
}:{
  status?: any;
  data?: any;
  fetch2fa?: () => void;
  profileData?: any;
  fetchProfile?: () => void;
  model2FA?: any;
  setModel2FA?: any;
}) {

  const verifyData = data;
  const rootForm = {
    otp: "",
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [copy, setCopy] = React.useState<boolean>(false);
  const [copyKey, setCopyKey] = React.useState<boolean>(false);
  const [formValues, setFormValues] = React.useState<any>(rootForm);
  const [formValuesErr, setFormValuesErr] = React.useState<any>(rootForm);

  const router =useRouter()

  const handleClose = () => {
    setFormValues(rootForm);
    setFormValuesErr(rootForm);
    model2FA && setModel2FA("");
    onClose();
  };

  useEffect(() => {
    if (status) {
      onOpen();
    }
  }, [status, model2FA]);

  function handleValueChange(e: any) {
    setFormValues((preVal: any) => {
      if (e.target.id === "otp") {
        return { ...preVal, [e.target.id]: e.target.value.slice(0, 6) };
      } else {
        return { ...preVal, [e.target.id]: e.target.value };
      }
    });
    setFormValuesErr((preVal: any) => {
      return { ...preVal, [e.target.id]: "" };
    });
  }

  function validateData() {
    if (formValues.otp.length < 6) {
      setFormValuesErr((preval: any) => {
        return {
          ...preval,
          otp: "OTP must be 6 characters",
        };
      });
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
        await get2FTAuthVerify({
          otp: formValues?.otp,
          user_id: verifyData?.user_id ? verifyData?.user_id : profileData?.id,
          secret_key: verifyData?.secret_key,
          recover_key: model2FA ? model2FA : verifyData?.recover_key,
          inside_flag: model2FA ? true : false,
        })
          .then((data) => {

            if (model2FA) {
              setToken(data.auth_token);
            }
            get2FTAuth({
              enable_2FA: true,
              secret_key: verifyData?.secret_key,
              recover_key: model2FA ? model2FA : verifyData?.recover_key,
              user_id: verifyData?.user_id
                ? verifyData?.user_id
                : profileData?.id,
            })
              .then((data) => {

                if (model2FA) {
                  // navigate("/admin/dashboard");
                  router.push("/admin/dashboard")
                }
                toast.success("Two-Factor Authentication Activated");
                if (location?.pathname !== "/auth/sign-in") {
                  fetchProfile();
                }
              })
              .catch((err) => {
                toast.error(
                  err?.response?.data?.message ??
                    "Something went wrong while fetching proflie"
                );
              })
              .finally(() => {
                // setIsLoading(false);
              });
            // fetchProfile();
            // toast.success("Tow-Factor Authentication OTP Verified");
          })
          .catch((err) => {
            toast.error(
              err?.response?.data?.message ??
                "Something went wrong while fetching proflie"
            );
          })
          .finally(() => {
            // setIsLoading(false);
          });
        handleClose();
      } catch (err: any) {
        if (err?.response?.status === 422) {
          toast.error("Please provide valid values");
        } /* else {
          toast.error(err?.response?.data?.message ?? "Unable save user data");
        } */
      } finally {
        setIsLoading(false);

      }
    }
  }
  const bindInput = (value: any) => {
    const regex = new RegExp("^[^0-9]*$");
    const key = String.fromCharCode(
      !value.charCode ? value.which : value.charCode
    );
    if (regex.test(key)) {
      value.preventDefault();
      return false;
    }
  };
  const handelEnter = (event: any) => {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 13) {
      handleSubmit(event);
    }
  };



  return (
    <div>
       {status ? null : !profileData?.auth_2fa ? (
        <button
          onClick={() => {
            onOpen();
          }}
          className="w-fit rounded-xl border-2 border-indigo-200 bg-indigo-50 px-5 py-2 text-indigo-500 outline-none"
        >
          Activate 2FA {/* Disable */}
        </button>
      ) : (
        <button
          onClick={() => {
            fetch2fa();
          }}
          className="w-fit rounded-xl border-2 border-indigo-200 bg-indigo-50 px-5 py-2 text-indigo-500 outline-none"
        >
          Deactivate 2FA
        </button>
      )}
      <Modal isOpen={isOpen} onClose={()=>{}} >
        <ModalOverlay className="bg-[#000] !opacity-30"  />
        <ModalContent className="top-[12vh] !z-[1002] !m-auto !w-max min-w-[400px] !max-w-[85%] lg:min-w-[400px]">
<ModalBody>
<Card extra="max-w-[600px] flex flex-col !z-[1004] max-h-[calc(100vh-100px)] 2xl:h-full overflow-x-auto">
<h1 className="border-b-2 p-5 px-[30px] text-2xl font-bold">
                Two-Factor Authentication (2FA)
              </h1>

              <div className=" max-h-[calc(100vh-300px)] overflow-auto overflow-x-hidden scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1">
            
            <h2 className="mx-[30px] border-b-2 pt-5 text-lg font-medium font-semibold text-indigo-500">
              Configuring Google Authenticator or Authy
            </h2>
            <p className="px-[30px] pt-3 text-[15px] text-gray-900 dark:text-white">
              1. Install Google Authenticator (IOS- Android) or Authy (IOS-
              Android).
            </p>
            <p className="px-[30px] text-[15px] text-gray-900 dark:text-white">
              2. In the authenticator app, select "+" icon.
            </p>
            <p className="px-[30px] text-[15px] text-gray-900 dark:text-white">
              3. Select "Scan a barcode (or QR code)" and use the phone's
              camera to scan this barcode.
            </p>
            <h2 className="mx-[30px] border-b-2 pt-5 text-lg font-medium font-semibold text-indigo-500">
              Scan QR Code
            </h2>
            <div className="mt-3 flex justify-center">
              <img
                src={`data:image/png;base64 , ${data?.base64_image}`}
                alt="QRCode"
                className="max-h-[200px] max-w-[200px] lg:max-h-[350] lg:max-w-[350]"
              />
            </div>
            <h2 className="mx-[30px] border-b-2 pt-5 text-lg font-medium font-semibold text-indigo-500">
              Or Enter Code Into Your App
            </h2>
            <div className="flex pl-[30px] pt-3">
              <p className="pr-[10px] text-[15px] text-gray-900 dark:text-white">
                SecretKey : {data?.secret_key} 
              </p>
              {copyKey ? (
                <MdCheck className="cursor-pointer text-teal-500 mt-1" />
              ) : (
                <MdFileCopy
                  className="cursor-pointer text-teal-500 mt-1"
                  onClick={() => {
                    navigator.clipboard.writeText(data?.secret_key);
                    setCopyKey(true);
                    setTimeout(() => {
                      setCopyKey(false);
                    }, 1500);
                  }}
                />
              )}
            </div>
            {!model2FA && (
              <div className="flex pl-[30px] pt-3">
                <p className="pr-[10px] text-[15px] text-gray-900 dark:text-white">
                  RecoverKey : {data?.recover_key}
                </p>
                {copy ? (
                  <MdCheck className="cursor-pointer text-teal-500 mt-1" />
                ) : (
                  <MdFileCopy
                    className="cursor-pointer text-teal-500 mt-1"
                    onClick={() => {
                      navigator.clipboard.writeText(data?.recover_key);
                      setCopy(true);
                      setTimeout(() => {
                        setCopy(false);
                      }, 1500);
                    }}
                  />
                )}
              </div>
            )}
            <h2 className="mx-[30px] border-b-2 pt-5 text-lg font-medium font-semibold text-indigo-500">
              Verify Code
            </h2>
            <p className="px-[30px] pt-3 text-[15px] text-gray-900 dark:text-white">
              For changing the setting, please verify the authentication code:
            </p>
            <div className="max-h-[calc(100vh-300px)] px-[30px] scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1">
              <InputField
                variant="auth"
                extra="mt-3 w-full"
                label=""
                placeholder="Authentication Code"
                id="otp"
                onKeyPress={bindInput}
                onKeyDown={(e: any) => handelEnter(e)}
                type="number"
                value={formValues?.otp}
                state={formValuesErr?.otp ? "error" : ""}
                errMessage={formValuesErr?.otp}
                onChange={handleValueChange}
              />
            </div>
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
                className="linear rounded-xl bg-indigo-50 px-5 py-2 text-base font-medium text-indigo-500 outline-none transition duration-200 hover:bg-indigo-600/5 active:bg-indigo-700/5 dark:bg-indigo-400/10 dark:text-white dark:hover:bg-indigo-300/10 dark:active:bg-indigo-200/10"
              >
                {isLoading ? (
                  <DivLoader className="h-6 w-6 border-indigo-500" />
                ) : (
                  "Verify & Activate"
                )}
              </button>
            </div>

  </Card>
</ModalBody>

        </ModalContent>

      </Modal>
    </div>
  )
}

export default TwoFactorAuthentication
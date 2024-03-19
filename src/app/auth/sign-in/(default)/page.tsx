'use client';
import InputField from 'components/fields/InputField';
import Default from 'components/auth/variants/DefaultAuthLayout';
import { FcGoogle } from 'react-icons/fc';
import Checkbox from 'components/checkbox';
import { useState } from 'react';
import DivLoader from 'components/divloader/DivLoader';
import toast from 'react-hot-toast';
import { get2FTAuthVerify, userLogin } from 'api/users';
import { useRouter } from 'next/navigation';
import { getToken, setToken } from 'utils/auth';
import Recover from 'components/Functionality/Profile/Recover';
import TwoFactorAuthentication from 'components/Functionality/TwoFactorAuthentication/TwoFactorAuthentication';

function SignInDefault() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [model2FA, setModel2FA] = useState<any>("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [data, setData] = useState<any>();
  const [loginData, getLoginData] = useState<any>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [errAuthCode, setErrAuthCode] = useState("");
  const [status, setStatus] = useState("Login");
  const [passwordShow, setPasswordShow] = useState(false);

  const router = useRouter()
  function handleEmailChange(e: any) {
    setEmail(e.target.value);
    setErrEmail("");
  }
  const userToken=getToken()

  if(userToken){
router.replace("/admin/dashboard")
  }

  function handlePasswordChange(e: any) {
    setPassword(e.target.value);
    setErrPassword("");
  }
  function validateData() {
    if (!email) {
      setErrEmail("Please enter your email");
      return false;
    }
    if (!password) {
      setErrPassword("Please enter your password");
      return false;
    }
    if (password.length < 8) {
      setErrPassword("Password must contain at least 8 characters");
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
        const loginData = { email: email, password: password };
        await userLogin(loginData)
          .then((data) => {
            if (data?.auth_2fa) {
              getLoginData(data);
              setStatus("OTP");
            } else {
              router.replace('/admin/dashboard')
              setToken(data.auth_token);
            }
          })
          .catch((err) => {
            toast.error(
              err?.response?.data?.message ?? "Please provide valid values"
            );
          })
          .finally(() => {
            setIsLoading(false);

          });
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

  function validateDataOtp() {
    if (!authCode) {
      setErrAuthCode("Please enter your OTP");
      return false;
    }
    if (authCode.length < 6) {
      setErrAuthCode("OTP must be 6 characters");
      return false;
    }
    return true;
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
      handleVerify(event);
    }
  };

  function handleAuthCodeChange(e: any) {
    setAuthCode(e.target.value.slice(0, 6));
    setErrAuthCode("");
  }

  const handleVerify = async (e: any) => {
    e.preventDefault();

    let validate = validateDataOtp();
    if (validate) {
      try {
        setIsLoading(true);
        await get2FTAuthVerify({
          otp: authCode?.toString(),
          user_id: loginData?.user_id,
          secret_key: loginData?.secret_key,
          inside_flag: true,
        })
          .then((data) => {
            setToken(data?.auth_token);

            toast.success("Login successfully");
            // navigate("/admin/dashboard");
            router.push('/admin/dashboard')

          })
          .catch((err) => {
console.log(err)
            toast.error(
              err?.response?.data?.message || "Please provide valid values"
            );
          })
          .finally(() => {
            setIsLoading(false);

          });
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
  };

  return (
    <Default
      maincard={
        status==='Login'
        ?
          <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
          {/* Sign in section */}
          <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h3 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
              Sign In
            </h3>
            <p className="mb-9 ml-1 text-base text-gray-600">
              Enter your email and password to sign in!
            </p>
            {/* Email */}
            <form action="#" method="POST" onSubmit={handleSubmit} >

            <InputField
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
             {errEmail && (
              <p className="mb-3 ml-1.5 text-sm text-orange-500">{errEmail}</p>
            )}

            {/* Password */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Password*"
              placeholder="Min. 8 characters"
              id="password"
              type={passwordShow ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              passwordShow={passwordShow}
              setPasswordShow={setPasswordShow}
            />
              {errPassword && (
              <p className="mb-3 ml-1.5 text-sm text-orange-500">
                {errPassword}
              </p>
            )}
            {/* Checkbox */}
            <div className="mb-4 flex items-center justify-between px-2">
              <div className="mt-2 flex items-center">
                <Checkbox />
                <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                  Keep me logged In
                </p>
              </div>
              {/* <a
                className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                href=" "
              >
                Forgot Password?
              </a> */}
            </div>
            <button 
            className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            disabled={isLoading}
            >
            {isLoading ? (
                <DivLoader className="h-6 w-6 border-white" />
              ) : (
                "Sign in"
              )}
            </button>
            {/* <div className="mt-4">
              <span className="text-sm font-medium text-navy-700 dark:text-gray-500">
                Not registered yet?
              </span>
              <a
                href="/auth/sign-up/default"
                className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              >
                Create an account
              </a>
            </div> */}
            </form>

          </div>
        </div>
        :
        <div className="mt-[20vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[480px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Two-Factor Authentication
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Open the two-step verification app on your mobile device to get your
          verification code.
        </p>
        <form action="#" method="POST" onSubmit={handleVerify}>
          {/* auth_code */}
          <InputField
            variant="auth"
            extra="mb-1"
            label="Authenticate code*"
            placeholder="Authenticate code"
            id="auth_code"
            type="text"
            onKeyPress={bindInput}
            onKeyDown={(e: any) => handelEnter(e)}
            value={authCode}
            onChange={handleAuthCodeChange}
          />
          {errAuthCode && (
            <p className="mb-3 ml-1.5 text-sm text-orange-500">
              {errAuthCode}
            </p>
          )}

          <button
            type="submit"
            className="linear mt-5 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            {isLoading ? (
              <DivLoader className="h-6 w-6 border-white" />
            ) : (
              "Authenticate"
            )}
          </button>
        </form>

        <div className="mt-3 flex justify-between">
        
          <Recover status={status} data={data} loginData={loginData} setModel2FA={setModel2FA} setData={setData}/>
          {model2FA && (
            <TwoFactorAuthentication
              status={status}
              data={data}
              model2FA={model2FA}
              setModel2FA={setModel2FA}
            />
          )}
          <p
            onClick={() => setStatus("Login")}
            className="ml-1 cursor-pointer text-[15px] font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Back to basic login
          </p>
        </div>
      </div>
      }
    />
  );
}

export default SignInDefault;

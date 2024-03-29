import React, { useContext, useEffect, useState } from 'react';
import Dropdown from 'components/dropdown';
import { FiAlignJustify } from 'react-icons/fi';
import NavLink from 'components/link/NavLink';
// import navbarimage from '/public/img/layout/Navbar.png';
// import { BsArrowBarUp } from 'react-icons/bs';
// import { FiSearch } from 'react-icons/fi';
// import Configurator from './Configurator';
// import { RiMoonFill, RiSunFill } from 'react-icons/ri';
// import Configurator from './Configurator';
import {
  IoMdNotificationsOutline,
  IoMdInformationCircleOutline,
} from 'react-icons/io';
import avatar from '/public/img/avatars/avatar4.png';
import Image from 'next/image';
import { clearAllCookie, setId } from 'utils/auth';
import { useRouter } from 'next/navigation';
import { getProfile } from 'api/users';
import { getSingleRole } from 'api/role';
import toast from 'react-hot-toast';
import { ClientContext } from 'clientProvider';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import Link from 'next/link';
import TripleToggleSwitch from 'app/admin/payout/components/TripleToggleSwitch';


const Navbar = (props: {
  onOpenSidenav: () => void;
  brandText: string;
  secondary?: boolean | string;
  [x: string]: any;
}) => {
  const router=useRouter()
  const [storeName,setStoreName]=useState<any>({})
  const {setSingleRoleData, setFilter, filter,}=useContext(ClientContext)

  useEffect(() => {
    getProfile()
      .then((res) => {
        setStoreName(res[0]);
        setId(res?.[0]?.role_id);
        getSingleRole(res?.[0]?.role_id)
          .then((data) => {
            setSingleRoleData(data ?? []);
          })
          .catch((err) => {
            toast.error(
              err?.response?.data?.message ??
              "Something went wrong while fetching role"
            );
          })
          .finally(() => {
            // setIsLoading(false);
          });
      })
      .then((err) => {
        console.log("err", err);
      });
  }, []);

  const { onOpenSidenav, brandText, mini, hovered } = props;
  const [darkmode, setDarkmode] = React.useState(
    document.body.classList.contains('dark'),
  );
  const logout = () => {
    clearAllCookie();
    router.push("/auth/sign-in");
  };
  const labels = {
    left: {
      title: "All",
      value: "left",
    },
    right: {
      title: "Live",
      value: "right",
    },
    center: {
      title: "Test",
      value: "center",
    },
  };

  const onChange = (value: any) => {
    if (value === "left") {
      setFilter({ ...filter, status: "all" });
    } else if (value === "right") {
      setFilter({ ...filter, status: "live" });
    } else if (value === "center") {
      setFilter({ ...filter, status: "test" });
    }
  };
  return (
    <nav
      className={`duration-175 linear shadow fixed right-3 top-3 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/30 transition-all ${
        mini === false
          ? 'w-[calc(100vw_-_6%)] md:w-[calc(100vw_-_8%)] lg:w-[calc(100vw_-_6%)] xl:w-[calc(100vw_-_350px)] 2xl:w-[calc(100vw_-_365px)]'
          : mini === true && hovered === true
          ? 'w-[calc(100vw_-_6%)]  md:w-[calc(100vw_-_8%)] lg:w-[calc(100vw_-_6%)] xl:w-[calc(100vw_-_350px)] 2xl:w-[calc(100vw_-_365px)]'
          : 'w-[calc(100vw_-_6%)] md:w-[calc(100vw_-_8%)] lg:w-[calc(100vw_-_6%)] xl:w-[calc(100vw_-_180px)] 2xl:w-[calc(100vw_-_195px)]'
      }  p-2 backdrop-blur-xl dark:bg-[#0b14374d] md:right-[30px] md:top-4 xl:top-[20px]`}
    >

      <div className="ml-[6px] md:flex md:justify-between">
     
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <NavLink
            href="#"
            className="font-bold capitalize text-indigo-600 hover:text-indigo-800 dark:hover:text-white"
          >
            {brandText}
          </NavLink>
        </p>

        {brandText === "Transactions" && (
            <div className="mb-1 flex ml-4">
              <label className="relative mb-3 inline-flex cursor-pointer items-center">
                <TripleToggleSwitch labels={labels} onChange={onChange} />
              </label>
            </div>
          )}
       
      </div>

    
     

      {/* <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2"> */}
      {/* <div className="relative mt-[3px] flex h-[61px]  flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none  md:flex-grow-0 md:gap-1  xl:gap-2"> */}
      <div className="relative flex place-content-start items-center justify-around gap-2 rounded-full bg-white px-2 py-2  dark:!bg-navy-800 dark:shadow-none md:w-fit md:flex-grow-0 md:gap-1 xl:w-fit xl:gap-3 border" style={{ margin: "0px 10px" }}>
     
        {/* <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
          />
        </div> */}
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden "
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        {/* start Notification */}
        {/* <Dropdown
          button={
            <p className="cursor-pointer">
              <IoMdNotificationsOutline className="h-4 w-4 text-gray-600 dark:text-white" />
            </p>
          }
          animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
          classNames={'py-2 top-4 -left-[230px] md:-left-[440px] w-max'}
        >
          <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]">
            <div className="flex items-center justify-between">
              <p className="text-base font-bold text-navy-700 dark:text-white">
                Notification
              </p>
              <p className="text-sm font-bold text-navy-700 dark:text-white">
                Mark all read
              </p>
            </div>

            <button className="flex w-full items-center">
              <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brand-400 to-brand-500 py-4 text-2xl text-white">
                <BsArrowBarUp />
              </div>
              <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
                  New Update: Horizon UI Dashboard PRO
                </p>
                <p className="font-base text-left text-xs text-gray-900 dark:text-white">
                  A new update for your downloaded item is available!
                </p>
              </div>
            </button>

            <button className="flex w-full items-center">
              <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brand-400 to-brand-500 py-4 text-2xl text-white">
                <BsArrowBarUp />
              </div>
              <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
                  New Update: Horizon UI Dashboard PRO
                </p>
                <p className="font-base text-left text-xs text-gray-900 dark:text-white">
                  A new update for your downloaded item is available!
                </p>
              </div>
            </button>
          </div>
        </Dropdown> */}
        {/* start Horizon PRO */}
        {/* <Dropdown
          button={
            <p className="cursor-pointer">
              <IoMdInformationCircleOutline className="h-4 w-4 text-gray-600 dark:text-white" />
            </p>
          }
          classNames={'py-2 top-6 -left-[250px] md:-left-[330px] w-max'}
          animation="origin-[75%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
        >
          <div className="flex w-[350px] flex-col gap-2 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
            <div
              style={{
                backgroundImage: `url(${navbarimage.src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
              className="mb-2 aspect-video w-full rounded-lg"
            />
            <a
              target="blank"
              href="https://horizon-ui.com/pro?ref=live-pro-tailwind-react"
              className="px-full linear flex cursor-pointer items-center justify-center rounded-xl bg-brand-500 py-[11px] font-bold text-white transition duration-200 hover:bg-brand-600 hover:text-white active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
            >
              Buy Horizon UI PRO
            </a>
            <a
              target="blank"
              href="https://horizon-ui.com/docs-tailwind/docs/react/installation?ref=live-pro-tailwind-react"
              className="px-full linear flex cursor-pointer items-center justify-center rounded-xl border py-[11px] font-bold text-navy-700 transition duration-200 hover:bg-gray-200 hover:text-navy-700 dark:!border-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:active:bg-white/10"
            >
              See Documentation
            </a>
            <a
              target="blank"
              href="https://horizon-ui.com/?ref=live-pro-tailwind-react"
              className="px-full linear hover:bg-black flex cursor-pointer items-center justify-center rounded-xl py-[11px] font-bold text-navy-700 transition duration-200 hover:text-navy-700 dark:text-white dark:hover:text-white"
            >
              Try Horizon Free
            </a>
          </div>
        </Dropdown> */}
        {/* <Configurator
          mini={props.mini}
          setMini={props.setMini}
          theme={props.theme}
          setTheme={props.setTheme}
          darkmode={darkmode}
          setDarkmode={setDarkmode}
        /> */}
        {/* <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove('dark');
              setDarkmode(false);
            } else {
              document.body.classList.add('dark');
              setDarkmode(true);
            }
          }}
        ></div> */}

<div
          className="cursor-pointer pl-1 text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-5 w-5 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-5 w-5 text-gray-600 dark:text-white" />
          )}
        </div>
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <Image
              width="2"
              height="20"
              className="h-10 w-10 rounded-full cursor-pointer"
              src={avatar}
              alt="Elon Musk"

            />
          }
          classNames={'py-2 top-8 -left-[180px] w-max'}
        >
          <div className="flex h-max w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat pb-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
            <div className="ml-4 mt-3">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                👋 Hey, {storeName?.first_name} {storeName?.last_name}
                  
                </p>{' '}
              </div>
            </div>
            <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

            <div className="ml-4 mt-3 flex flex-col">
              <Link
                href="/admin/profile"
                className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
              >
                Profile Settings
              </Link>
              {/* <a
                href=" "
                className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
              >
                Newsletter Settings
              </a> */}
              <button
              
                onClick={logout}
                className="mt-3 text-sm font-medium text-red-500 hover:text-red-500 w-fit"
              >
                Log Out
              </button>
            </div>
          </div>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;

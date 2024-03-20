"use client"
import { get2FAData, get2FTAuth, getProfile } from "api/users";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Banner from "./components/Banner";
import DeleteAccountModal from "./components/DeleteAccountModal";
import General from "./components/General";

const ProfileOverview = () => {
  const [profileData, setProfileData] = useState<any>();
  const [FAData, setFAData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>();
  //console.log("profileData", profileData);

  const fetchProfile = () => {
    setIsLoading(true);
    getProfile()
      .then((data) => {
        setProfileData(data[0]);
        if (!data[0]?.auth_2fa) {
          get2FAData()
            .then((data) => {
              setFAData(data);
            })
            .catch((err) => {
              toast.error(
                err?.response?.data?.message ??
                  "Something went wrong while fetching proflie"
              );
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
            "Something went wrong while fetching proflie"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetch2fa = () => {
    setIsLoading(true);
    get2FTAuth({ enable_2FA: false, user_id: profileData?.id })
      .then((data) => {
        fetchProfile();
        toast.success("Two-Factor Authentication Deactivated");
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
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-5 lg:!mb-0">
          <Banner profileData={profileData} />
        </div>
        <div className="col-span-5 lg:!mb-0">
          <General
            profileData={profileData}
            fetchProfile={fetchProfile}
            data2FA={FAData}
            fetch2fa={fetch2fa}
          />
        </div>
        <div className="col-span-2 lg:!mb-0">
          <div className="flex flex-col justify-center rounded-2xl border-2 border-red-300 bg-white bg-clip-border p-5 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-xl text-gray-900">Delete Account</p>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete your account? This action is
              irreversible and will result in the permanent deletion of all your
              data.
            </p>
            <p className="my-2 text-sm text-gray-600">
              Please consider the consequences before proceeding.
            </p>
            <DeleteAccountModal />
          </div>
        </div>

        {/* <div className="z-0 col-span-5 lg:!mb-0">
          <Upload />
        </div> */}
      </div>
      {/* all project & ... */}

      {/* <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <Project />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <General />
        </div>

        <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
          <Notification />
        </div>
      </div> */}
    </div>
  );
};

export default ProfileOverview;

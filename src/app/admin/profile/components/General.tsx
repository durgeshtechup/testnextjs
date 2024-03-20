import Card from "components/card";
import ChangePasswordModal from "./ChangePasswordModal";
import EditProfileModal from "./EditProfileModal";
import TwoFactorAuthentication from "./TwoFactorAuthentication";

const General = ({
  profileData,
  fetchProfile,
  data2FA,
  fetch2fa,
  fetchProfileDeactivate
}: {
  profileData: any;
  data2FA?: any;
  fetch2fa?: () => void;
  fetchProfile?: () => void;
  fetchProfileDeactivate?: () => void;
}) => {
  return (
    <Card extra={"w-full h-full p-5"}>
      {/* Header */}
      <div className="mb-4 mt-2 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          General Information
        </h4>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border p-3 px-5 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">First Name</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {profileData?.first_name}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border p-3 px-5 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Last Name</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {profileData?.last_name}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border p-3 px-5 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Email</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {profileData?.email}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border p-3 px-5 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Role</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {profileData?.role}
          </p>
        </div>
      </div>
      <div className="mt-4 flex w-fit items-start justify-center gap-2 rounded-2xl bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <EditProfileModal data={profileData} fetchProfile={fetchProfile} />
        <ChangePasswordModal />
        <TwoFactorAuthentication
          data={data2FA}
          profileData={profileData}
          fetch2fa={fetch2fa}
          fetchProfile={fetchProfile}
        />
      </div>
    </Card>
  );
};

export default General;

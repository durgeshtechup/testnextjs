import avatar from "assets/img/avatars/avatar11.png";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";

const Banner = ({ profileData }: { profileData: any }) => {
  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-indigo-500 dark:!border-navy-700">
          <p className="text-4xl text-white">{profileData?.first_name?.charAt(0)?.toUpperCase() + profileData?.last_name?.charAt(0)?.toUpperCase()}</p>
          {/* <img className="h-full w-full rounded-full" src={avatar} alt="" /> */}
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {profileData?.first_name} {profileData?.last_name}
        </h4>
        <p className="text-base font-normal text-gray-600">
          {profileData?.role}
        </p>
      </div>
    </Card>
  );
};

export default Banner;

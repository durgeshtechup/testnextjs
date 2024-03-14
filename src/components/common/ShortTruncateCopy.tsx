import React from 'react';
import { MdCheck, MdFileCopy } from "react-icons/md";
const ShortTruncateCopy = ({
  info,
  slice = 15,
  showCopy,
}: {
  info: any;
  slice?: number;
  showCopy?: boolean;
}) => {
  const [copy, setCopy] = React.useState<boolean>();
  return (
    <div className="flex gap-4">
      {/* <p className="text-sm font-medium lowercase first-letter:capitalize"> */}
      <p className=" lowercase first-letter:capitalize">
        {info?.length > 15 ? info?.substring(0, 15) + "..." : info}
      </p>
      {showCopy && (
        <>
          {copy ? (
            <MdCheck className="cursor-pointer text-teal-500" />
          ) : (
            <MdFileCopy
              className="cursor-pointer text-teal-500"
              onClick={() => {
                navigator.clipboard.writeText(info);
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

export default ShortTruncateCopy;
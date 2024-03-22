import React, { useState, useRef, useEffect } from "react";
import { FaClock, FaRegClock } from "react-icons/fa";
import {
  MdAdd,
  MdCancel,
  MdCheck,
  MdCheckCircle,
  MdError,
  MdExpand,
  MdFileCopy,
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowRight,
  MdOutlineCancel,
  MdOutlineReplayCircleFilled,
  MdRemove,
  MdTimer,
} from "react-icons/md";
import { RiRotateLockFill } from "react-icons/ri";

const StatusStyle = ({
  status,
  value,
}: {
  status: string;
  value: string;
}) => {
  return (
    <>

      {status === "COMPLETED" && (
        <>
          <MdCheckCircle className="mt-1 h-5 w-5 mr-1 text-teal-500" />
          <p className="pl-0 pr-1 py-1 uppercase first-letter:capitalize bg-green-100 dark:bg-green-50 rounded-lg text-center"><span className="text-center px-2 text-green-500">{value}</span></p>
        </>
      )}

      {status === "ACTIVE" && (
        <>
          <MdOutlineReplayCircleFilled className="mt-1 mr-1 h-5 w-5 text-blue-500" />
          <p className="pl-0 pr-1 py-1 uppercase first-letter:capitalize bg-blue-100 dark:bg-blue-50 rounded-lg text-center"><span className="text-center px-2 text-blue-500">{value}</span></p>
        </>
      )}

      {status === "CANCELLED" && (
        <>
          <MdCancel className="mt-1 h-5 w-5 mr-1 text-red-500" />
          <p className="pl-0 pr-1 py-1 uppercase first-letter:capitalize bg-red-100 dark:bg-red-50 rounded-lg"><span className="text-center px-2 text-red-500">{value}</span></p>
        </>
      )}

      {status === "PENDING" && (
        <>
          <FaClock className="mt-1 h-5 w-5 mr-1 text-orange-500" />
          <p className="pl-0 pr-1 py-1 uppercase first-letter:capitalize bg-orange-100 dark:bg-orange-50 rounded-lg"><span className="text-center px-2 text-orange-500">{value}</span></p>
        </>
      )}

    </>
  );
};

export default StatusStyle;
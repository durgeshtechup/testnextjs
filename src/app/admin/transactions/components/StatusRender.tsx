import React, { useState, useRef, useEffect } from "react";
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

const StatusRender = ({
  status,
  value,
}: {
  status: string;
  value: string;
}) => {
  return (
    <>
      {status.toLowerCase() == "COMPLETED".toLowerCase() && (

        <>
          <MdCancel className="h-5 w-5 text-red-500" />
          <p className="pl-0 pr-1 py-1 uppercase first-letter:capitalize bg-red-100 dark:bg-red-50 rounded-lg"><span className="text-center px-2 text-red-500 uppercase">{value}</span></p>
        </>

      )}
      {status === "false" && (
        <>
          <MdError className="h-5 w-5 text-amber-500" />
          <p className="uppercase first-letter:capitalize uppercase">ERRORED</p>
        </>
      )}
      {status === "true" && (
        <>
          <MdCheckCircle className="h-5 w-5 text-teal-500" />
          <p className="pl-0 pr-1 py-1 uppercase first-letter:capitalize bg-green-100 dark:bg-green-50 uppercase">APPROVED</p>
        </>
      )}
      {status === "CAPTURED" && (
        <>
          <MdCheckCircle className="h-5 w-5 text-teal-500" />
          <p className="pl-0 pr-1 py-1 uppercase first-letter:capitalize bg-green-100 dark:bg-green-50 rounded-lg text-center"><span className="text-center px-2 text-green-500 uppercase">{value}</span></p>
        </>
      )}
      {status === "APPROVED" && (
        <>
          <MdCheckCircle className="h-5 w-5 text-teal-500" />
          <p className="pl-0 pr-1 py-1 uppercase first-letter:capitalize bg-green-100 dark:bg-green-50 rounded-lg text-center"><span className="text-center px-2 text-green-500 uppercase">{value}</span></p>
        </>
      )}
      {status === "CREATED" && (
        <>
          <MdCheckCircle className="h-5 w-5 text-teal-500" />
          <p className="pl-0 pr-1 py-1 uppercase first-letter:capitalize bg-green-100 dark:bg-green-50 rounded-lg text-center"><span className="text-center px-2 text-green-500 uppercase">{value}</span></p>
        </>
      )}
      {status === "AUTHORIZED" && (
        <>
          <RiRotateLockFill className="h-5 w-5 text-orange-400" />
          <p className="pl-0 pr-1 py-1 uppercase first-letter:capitalize bg-orange-100 dark:bg-orange-50 rounded-lg text-center"><span className="text-center px-2 text-orange-500 uppercase">{value}</span></p>
        </>
      )}
      {status === "REFUNDED" && (
        <>
          <MdOutlineReplayCircleFilled className="h-5 w-5 text-blue-500" />
          <p className="pl-0 pr-1 py-1 uppercase first-letter:capitalize bg-blue-100 dark:bg-blue-50 rounded-lg text-center"><span className="text-center px-2 text-blue-500 uppercase">{value}</span></p>
        </>
      )}
      {status === "DECLINED" && (
        <>
          <MdCancel className="h-5 w-5 text-red-500" />
          <p className="pl-0 pr-1 py-1 uppercase first-letter:capitalize bg-red-100 dark:bg-red-50 rounded-lg text-center"><span className="text-center px-2 text-red-500 uppercase">{value}</span></p>
        </>
      )}
      {status === "PENDING" && (
        <>
          <MdTimer className="h-5 w-5 text-orange-400" />
          <p className="pl-0 pr-1 py-1 uppercase first-letter:capitalize bg-amber-100 dark:bg-amber-400 rounded-lg text-center"><span className="text-center px-2 text-amber-500 uppercase" >{value}</span></p>
        </>
      )}
      {status === "ERRORED" && (
        <>
          <MdError className="h-5 w-5 text-amber-500" />
          <p className="pl-0 pr-1 py-1 lowercase first-letter:capitalize bg-amber-100 dark:bg-amber-50 rounded-lg"><span className="text-center px-2 text-amber-500 uppercase">{value}</span></p>
        </>
      )}
      {status === "CANCELLED" && (
        <>
          <MdCancel className="h-5 w-5 text-red-500" />
          <p className="pl-0 pr-1 py-1 lowercase first-letter:capitalize bg-red-100 dark:bg-red-50 rounded-lg"><span className="text-center px-2 text-red-500 uppercase">{value}</span></p>
        </>
      )}
      {status === "REFUND DECLINED" && (
        <>
          <MdOutlineReplayCircleFilled className="h-5 w-5 text-red-500" />
          <p className="pl-0 pr-1 py-1 uppercase first-letter:capitalize bg-red-100 dark:bg-amber-50 rounded-lg text-center"><span className="text-center px-2 text-red-500 uppercase">{value.toLowerCase().replace(/\b\w/g, (value) => value.toUpperCase())}</span></p>
        </>
      )}
      {status === "CHARGEBACK" && (
        <>
          <MdOutlineReplayCircleFilled className="h-5 w-5 text-red-500" />
          <p className="pl-0 pr-1 py-1 uppercase first-letter:capitalize bg-red-100 dark:bg-red-50 rounded-lg text-center"><span className="text-center px-2 text-red-500 uppercase">{value}</span></p>


        </>
      )}

      {status === "REJECTED" && (
        <>
          <MdCancel className="h-5 w-5 text-red-500" />
          <p className="pl-0 pr-1 py-1 uppercase first-letter:capitalize bg-red-100 dark:bg-red-50 rounded-lg text-center"><span className="text-center px-2 text-red-500 uppercase">{value}</span></p>
        </>
      )}

      {status === "ALERTED" && (
        <>
          <MdError className="h-5 w-5 text-amber-500" />
          <p className="pl-0 pr-1 py-1 lowercase first-letter:capitalize bg-amber-100 dark:bg-amber-50 rounded-lg"><span className="text-center px-2 text-amber-500 uppercase">{value}</span></p>
        </>
      )}
      {status === "HELD" && (
        <>
          <MdError className="h-5 w-5 text-amber-500" />
          <p className="pl-0 pr-1 py-1 lowercase first-letter:capitalize bg-amber-100 dark:bg-amber-50 rounded-lg"><span className="text-center px-2 text-amber-500 uppercase">{value}</span></p>
        </>
      )}
      {status === "DUPLICATE" && (
        <>
          <MdError className="h-5 w-5 text-amber-500" />
          <p className="pl-0 pr-1 py-1 lowercase first-letter:capitalize bg-amber-100 dark:bg-amber-50 rounded-lg"><span className="text-center px-2 text-amber-500 uppercase">{value}</span></p>
        </>
      )}


    </>
  );
};

export default StatusRender;
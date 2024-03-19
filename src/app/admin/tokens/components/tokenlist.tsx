import React, { useEffect, useMemo, useState } from 'react'
import { MdCheckCircle, MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { TokenObj } from '../page';
import { useTable, useSortBy, useExpanded, Column, Row } from 'react-table';
import { getAllTokens } from 'api/tokens';
import Card from 'components/card';
import DivLoader from 'components/divloader/DivLoader';
import Pagination from 'components/pagination';
import { createColumnHelper } from '@tanstack/react-table';
import Searchbox from 'components/fields/Searchbox';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { BiSolidBadgeCheck } from 'react-icons/bi';
import { getImage } from 'utils/commonFunction';
import { IoEye, IoEyeOutline } from 'react-icons/io5';
import { getProfile } from 'api/users';
import toast from 'react-hot-toast';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import InputField from 'components/fields/InputField';
import StatusRender from 'app/admin/transactions/components/StatusRender';
import Image from 'next/image';
import Link from 'next/link';

function Tokenlist(
    props: {
        data: any,
        isLoading: boolean;
        roleData: any;
        page: number;
        setPage: any;
        totalpage: number;
        totalItems: number;
        currentPage: number;
        pageSize: number;
        setPageSize: any;
        fetchAllTokensData: any;
        filter: any;
        setFilter: (value: any) => void;
        // allGateways: any;
        onValueChange: (value: string) => void;
        // filterData: () => void;
    }
) {

    const {
        data,
        pageSize,
        setPageSize,
        isLoading,
        page,
        setPage,
        totalpage,
        totalItems,
        currentPage,
        onValueChange,
        roleData,
        // allGateways,
        fetchAllTokensData,
        setFilter,
        filter,
        // filterData
    } = props;

    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
    const [isOpenTokenIdModal, setIsOpenTokenIdModal] = useState(false);
    const [tokenVerifyIput, setTokenVerifyIput] = useState<any>({});






    const method = roleData[0]?.token?.value?.token_show_method_name;

    const columns: any = useMemo(
        () => [

            { Header: 'CLIENT NAME', accessor: 'client', sortType: 'alphanumeric' },
            { Header: 'DATE', accessor: 'created_at', sortType: 'alphanumeric' },

            { Header: 'UNIQUE ID', accessor: 'id', sortType: 'alphanumeric' },

            { Header: 'TOKEN ID', accessor: 'token', sortType: 'alphanumeric' },
            { Header: `GATEWAY ${method ? "" : "ID"}`, accessor: `${method ? "gateway_name" : "gateway_id"}`, sortType: 'alphanumeric' },
            { Header: 'STATUS', accessor: 'status', sortType: 'alphanumeric' },



        ],
        [expandedRows]
    );

    const dataWithExpandedContent = useMemo(
        () =>
            data.map((row: any) => ({
                ...row,
                // subRows: row.payment.map((payment: any) => ({ ...payment })),
            })),
        [data]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data: dataWithExpandedContent,
        },
        useSortBy,
        useExpanded,

    );

    const handleValueChange = (e: any) => {
        onValueChange(e);
        // setSearchVal(e);
    };

    console.log("rows", rows)
    const onCloseTokenModal = () => {
        setIsOpenTokenIdModal(false)
        setTokenVerifyIput({})
    }

    return (
        <>


            <Card extra={"w-full h-full sm:overflow-auto px-6 mb-6"}>
                <header className="relative flex items-center justify-between pt-5 flex-wrap">
                    {/* <div className="text-xl font-bold text-navy-700 dark:text-white">
                        All Tokens
                    </div> */}
                    {/* <CardMenu /> */}
                    <Searchbox onSearch={handleValueChange} />
                </header>


                <div className="mt-4 overflow-x-auto scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-xl scrollbar-h-1.5 relative overflow-x-auto shadow-md sm:rounded-lg">

                    {

                        props?.isLoading ?
                            <DivLoader className="m-5 h-6 w-6  border-indigo-500" /> :

                            <table {...getTableProps()} className="w-full w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                                    {headerGroups.map((headerGroup, index) => (
                                        <tr key={index} {...headerGroup.getHeaderGroupProps()} className="!border-px !border-gray-400">
                                            {headerGroup.headers.map((column) => (
                                                <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                                    className={`text-start text-sm font-bold text-gray-900 dark:text-white cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start pl-3`} >
                                                    {column.render('Header')}
                                                    <div className=" justify-between text-xs text-gray-200">
                                                        {column.isSorted ? (column.isSortedDesc ? ' ' : ' ') : ''}
                                                    </div>
                                                </th>
                                            ))}

                                        </tr>
                                    ))}
                                </thead>


                                <tbody {...getTableBodyProps()}>
                                    {rows?.length > 0 ? rows.map((row: Row<TokenObj>) => {
                                        prepareRow(row);

                                        return (
                                            <React.Fragment key={row.id}>
                                                <tr {...row.getRowProps()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                                                    {row.cells.map((cell, index) => (

                                                        <td {...cell.getCellProps()} className={`min-w-[150px] border-white/0 py-3  pr-4 pl-3 `}
                                                        > <div className="flex items-center">
                                                                <div className="flex items-center text-sm font-normal text-navy-700 dark:text-white">

                                                                    {/* {cell.value || "-"} */}


                                                                    {
                                                                        cell.value ?
                                                                            cell?.column?.id == "status"
                                                                                ?
                                                                                <div className="flex items-center gap-1.5 text-sm font-bold">

                                                                                    <StatusRender
                                                                                        status={cell.value}
                                                                                        value={cell.value}
                                                                                    />
                                                                                </div>
                                                                                : cell?.column?.id == "gateway_name" ?
                                                                                    (method ?
                                                                                        <span className="flex items-center ">
                                                                                            <Image
                                                                                                style={{ height: "auto", width: "15px" }}
                                                                                                className="h-auto w-20"
                                                                                                src={getImage(cell?.row?.original?.gateway_name)}
                                                                                                alt="Gateway Image"
                                                                                            />
                                                                                            <p className="px-2">{cell?.row?.original?.gateway_name
                                                                                                ? cell?.row?.original?.gateway_name
                                                                                                : "-"}</p>
                                                                                        </span> :
                                                                                        cell?.row?.original?.gateway_id
                                                                                    )


                                                                                    :

                                                                                    (cell?.column?.id == "token" && cell.value) ?
                                                                                        <div className='flex items-center'>
                                                                                            <span>
                                                                                                {cell?.value}
                                                                                            </span>
                                                                                            <IoEye
                                                                                                className=' h-5 w-5  ml-2 cursor-pointer'
                                                                                                onClick={() => {

                                                                                                    getProfile().then((data) => {
                                                                                                        let is_auth_2fa_activate = data[0]?.auth_2fa

                                                                                                        setIsOpenTokenIdModal(true)

                                                                                                        setTokenVerifyIput((prev: any) => {
                                                                                                            return {
                                                                                                                ...prev,
                                                                                                                token_id: cell?.value,
                                                                                                                is_auth_2fa_activate
                                                                                                            }
                                                                                                        })

                                                                                                    }).catch((error) => {
                                                                                                        toast.error("something went wrong! please try after some time.")

                                                                                                    }).finally(() => {

                                                                                                    })

                                                                                                }}
                                                                                            />


                                                                                        </div>

                                                                                        :
                                                                                        cell?.value




                                                                            : "-"
                                                                    }






                                                                    {(cell?.column?.id == "id" && cell.value)
                                                                        ? cell?.row?.original?.claimed ? <>
                                                                            <BiSolidBadgeCheck title='Active' className='text-green-500 h-8 w-8  ml-2' />
                                                                        </>
                                                                            : <>
                                                                                <BiSolidBadgeCheck title='Used' className='text-gray-400 h-8 w-8 ml-2' />

                                                                            </> : ""

                                                                    }

                                                                </div>
                                                            </div>
                                                        </td>
                                                    ))

                                                    }

                                                </tr>

                                            </React.Fragment>
                                        );
                                    })

                                        :
                                        <tr>
                                            <td colSpan={15} >
                                                <p className="text-center p-4" >No records found.</p>
                                            </td>

                                        </tr>
                                    }
                                </tbody>

                            </table>

                    }



                </div>
                <Pagination
                    setPage={setPage}
                    page={page}
                    totalpage={totalpage}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    arraySize={[50, 100, 200]}
                />
            </Card>
            <Modal isOpen={isOpenTokenIdModal} onClose={onCloseTokenModal}>
                <ModalOverlay className="bg-[#000]   !opacity-30 " />
                <ModalContent className="!z-[1002] !m-auto   shadow !w-max min-w-[350px] !max-w-[85%] md:top-[12vh] ">

                    <ModalBody className="">
                        <Card extra="px-[30px] pt-[35px] pb-[20px] max-w-[450px] flex flex-col !z-[1004] ">
                            {!tokenVerifyIput?.is_auth_2fa_activate ? <>
                                <h1 className=" text-2xl font-bold">
                                    {"2FA Verification"}
                                </h1>
                                <p className="opacity-50">To see the wallet address please verify 2FA code.</p>
                                <br />

                                <p className="">Your account does not meet the necessary requirements in order to see wallet address, please visit <Link href="/admin/profile" className='text-indigo-500'>profile settings</Link> and activate 2FA code.</p>
                                <div className="flex gap-2  mt-3 justify-end">
                                    <button
                                        onClick={onCloseTokenModal}
                                        className="linear rounded-xl bg-gray-100 px-3 py-2 text-base font-medium text-navy-700 outline-none transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                                    >
                                        Close
                                    </button>{" "}

                                </div>
                            </> :

                                <>
                                    <h1 className=" text-2xl font-bold">
                                        {"2FA Verification"}
                                    </h1>
                                    <p className="opacity-50">To see the wallet address please verify 2FA code.</p>

                                    <div className="w-72 bg-white">
                                        <InputField
                                            variant="auth"
                                            extra="mt-3 w-full"
                                            value={tokenVerifyIput?.password}
                                            label="Password *"
                                            placeholder="Enter password"
                                            id="password"
                                            type={`${tokenVerifyIput?.isShow ? "text" : "password"}`}
                                            onChange={(e) => {
                                                const name = e.target.id
                                                const value = e.target?.value
                                                setTokenVerifyIput((prev: any) => {
                                                    return {
                                                        ...prev,
                                                        [name]: value
                                                    }
                                                })
                                            }}

                                            passwordShow={tokenVerifyIput?.isShow}
                                            setPasswordShow={() => setTokenVerifyIput((prev: any) => {
                                                return {
                                                    ...prev,
                                                    isShow: !prev?.isShow
                                                }
                                            })}


                                        />

                                    </div>
                                    <div className="w-72">
                                        <InputField
                                            variant="auth"
                                            extra="mt-3 w-full"
                                            value={tokenVerifyIput?.passCode}

                                            label="2FA Code *"
                                            placeholder="Enter 2FA 6 digit code"
                                            id="passCode"
                                            type="number"


                                            onChange={(e) => {
                                                const name = e.target.id
                                                const value = e.target?.value?.trim()
                                                if (value?.length <= 6) {
                                                    setTokenVerifyIput((prev: any) => {
                                                        return {
                                                            ...prev,
                                                            [name]: value
                                                        }
                                                    })
                                                }

                                            }}


                                        />
                                    </div>
                                    <div className="flex gap-2  mt-3 justify-end">
                                        <button
                                            onClick={onCloseTokenModal}
                                            className="linear rounded-xl bg-gray-100 px-3 py-2 text-base font-medium text-navy-700 outline-none transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"

                                        >
                                            Close
                                        </button>{" "}
                                        <button
                                            className="linear rounded-xl bg-indigo-50 px-3 py-2 text-base font-medium text-indigo-500 outline-none transition duration-200 hover:bg-indigo-600/5 active:bg-indigo-700/5 dark:bg-indigo-400/10 dark:text-white dark:hover:bg-indigo-300/10 dark:active:bg-indigo-200/10"
                                        // onClick={() => {
                                        //     handleVerifyWallet()
                                        // }}

                                        >
                                            Submit
                                        </button>
                                    </div>
                                </>}
                        </Card>
                    </ModalBody>

                </ModalContent>
            </Modal>

        </>
    )
}

export default Tokenlist
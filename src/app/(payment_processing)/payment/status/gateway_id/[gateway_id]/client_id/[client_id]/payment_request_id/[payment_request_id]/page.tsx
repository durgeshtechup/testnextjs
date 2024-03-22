"use client"
import React, { useEffect, useState } from 'react'
import { VscError } from "react-icons/vsc";
import { FaCircleCheck, FaRegCircleCheck } from "react-icons/fa6";
import { Spinner } from '@chakra-ui/react';
import { BiSolidError } from 'react-icons/bi';
import axios from 'axios';
import { SiAuth0 } from "react-icons/si";
import { RiRotateLockFill } from 'react-icons/ri';
import { useParams } from 'next/navigation';

function PaymentStatus() {
    // let [params] = useSearchParams()
    let urlParms = useParams()
    // alert(JSON.stringify(urlParms))
    // const SearchParam = Object.fromEntries([...params])

    const [paymentProcessingData, setPaymentProcessingData] = useState<any>("")
    const [paymentProcessingReason, setPaymentProcessingReason] = useState<any>("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPaymentProcessingStatus()

    }, [])

    const getPaymentProcessingStatus = () => {
        let url = process.env.REACT_APP_API_BASE_URL + "/api/v1/payment/processing"

        const { gateway_id, client_id, payment_request_id } = urlParms
        let payload = {
            gateway_id: gateway_id,
            client_id: client_id,
            payment_request_id: payment_request_id
        }

        setLoading(true)
        axios.post(url, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response: any) => {
            let res = response?.data
            setPaymentProcessingData(res?.status)
            setPaymentProcessingReason(res?.reason)
            setLoading(false)
        }).catch((error) => {
            console.log("error", error)
            setPaymentProcessingData("")
            setPaymentProcessingReason("")

            setLoading(false)
        })

        // paymentProcessingStatus(payload).then((res) => {
        //     // console.log("Response", res)
        //     setPaymentProcessingData(res?.status)
        //     setPaymentProcessingReason(res?.reason)
        //     setLoading(false)

        // }).catch((error) => {
        //     console.log("error", error)
        //     setPaymentProcessingData("")
        //     setPaymentProcessingReason("")

        //     setLoading(false)
        // })

    }




    return (
        <div className='text-center'>


            <div className='!h-[70vh] flex justify-center items-center flex-col ' >
                {!loading ? <div className='flex justify-center items-center flex-col   !h-[70vh]'>
                    <h1>

                        {
                            paymentProcessingData == "APPROVED"
                                ?
                                <>
                                    <FaCircleCheck className='text-green-500 text-9xl  mx-auto' />
                                    <h3 className='font-bold 0 my-3'>Payment has been Successfully done.</h3>
                                </>
                                : paymentProcessingData == "DECLINED"
                                    ?
                                    <>
                                        <VscError className='text-red-500 text-9xl  mx-auto' />
                                        <div className='text-start'>
                                            <h3 className='font-bold my-3'>Payment has been declined.</h3>
                                            {paymentProcessingReason && <h3 className='font-bold my-3'>Reason: {paymentProcessingReason}</h3>}
                                        </div>



                                    </>

                                    : paymentProcessingData == "ERRORED"
                                        ? <div className=''>
                                            <BiSolidError className='text-red-500 text-9xl mx-auto' />
                                            <div className='text-start'>

                                                <h3 className='font-bold my-3'>There is some error occurred with this transaction.</h3>
                                                {paymentProcessingReason && <h3 className='font-bold my-3'>Reason: {paymentProcessingReason}</h3>}

                                            </div>
                                        </div>
                                        : paymentProcessingData == "AUTHORIZED"
                                            ? <div className=''>
                                                <RiRotateLockFill className='text-orange-400 text-9xl mx-auto' />
                                                <div className='text-start'>

                                                    {/* <h3 className='font-bold my-3'>There is some error occurred with this transaction.</h3> */}
                                                    {paymentProcessingReason && <h3 className='font-bold my-3'>{paymentProcessingReason}</h3>}

                                                </div>
                                            </div>
                                            : <span className='text-lg  mx-auto'>Something went wrong !</span>

                        }
                    </h1>




                </div> :

                    <>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='white'
                            color='blue'
                            style={{ height: "50px", width: "50px" }}
                        />
                        <br />
                        <span className='mx-2 text-lg font-normal'>Please wait, your transaction is being processed. If you want you can close this tab.</span>

                    </>

                }



            </div>


        </div>
    )
}

export default PaymentStatus
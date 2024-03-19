"use client"
import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { getId } from "utils/auth";
import { getSingleRole } from "api/role";
import { getAllSubscription, getSubscriptuionsFilter } from "api/subscription";
import { getAllGateways } from "api/gateways";
// import SubscriptionList from "./components/tokenlist";
//import sampledata from "./components/sampledata";
import { ClientContext } from "clientProvider";
import Tokenlist from "./components/tokenlist";
import { getAllTokens } from "api/tokens";


export type TokenObj = {
    token?: any;
    status?: any;
    is_active?: any;
    id?: any;
    created_at?: any;
    client_id?: any;
    client_gateway_id?: any;
    claimed?: any;
    gateway_name?: any;
    gateway_id?: any;
    client?: any


};



const Token = () => {


    const [tokensData, setTokensData] = useState<TokenObj[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>();
    const [page, setPage] = useState<number>(1);
    const [totalpage, setTotalPage] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(50);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTexts, setSearchTexts] = useState<string>("");
    //   const [allGateways, setAllGateways] = useState();
    const { singleRoleData, setSingleRoleData } = useContext(ClientContext);

    const [filter, setFilter] = useState({
        clients: [],
        interval: [],
        duration: null,
        status: [],
    });



    const serchboxValueChange = async (searchTerm: string) => {
        const search_txt = searchTerm || "";

        if (search_txt !== searchTexts && searchTexts !== "") {
            await setSearchTexts(search_txt);
            setPage(1);
            setCurrentPage(1);
        } else {
            await setSearchTexts(search_txt);
        }

    }



 

    useEffect(() => {
        fetchAllTokensData()
    }, [page, pageSize, searchTexts])

    const fetchAllTokensData = () => {
        setIsLoading(true)
        getAllTokens(page, pageSize, searchTexts).then((data) => {
            setTokensData(data?.tokens ?? []);

            setTotalPage(data.total_pages);
            setTotalItems(data.tokens);
            setCurrentPage(data.current_page);
        }).catch((error) => {
            toast.error(
                error?.response?.data?.message ??
                "Something went wrong while fetching data"
            )
        }).finally(()=>{
            setIsLoading(false)
        })
    }

    return (
        <>
            <div className="mt-5">
                <Tokenlist
                    data={tokensData}
                    isLoading={isLoading}
                    roleData={singleRoleData}
                    page={page}
                    setPage={setPage}
                    totalpage={totalpage}
                    totalItems={totalItems}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    fetchAllTokensData={fetchAllTokensData}
                    filter={filter}
                    setFilter={setFilter}
                    onValueChange={serchboxValueChange}
                //   allGateways={allGateways}
                //   filterData={filterData}

                />
            </div>
        </>
    )
}

export default Token;
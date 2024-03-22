"use client"

import { getRolePermission, getSingleRole } from 'api/role';
import { ClientContext } from 'clientProvider';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { getId } from 'utils/auth';

export type PaymentMethodRowObj = {
  id: string;
  name: string;
  logo: string;
  payments: boolean;
  authorization: boolean;
  payout: boolean;
  is_active: boolean;
};


function Role() {
    const [roleData, setRoleData] = useState<any>([]);
    const [userData, setUserData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>();
    const [page, setPage] = useState<number>(1);
    const [totalpage, setTotalPage] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(50);
    const [currentPage, setCurrentPage] = useState<number>(1);
  
    const { singleRoleData, setSingleRoleData } = useContext(ClientContext);
  
    const fetchRole = () => {
      setIsLoading(true);
      if (pageSize === null || pageSize === undefined) {
        setIsLoading(false);
        return;
      }
      getRolePermission(page,
        pageSize,)
        .then((data) => {
          setRoleData(data?.[0] ?? []);
          setTotalPage(data?.[1]?.total_pages);
          setTotalItems(data?.[1]?.total_items);
          setCurrentPage(data?.[1]?.current_page);
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message ??
              "Something went wrong while fetching role"
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    const fetchSingleRole = () => {
      // setIsLoading(true);
      getSingleRole(getId())
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
    };
  
    useEffect(() => {
      fetchRole();
    }, [page, pageSize]);
  
    useEffect(() => {
      fetchSingleRole();
    }, []);
  return (
   <>
     {/* <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <CreateRoleMethod
          fetchRole={fetchRole}
          singleRoleData={singleRoleData}
        />
      </div> */}
      <div className="mt-5">
        {/* <RoleMethodTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          tableData={roleData}
          fetchRole={fetchRole}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          totalpage={totalpage}
          totalItems={totalItems}
          currentPage={currentPage}
          singleRoleData={singleRoleData}
        /> */}

        

{/* <div id="detailed-pricing" className="w-full overflow-x-auto">
    <div className="overflow-hidden min-w-max">
        <div className="grid grid-cols-12 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
            <div className="flex items-center">ROLE NAME</div>
            <div>DASHBOARD</div>
            <div>CLIENT</div>
            <div>ORGANIZATION</div>
            <div>PAYMENT</div>
            <div>USER</div>
            <div>PAYMENT METHOD</div>
            <div>ROLE</div>
            <div>SUBSCRIPTION</div>
            <div>ACTION</div>
        </div>
      { [1,2,3,4,5,6,7,8,9,10].map((m)=>{
        return            <div className="grid grid-cols-12 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
            <div className="text-gray-500 dark:text-gray-400">Test</div>
            <div>
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
            <div>
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
            <div>
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
            <div>
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
            <div>
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
            <div>
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
            <div>
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
            <div>
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
            <div>
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
           
        </div>
        
      })}
       
       
    </div>
</div> */}



<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 font-bold">
            <tr>
                <th scope="col" className="px-6 py-3">
                ROLE NAME
                </th>
                <th scope="col" className="px-6 py-3">
                DASHBOARD
                </th>
                <th scope="col" className="px-6 py-3">
                CLIENT
                </th>
                <th scope="col" className="px-6 py-3">
                ORGANIZATION
                </th>
                <th scope="col" className="px-6 py-3">
                PAYMENT
                </th>
                <th scope="col" className="px-6 py-3">
                USER
                </th>
                <th scope="col" className="px-6 py-3">
                PAYMENT METHOD
                </th>
                <th scope="col" className="px-6 py-3">
                ROLE
                </th>
                <th scope="col" className="px-6 py-3">
                SUBSCRIPTION
                </th>
                <th scope="col" className="px-6 py-3">
                ACTION
                </th>
            </tr>
        </thead>
        <tbody>
      { [1,2,3,4,5,6].map((m,index)=>{

      return      <tr key={index} className="bg-white text-gray-900 border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">
               
                    Test
                </td>
              { [1,2,3,4,5,6,7,8].map((m,index)=>{
              return   <td key={index} className="px-6 py-4 ">
                <div className='flex justify-center'>
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
                </td>


                
            })
                
            }
                
                <td className="px-6 py-4 ">
    Edit
    </td>
            
              
            </tr>
      })
            
        }
          
        </tbody>
    </table>
</div>




        
      </div>
      
      </>
  )
}

export default Role
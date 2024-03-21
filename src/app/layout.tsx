"use client"

import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import { Toaster } from 'react-hot-toast';
import { ClientProvider } from 'clientProvider';
import Head from 'next/head';
import { getToken } from 'utils/auth';
import { useRouter } from 'next/navigation';
import {NextUIProvider} from '@nextui-org/react';
// import '@asseinfo/react-kanban/dist/styles.css';
// import '/public/styles/Plugins.css';

export default function RootLayout({ children }: { children: ReactNode }) {

  const navigate=useRouter()
  return (
    <html lang="en">
   
      <body id={'root'}>
      <div style={{ position: "absolute", top: "4rem" }}>
        <Toaster position="top-center" containerClassName="font-nunito" />
      </div>
      
      <ClientProvider>
        <NextUIProvider navigate={navigate.push} >
        <AppWrappers
        
        >{children}</AppWrappers>

        </NextUIProvider>

        

       
      </ClientProvider>

      </body>
    </html>
  );
}

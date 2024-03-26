/* eslint-disable */

import { HiX } from 'react-icons/hi';
import Links from './components/Links';

import SidebarCard from 'components/sidebar/components/SidebarCard';
import {
  renderThumb,
  renderTrack,
  renderView,
  renderViewMini,
} from 'components/scrollbar/Scrollbar';
import { Scrollbars } from 'react-custom-scrollbars-2';
import avatar4 from '/public/img/avatars/avatar4.png';
import Card from 'components/card';
import { IRoute } from 'types/navigation';
import { useContext } from 'react';
import { ConfiguratorContext } from 'contexts/ConfiguratorContext';
import Image from 'next/image';

// import mainlogo from '../../assets/img/mainlogo.png'
import mainlogo from '/public/img/assets/img/Logo-2.png'
import Link from 'next/link';

function SidebarHorizon(props: { routes: IRoute[]; [x: string]: any }) {
  const { routes, open, setOpen, variant } = props;
  const context = useContext(ConfiguratorContext);
  const { mini, hovered, setHovered } = context;
  return (
    <div
      className={`sm:none ${
        mini === false
          ? 'w-[285px]'
          : mini === true && hovered === true
          ? 'w-[285px]'
          : 'w-[285px] xl:!w-[120px]'
      } duration-175 linear fixed !z-50 min-h-full transition-all md:!z-50 lg:!z-50 xl:!z-0 ${
        variant === 'auth' ? 'xl:hidden' : 'xl:block'
      } ${open ? '' : '-translate-x-[110%] xl:translate-x-[unset]'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card
        extra={`ml-3 w-full h-[96.8vh] sm:mr-4 sm:my-4 m-2 !rounded-[20px]`}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={
            mini === false
              ? renderView
              : mini === true && hovered === true
              ? renderView
              : renderViewMini
          }
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <span
                className="absolute right-4 top-4 block cursor-pointer xl:hidden"
                onClick={() => setOpen(false)}
              >
                <HiX />
              </span>
              {/* <div className={`ml-[52px] mt-[44px] flex items-center `}> */}
              <div className={`ml-[52px] py-[30px] flex items-center `}>
                <div
                  className={`ml-1 mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white ${
                    mini === false
                      ? 'block'
                      : mini === true && hovered === true
                      ? 'block'
                      : 'hidden'
                  }`}
                >


                  {/* Horizon <span className="font-medium">PRO</span> */}


                    {/*lightning*/}
      {/* <div className={`mr-[40px] ml-[30px] mt-[47px] flex items-center justify-center`}> */}
      {/* bm2pay */}
      {/* <div className={`mr-[40px] ml-[30px] mt-[30px] flex items-center justify-center`}> */}
      <div className={`mr-[40px] ml-[30px]   flex items-center justify-center`}>
        {/* {lightning} */}
        {/* <img src={mainlogo} className="h-full w-10 object-cover" alt="main-logo" /> */}
        {/* {bm2pay} */}
        {/* <img src={mainlogo} className="h-full w-20 object-cover" alt="main-logo" /> */}
        <Image
                    
                    src={mainlogo}
                    className=" h-full w-20 object-cover"
                    alt="main-logo"
                  />
        {/* <div className="flex flex-col  font-poppins text-[20px] font-bold uppercase text-navy-700 dark:text-white">
          lightning
          <span className="font-light text-sm">checks</span>
        </div> */}
      </div>
      {/*lightning*/}
      {/* <div className="mt-[50px] mb-7 h-px bg-gray-300 dark:bg-white/30" /> */}
      {/* {bm2pay} */}



                  
                </div>
                {/* <div
                  className={`ml-1 mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white ${
                    mini === false
                      ? 'hidden'
                      : mini === true && hovered === true
                      ? 'hidden'
                      : 'block'
                  }`}
                >
                  H
                </div> */}
              </div>
              <div className="mb-7 mt-[58px] h-px bg-gray-200 dark:bg-white/10" />
              {/* Nav item */}
              <ul className='pb-7'>
                <Links mini={mini} hovered={hovered} routes={routes} />
               {/* {
                routes?.map((m:any)=>{
                  return<li>
                   <Link  href={m?.layout+ m?.path} >
                  <button>
                   
{m?.name}
                    

                  </button>
                  </Link>

                  </li>
                })
               } */}
              </ul>
            </div>
            {/* Free Horizon Card    */}
        
          </div>
        </Scrollbars>
      </Card>
    </div>
  );
}

export default SidebarHorizon;

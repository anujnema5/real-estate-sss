import React from 'react'
import { Inter } from "next/font/google";
import '../../globals.css'
import Header from '@/components/mobile/Layout/Header/Header';
import Footerbar from '@/components/mobile/Layout/Footer/Footerbar';


const layout = ({ children }: { children: React.ReactNode }) => {
    return (

        <div className="flex flex-col justify-center items-center bg-secondary">
            <div className="lg:w-6/12 xl:w-[480px] sm:w-8/12 w-full min-h-screen border shadow-md shadow-zinc-300 relative">
                <Header />
                <div className="w-full h-full flex flex-col mt-3">
                    {children}
                </div>
                <Footerbar />
            </div>
        </div>
    )
}

export default layout
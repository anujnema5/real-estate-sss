import React from 'react'
import { Inter } from "next/font/google";
import '../globals.css'
import Header from '@/components/mobile/Layout/Header/Header';
import Footerbar from '@/components/mobile/Layout/Footer/Footerbar';


const layout = ({ children }: { children: React.ReactNode }) => {
    return (

        <div className="flex flex-col justify-center items-center">
            <div className="lg:w-6/12 xl:w-[30vw] sm:w-8/12 w-full min-h-screen border shadow-md shadow-zinc-300 relative">
                <Header />
                <div className="w-full h-full">
                    {children}
                </div>
                <Footerbar />
            </div>
        </div>
    )
}

export default layout
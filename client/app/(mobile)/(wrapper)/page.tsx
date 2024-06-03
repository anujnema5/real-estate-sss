import WhyGetLook from '@/components/desktop/Layout/WhyGetLook/WhyGetLook'
import Brands from '@/components/mobile/Blocks/Home/Brands'
import Features from '@/components/mobile/Blocks/Home/Features'
import GetLooks from '@/components/mobile/Blocks/Home/GetLooks'
import DayDeal from '@/components/mobile/Blocks/Home/Offer/DayDeal'
import OfferBlock from '@/components/mobile/Blocks/Home/Offer/OfferBlock'
import NewLaunchServices from '@/components/mobile/Blocks/Home/NewLaunchServices'
import Shop from '@/components/mobile/Blocks/Home/Shop/Shop'
import ShopByProducts from '@/components/mobile/Blocks/Home/Shop/ShopByProducts'
import WhyUs from '@/components/mobile/Blocks/Home/WhyUs'
import Carousel from '@/components/mobile/ui/Carousel'
import Search from '@/components/mobile/ui/Search'
import React from 'react'

const page = () => {
  return (
    <div className='w-full min-h-screen bg-muted flex flex-col px-3 gap-5'>
      <Search/>
      <Carousel/>
      <OfferBlock/>
      <Shop/>
      <ShopByProducts/>
      <DayDeal/>
      <NewLaunchServices/>
      <GetLooks/>
      <WhyUs/>
      <Brands/>
      <Features/>
      <div className='h-14 w-full'></div>
    </div>
  )
}

export default page
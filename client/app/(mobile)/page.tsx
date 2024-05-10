import WhyGetLook from '@/components/desktop/Layout/WhyGetLook/WhyGetLook'
import Brands from '@/components/mobile/Blocks/Brands/Brands'
import Features from '@/components/mobile/Blocks/Features/Features'
import GetLooks from '@/components/mobile/Blocks/Media/GetLooks'
import DayDeal from '@/components/mobile/Blocks/Offer/DayDeal'
import OfferBlock from '@/components/mobile/Blocks/Offer/OfferBlock'
import NewLaunchServices from '@/components/mobile/Blocks/Services/NewLaunchServices'
import Shop from '@/components/mobile/Blocks/Shop/Shop'
import ShopByProducts from '@/components/mobile/Blocks/Shop/ShopByProducts'
import WhyUs from '@/components/mobile/Blocks/Whyus/WhyUs'
import Carousel from '@/components/mobile/ui/Carousel'
import Search from '@/components/mobile/ui/Search'
import React from 'react'

const page = () => {
  return (
    <div className='w-full min-h-screen bg-muted flex flex-col gap-4'>
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
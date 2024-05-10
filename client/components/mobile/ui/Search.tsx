import SearchIcon from '@/assets/Icons/SearchIcon'
import { Input } from '@/components/ui/input'
import React from 'react'
import MuteBackground from './MuteBackground'

const Search = () => {
  return (
    <MuteBackground>
      <div className="relative w-full h-14">

        <Input placeholder='Lorem lorem lorem lorem lorem'
          className='ring-[1px] 
          ring-muted-dark rounded-lg
          bg-white sm:placeholder:font-normal placeholder:font-normal 
          placeholder:text-zinc-400 sm:placeholder:text-lg placeholder:text-base h-full
          px-5 focus:outline-none
          '

        />
        <div className='w-6 h-6 absolute top-3.5 right-3 -translate-x-1/2 text-primary font-bold'>
          <SearchIcon />
        </div>
      </div>
    </MuteBackground>

  )
}

export default Search
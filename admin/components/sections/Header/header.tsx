import { ModeToggle } from '@/components/theme-selector'
import { Button } from '@/components/ui/button'
import React from 'react'

const Header = () => {
    return (
        <header>
            <nav className='w-full h-14 flex items-center justify-between px-5'>
                <div className="font-semibold dark:text-white text-black">
                    LOGO
                </div>
                <div className="flex items-center gap-3">
                    <ModeToggle />
                    <Button>Logout</Button>
                </div>
            </nav>
        </header>
    )
}

export default Header
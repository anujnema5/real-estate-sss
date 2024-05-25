'use client'
import { ModeToggle } from '@/components/theme-selector'
import { Button } from '@/components/ui/button'
import { useLogout } from '@/hooks/useLogout'
import React from 'react'

const Header = () => {
    const { handleLogout } = useLogout();

    return (
        <header>
            <nav className='w-full h-14 flex items-center justify-between px-5'>
                <div className="font-semibold dark:text-white text-black">
                    LOGO
                </div>
                <div className="flex items-center gap-3">
                    <ModeToggle />
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            </nav>
        </header>
    )
}

export default Header
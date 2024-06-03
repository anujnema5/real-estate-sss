'use client'
import React, { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Avatar from '../../ui/Avatar'
import { MobileIcon } from '@radix-ui/react-icons'
import { logout } from '@/features/auth/auth-slice'
import { useRouter } from 'next/navigation'
import { DEFAULT_LOGIN_REDIRECT } from '@/app/routes'

import useGetAuth from '@/hooks/useGetAuth'

const AuthCheck = ({ children, isUserAuthenticated }: { children: React.ReactNode, isUserAuthenticated: boolean }) => {
    const router = useRouter();

    const handleLogin = () => {
        router.push(DEFAULT_LOGIN_REDIRECT)
    }

    if (!isUserAuthenticated) {
        return (
            <Card className='flex flex-col ring-1 ring-transparent'>
                <CardHeader>
                    <CardTitle className='text-lg mb-0 font-medium'>Log in to view your profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleLogin} className='w-full py-5' variant={'outline'}>Login</Button>
                </CardContent>
            </Card>
        )
    }

    return <>{children}</>
}

const UserSnippet = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);
    const subscription = useSelector((state: RootState) => state.auth.subscription);
    const { isUserAuthenticated } = useGetAuth()
    const [hydration, setHydration] = useState(false);

    useEffect(() => {
        if (!hydration) {
            setHydration(true);
        }
    }, [])

    if (!hydration) {
        return null
    }

    const handleLogout = () => {
        dispatch(logout())
        router.push(DEFAULT_LOGIN_REDIRECT)
    }

    console.log(isUserAuthenticated)

    return (
        <React.Fragment>
            <Suspense fallback={null}>
                <AuthCheck isUserAuthenticated={isUserAuthenticated}>
                    <Card className='-space-y-1 ring-1 ring-transparent'>
                        <CardHeader className=''>
                            <div className="flex w-full justify-between items-center">
                                <CardTitle className='text-lg mb-0 font-medium inline-block '>
                                    {`${user?.firstName?.firstLetterCapital() || 'No'} ${user?.lastName?.firstLetterCapital() || 'Name'}`}</CardTitle>
                                <Avatar firstName={user?.firstName} lastName={user?.lastName} imgSrc='' />
                            </div>

                            <CardDescription>
                                {subscription ?
                                    <span className='bg-yellow-400 px-3 py-1 rounded-full text-black'>Premium User</span>
                                    :
                                    <span className='bg-zinc-200 px-3 py-1 rounded-full text-black'>Not a subscriber</span>
                                }
                            </CardDescription>

                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-primary">
                                <MobileIcon />
                                <span>{user?.phoneNumber ? user?.phoneNumber : "No Number Added"}</span>
                            </div>
                        </CardContent>

                        <CardFooter>
                            <Button onClick={handleLogout} className='w-full py-5'>Logout</Button>
                        </CardFooter>
                    </Card>
                </AuthCheck>
            </Suspense>
        </React.Fragment>
    )
}

export default UserSnippet
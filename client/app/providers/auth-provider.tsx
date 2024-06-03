'use client';

import { RootState } from '@/redux/store';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_LOGIN_REDIRECT, authRoutes, privateRoutes } from '../routes';
import useGetAuth from '@/hooks/useGetAuth';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { isUserAuthenticated } = useGetAuth()

    const currentURL = usePathname();

    const checkAuth = () => {
        if (authRoutes.includes(currentURL) && isUserAuthenticated) {
            router.push('/')
        } else if (privateRoutes.includes(currentURL) && !isUserAuthenticated) {
            router.push('/login')
        }
    }

    useEffect(() => {
        checkAuth();
    }, [dispatch, router])

    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider
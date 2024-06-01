'use client'
import { useRefreshMutation } from '@/features/api/auth-api.slice'
import { logout, setCredentials } from '@/features/auth/auth-slice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

const page = () => {
    const [refreshuser, { isError, isLoading, isSuccess, data }] = useRefreshMutation()
    const dispatch = useDispatch();
    const router = useRouter();

    const handleRefreshUser = async () => {
        try {
            const { data } = await refreshuser('').unwrap();
            console.log(data)
            dispatch(setCredentials(data))
            router.push('/')
        } catch (error) {
            dispatch(logout())
            router.push('/login')
        }
    }

    useEffect(() => {
        handleRefreshUser();
    }, [])

    return (
        <div>Loading ...</div>
    )
}

export default page
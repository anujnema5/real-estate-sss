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
            dispatch(setCredentials(data))
            router.push('/')
        } catch (error) {
            console.log(error)
            dispatch(logout())  
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
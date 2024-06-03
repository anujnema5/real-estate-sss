import React from 'react'
import '@/utils/custom-prototypes'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"


const UserAvatar = (
    { firstName, lastName, alt="avatar", imgSrc }:
        { firstName: string, lastName: string, alt?: string, imgSrc: string }) => {

    return (
        <Avatar>
            <AvatarImage src={imgSrc} alt={alt} />
            <AvatarFallback>
                {firstName?.firstLetterCapital().charAt(0) + lastName?.firstLetterCapital().charAt(0)}</AvatarFallback>
        </Avatar>
    )
}

export default UserAvatar
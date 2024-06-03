import UserOptionsMenu from '@/components/mobile/Blocks/Profile/user-options-menu'
import UserProfileMenu from '@/components/mobile/Blocks/Profile/user-profile-menu'
import UserSnippet from '@/components/mobile/Blocks/Profile/user-snippet'
import React from 'react'

const Profile = () => {
  return (
    <div className='w-full space-y-5'>
        <UserSnippet/>
        <UserProfileMenu/>
        <UserOptionsMenu/>
    </div>
  )
}

export default Profile
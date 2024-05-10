'use client'
import React from 'react'

enum HeadingType {
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6'
}

type THeading = {
    text: string,
    type: HeadingType,
    className?: string
}

const Heading: React.FC<THeading> = ({ text, type, className }) => {
    const headingTags = {
        [HeadingType.h1]: 'h1',
        [HeadingType.h2]: 'h2',
        [HeadingType.h3]: 'h3',
        [HeadingType.h4]: 'h4',
        [HeadingType.h5]: 'h5',
        [HeadingType.h6]: 'h6',
    }

    const Tag = headingTags[type] as any;

    // return (
    //     <Tag className={`!${className} text-2xl font-semibold`}>{text}</Tag>
    // )

    return <>{text && <Tag className={`!${className} text-2xl font-semibold`} />}</>;

}

export default Heading

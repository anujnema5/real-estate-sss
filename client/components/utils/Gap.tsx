import React from 'react'

const Gap = (Component: React.FunctionComponent) => {
    const NewComponent = (props: any) => {
        return (
            <div className='sm:px-16 px-4 w-full sm:my-3 my-4'>
                <Component {...props} />
            </div>
        )
    }

    return NewComponent
}

export default Gap
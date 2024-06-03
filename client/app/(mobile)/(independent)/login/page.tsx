import Login from "./login"
import HeadingWrapper from '@/components/mobile/Layout/Providers/heading-wrapper'

const page = () => {

    return (
        <HeadingWrapper showHeading={false}>
            <Login/>
        </HeadingWrapper>
    )
}

export default page
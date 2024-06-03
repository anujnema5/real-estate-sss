'use client'
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const useGetAuth = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const token = useSelector((state: RootState) => state.auth.token)

    const isUserAuthenticated = (user !== null) && (token !== null);
    
    return { isUserAuthenticated, user }
}

export default useGetAuth;
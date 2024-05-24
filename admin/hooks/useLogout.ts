import { useLogOutMutation } from "@/features/api/authApiSlice";
import { logout } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

export const useLogout = () => {
  const [requestLogout, { isError, isLoading, isSuccess, data, error }] = useLogOutMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = useCallback(async () => {
    try {
      await requestLogout({});
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(logout());
      router.push('/');
    }
  }, [requestLogout, dispatch, router]);

  return { handleLogout, isError, isLoading, isSuccess, data, error };
};

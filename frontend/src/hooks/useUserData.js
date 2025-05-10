import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useUserData = () => {
  const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const userData = useMemo(() => ({
    user: user?.data?.user || null,
    loading,
    error,
    isAuthenticated,
    isAdmin: user?.data?.user?.role === 'admin',
    userName: user?.name,
    userEmail: user?.email,
    userRole: user?.role,
    userAddress: user?.address,
    userPhone: user?.phone,
    userCity: user?.city,
    userPincode: user?.pincode
  }), [user, loading, error, isAuthenticated]);

  console.log("userData",userData);

  return userData;
}; 
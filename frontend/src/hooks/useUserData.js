import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useUserData = () => {
  const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const userData = useMemo(() => ({
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin: user?.role === 'admin',
    userName: user?.name,
    userEmail: user?.email,
    userRole: user?.role,
    userAddress: user?.address,
    userPhone: user?.phone,
    userCity: user?.city,
    userPincode: user?.pincode
  }), [user, loading, error, isAuthenticated]);

  return userData;
}; 
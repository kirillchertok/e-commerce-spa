import { useMutation } from '@tanstack/react-query';

import { useAppDispatch } from '@/app/store/hooks';
import { logoutUser } from '@/features/auth/api/auth';
import { setUser } from '@/features/auth/model/authSlice';

export const useLogoutMutation = () => {
    const dispatch = useAppDispatch();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            dispatch(setUser(null));
        },
    });
};

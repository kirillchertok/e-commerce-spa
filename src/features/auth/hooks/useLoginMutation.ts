import { useMutation } from '@tanstack/react-query';

import { loginUser } from '@/features/auth/api/auth';
import type { AuthData } from '@/features/auth/types/auth.types';

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: (data: AuthData) => loginUser(data),
    });
};

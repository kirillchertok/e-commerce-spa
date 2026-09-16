import { useMutation } from '@tanstack/react-query';

import { registerUser } from '@/features/auth/api/auth';
import type { AuthData } from '@/features/auth/types/auth.types';

export const useRegistrationMutation = () => {
    return useMutation({
        mutationFn: (data: AuthData) => registerUser(data),
    });
};

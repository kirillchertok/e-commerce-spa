import { useState } from 'react';

import { EMAIL_REGX } from '@/shared/constants/emailRegx';

import { useLoginMutation } from './useLoginMutation';

interface LoginFormData {
    email: string;
    password: string;
}

export const useLoginForm = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Partial<LoginFormData>>({});
    const [submitError, setSubmitError] = useState('');

    const loginMutation = useLoginMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof LoginFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined,
            }));
        }

        if (submitError) {
            setSubmitError('');
        }
    };

    const validate = (): boolean => {
        const newErrors: Partial<LoginFormData> = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!EMAIL_REGX.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Minimum 8 characters';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (onSuccess?: () => void) => {
        if (!validate()) {
            return;
        }

        try {
            setSubmitError('');

            await loginMutation.mutateAsync(formData);

            onSuccess?.();
        } catch (error) {
            console.error('Login failed:', error);

            setSubmitError('Invalid email or password');
        }
    };

    const handleReset = () => {
        setFormData({
            email: '',
            password: '',
        });

        setErrors({});
        setSubmitError('');
    };

    return {
        formData,
        errors,
        submitError,
        isLoading: loginMutation.isPending,
        handleChange,
        handleSubmit,
        handleReset,
    };
};

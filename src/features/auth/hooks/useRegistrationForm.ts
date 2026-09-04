import { useState } from 'react';

import { EMAIL_REGX } from '@/shared/constants/emailRegx';

import { useRegistrationMutation } from './useRegistrationMutation';

interface RegistrationFormData {
    email: string;
    password: string;
}

export const useRegistrationForm = () => {
    const [formData, setFormData] = useState<RegistrationFormData>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<Partial<RegistrationFormData>>({});
    const [submitError, setSubmitError] = useState('');
    const registrationMutation = useRegistrationMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof RegistrationFormData]) {
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
        const newErrors: Partial<RegistrationFormData> = {};

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

            await registrationMutation.mutateAsync(formData);

            onSuccess?.();
        } catch (error) {
            console.error('Registration failed:', error);

            setSubmitError('Registration failed');
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
        isLoading: registrationMutation.isPending,
        handleChange,
        handleSubmit,
        handleReset,
    };
};

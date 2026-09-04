import { useNavigate } from '@tanstack/react-router';

import { CrossIcon } from '@/shared/constants/icons';
import { Button } from '@/shared/ui/Button/Button';
import { BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/cva';
import { ErrorMessage } from '@/shared/ui/ErrorMessage/ErrorMessage';
import { INPUT_SIZE } from '@/shared/ui/Input/cva';
import { Input } from '@/shared/ui/Input/Input';
import { Link } from '@/shared/ui/Link/Link';

import { useLoginForm } from '../hooks/useLoginForm';

export const LoginForm = () => {
    const navigate = useNavigate();

    const { formData, errors, submitError, isLoading, handleChange, handleSubmit, handleReset } =
        useLoginForm();

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        await handleSubmit(() => {
            navigate({ to: '/' });
        });
    };

    return (
        <form
            onSubmit={onSubmit}
            className='w-full flex flex-col items-start gap-sm'
            noValidate
        >
            <div className='absolute top-[5%] left-[90%]'>
                <Button
                    variant={BUTTON_STYLE.ICON}
                    size={BUTTON_SIZE.DEFAULT}
                    type='button'
                    onClick={handleReset}
                    aria-label='Clear form'
                >
                    <CrossIcon />
                </Button>
            </div>

            <div className='w-full flex flex-col gap-xs'>
                <Input
                    type='email'
                    name='email'
                    size={INPUT_SIZE.FULL}
                    placeholder='Email...'
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={errors.email ? 'true' : 'false'}
                />

                {errors.email && <ErrorMessage message={errors.email} />}
            </div>

            <div className='w-full flex flex-col gap-xs'>
                <Input
                    type='password'
                    name='password'
                    size={INPUT_SIZE.FULL}
                    placeholder='Password...'
                    value={formData.password}
                    onChange={handleChange}
                    aria-invalid={errors.password ? 'true' : 'false'}
                />

                {errors.password && <ErrorMessage message={errors.password} />}
            </div>

            {submitError && <ErrorMessage message={submitError} />}

            <Button
                variant={BUTTON_STYLE.FIRST}
                size={BUTTON_SIZE.MEDIUM}
                type='submit'
                disabled={isLoading}
            >
                {isLoading ? 'Logging in...' : 'Login'}
            </Button>

            <span className='text-md'>
                Don&apos;t have an account?{' '}
                <Link
                    to='/auth'
                    search={{ tab: 'register' }}
                >
                    Register
                </Link>
            </span>
        </form>
    );
};

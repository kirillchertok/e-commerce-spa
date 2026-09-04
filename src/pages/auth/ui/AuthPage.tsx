import { LoginForm } from '@/features/auth/ui/LoginForm';
import { RegistrationForm } from '@/features/auth/ui/RegistrationForm';
import { Route } from '@/routes/auth';
import { capitalize } from '@/shared/utils/capitalize';

export const AuthPage = () => {
    const { tab } = Route.useSearch();

    return (
        <main className='w-screen h-screen flex flex-row justify-center items-center'>
            <section className='relative w-[25%] bg- border-sm border-gainsboro rounded-md p-lg flex flex-col items-start gap-sm'>
                <h1 className='text-2xl text-black'>{capitalize(tab)}</h1>
                {tab === 'login' ? <LoginForm /> : <RegistrationForm />}
            </section>
        </main>
    );
};

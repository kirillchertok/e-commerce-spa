import { capitalize } from '@/shared/utils/capitalize';

interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
    <span className='text-lg text-error truncate max-w-80'>{capitalize(message)}</span>
);

import { useNavigate } from '@tanstack/react-router';

interface ErrorDisplayProps {
    title: string;
    message?: string;
}

export function ErrorDisplay({ title, message }: ErrorDisplayProps) {
    const navigate = useNavigate();

    return (
        <main>
            <h1>{title}</h1>
            {message && <p>{message}</p>}
            <button
                type='button'
                onClick={() => navigate({ to: '/' })}
            >
                На главную
            </button>
        </main>
    );
}

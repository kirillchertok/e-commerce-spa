import { useNavigate } from '@tanstack/react-router';

import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

interface ErrorDisplayProps {
    title: string;
    message?: string;
}

export function ErrorDisplay({ title, message }: ErrorDisplayProps) {
    const navigate = useNavigate();
    const handleNavigateHome = () => navigate({ to: '/' });

    return (
        <main>
            <h1>{title}</h1>
            {message && <p>{message}</p>}
            <Button
                type='button'
                variant={BUTTON_STYLE.FIRST}
                size={BUTTON_SIZE.DEFAULT}
                onClick={handleNavigateHome}
            >
                На главную
            </Button>
        </main>
    );
}

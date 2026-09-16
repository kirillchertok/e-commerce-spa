import { useEffect, useRef } from 'react';

export const useChatAutoScroll = (dependency: unknown) => {
    const listRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [dependency]);

    return listRef;
};

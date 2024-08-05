import { useEffect, useCallback } from 'react';

export function useDebouncedResizeEffect(effect, delay) {
    const debouncedEffect = useCallback(debounce(effect, delay), [effect, delay]);

    useEffect(() => {
        window.addEventListener('resize', debouncedEffect);

        return () => {
            window.removeEventListener('resize', debouncedEffect);
        };
    }, [debouncedEffect]);
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

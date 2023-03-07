import { useState, useEffect, useCallback } from 'react';

export function useStringEmpty() : [boolean | null, any] {
    const [value, setValue] = useState<string | null>(null);
    const [isEmpty, setIsEmpty] = useState<boolean | null>(null);

    useEffect(() => {
        const isEmpty: boolean = typeof value === "string" && value.trim().length == 0;
        setIsEmpty(isEmpty);
    }, [value]);

    return [isEmpty, setValue];
}

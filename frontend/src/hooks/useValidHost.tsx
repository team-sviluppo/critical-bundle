import { useState, useEffect, useCallback } from 'react';

export function useValidHost() : [boolean | null, any] {
    const [host, setHost] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean | null>(null);

    useEffect(() => {
        const regex : RegExp = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
        setIsValid(regex.test(host))
    }, [host]);

    return [isValid, setHost];
}
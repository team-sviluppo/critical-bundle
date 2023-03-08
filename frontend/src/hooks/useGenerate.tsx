import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { IPayloadAPIInterface } from 'interfaces';

export function useGenerate() : [any, any, any] {
    const [payload, setPayload] = useState<IPayloadAPIInterface | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    //Fetching data from backend to search geometric data //
    const getApi = useCallback((payload: IPayloadAPIInterface) => {
        const url: string = `/generate`;
        axios.post(url, payload, {
            responseType: 'blob'
        }).then((response) => {
            setResponse(response.data);
        }).catch((error) => {
            setError(error.message);
        });
    }, []);

    useEffect(() => {
        if (!payload) return;
        getApi(payload);
    }, [payload]);

    return [response, error, setPayload];
}
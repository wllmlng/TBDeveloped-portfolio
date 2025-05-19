import {useEffect, useState} from 'react';

const useDebounce = (input: string, duration: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(input);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(input)
        }, duration)

        return () => {
            clearTimeout(timeout)
        }

    },[duration, input])

    return debouncedValue
}


export default useDebounce;
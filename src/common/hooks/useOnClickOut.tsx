//External Libraries
import { useEffect, useRef } from 'react';
//Api Calls

//Utils

//Hooks

//Components

//Types

//Constants

//Styles

//-----------------End Imports-----------------

interface Props {
    onClickOut: () => void;
 }

function useOnClickOut({ onClickOut }: Props) {
    const ref = useRef<HTMLDivElement | null>(null); 

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickOut(); 
            }
        };

        
        document.addEventListener('mousedown', handleClickOutside);
        
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClickOut]); 

    return ref; 
}

export default useOnClickOut;
import { useState } from "react";

//este es un custom hook y se usa en el componente CounterWithCustomHook del archivo CounterWithCustomHook.jsx, checarlo

//modificacion desde una rama creada llamada prueba
//modificacion desde prueba2

export const useCounter = (initialValue = 10) => {

    const [ counter, setCounter ] = useState(initialValue);

    const increment = ( value = 1 ) => {
        setCounter( counter + value );
    };

    const decrement = ( value = 1 ) => {
        if((counter - value) < 0) return;
        setCounter( counter - value );
    };

    const reset = () => {
        setCounter( initialValue );
    };


    return {
        counter,
        increment,
        decrement,
        reset
    };
};
import { useState } from "react";

//este es un custom hook que se usó en el archivo FormWithCustomHook.jsx, y tambien en el archivo TodoAdd.jsx

export const useForm = (initialForm = {}) => {

    const [ formState, setFormState ] = useState(initialForm);


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value 
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };


    return {
        ...formState,
        formState, //se puede retornar todo el objeto del formState y tambien retornar todos sus atributos como se hace en la anterior linea con los 3 puntos al principio, esto en un mismo objeto literal
        onInputChange,
        onResetForm
    };
}; 
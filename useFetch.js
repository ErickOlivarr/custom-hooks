import { useEffect, useState } from "react";

export const useFetch = (url) => {

    const [ state, setState ] = useState({
        data: null,
        isLoading: true,
        hasError: null
    });


    const getFetch = async () => {

        setState({ //NOTA: OJO que este useState renderizará de nuevo el componente MultipleCustomHooks que es donde se usó este custom hook de useFetch, osea se volverá a ejecutar el componente, pero eso no significa que entonces el codigo de esta funcion deje de ejecutarse, ya que continuará ejecutandose al mismo tiempo que se reiniciará el componente de MultipleCustomHooks, esto debido a la asincronía de javascript, y pues cuando se vuelva a ejecutar el componente de MultipleCustomHooks debido a este setState se volverá a llamar a este custom hook de useFetch, pero ya no se volverá a ejecutar esta funcion debido a que se le volverá a pasar la misma url, y pues tenemos abajo que el useEffect solo se ejecuta si hay un cambio en la url recibida en este custom hook, pero como se pasará la misma url desde el componente MultipleCustomHooks entonces esta funcion de getFetch ya no se volverá a ejecutar (si se volviera a ejecutar se crearía entonces un ciclo infinito, asi que cuidado con eso), y entonces solo quedaría que se termine de ejecutar el codigo de esta funcion
            ...state,
            isLoading: true
        });
        
        try {
            const resp = await fetch(url);
            const data = await resp.json();
            /* El data de la anterior linea trae arrays como el siguiente:
            [
                {
                    "quote": "Seriously? \"Hello Kitty\"?",
                    "author": "Jesse Pinkman"
                }
            ]
            */
    
            //con las siguientes 2 lineas se elimina los objetos repetidos en el array del data ya que la consulta del fetch de arriba como se vio arriba retorna un array de objetos, y esos objetos son de frases randoms con sus autores, entonces en caso que se retorne mas de 1 objeto en el array y como son randoms que se retorne objetos repetidos entonces con las siguientes 2 lineas nos aseguramos que no se repita ningun objeto en el array, esto usando el Set de javascript que funciona como el Set de java que no admite elementos repetidos en la lista, esto se vio en el curso 2 de javascript
            const setSinRepetidos = new Set(data);
            const arraySinRepetidos = Array.from(setSinRepetidos);
    
            setState({
                data: arraySinRepetidos,
                isLoading: false,
                hasError: null
            });
        }
        catch(error) { //en caso que haya habido un error en la peticion con el fetch del try
            setState({
                ...state,
                isLoading: false,
                hasError: error //aqui se pone un error
            });
        }
    };

    useEffect(() => {
        getFetch();
    }, [url]);


    return {
        ...state
    };
};
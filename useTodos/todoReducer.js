//ver el archivo TodoApp.jsx y el archivo useTodos.js que es donde se usa y explica esta funcion

export const todoReducer = (initialState = [], action) => {
    console.log(initialState);

    switch (action.type) {
        case '[TODO] Add Todo':
            //throw new Error('action.type = ABC no está implementado'); //si tenemos un case del switch que significa que es una accion que no queremso tener implementada entonces podríamos mandar un error con el throw new
            return [
                ...initialState,
                action.payload
            ];
        
        case '[TODO] Remove Todo':
            return initialState.filter(todo => todo.id !== action.payload); //para eliminar un elemento del array del initialState aqui no usamos el splice porque el splice modifica el array en sí en el cual se usa ese metodo de splice, pero en el archivo TodoApp, que es donde se usa esta funcion con el hook de useReducer, dijimos que con lso reducers nunca se debe mutar el estado, siempre se debe retornar una nueva instancia de ese estado ya con esa modificacion pero sin mutar el estado anterior que en este caso es el initialState, y el splice sí muta ese array, por eso aqui no se usó el splice y se usó el filter el cual retorna una nueva instancia de ese array ya con el filtro aplicado del filter

        case '[TODO] Toggle Todo':
            return initialState.map(todo => { //teniendo en cuenta lo que se explicó arriba con el filter, el metodo map de los array tambien retornan una nueva instancia del array, no modifica o muta el array sobre el cual se aplica este metodo de map que en este caos es el initialState, eso no lo muta, solo retorna un nuevo array con las modificaciones hechas por el map
                if(todo.id === action.payload) {
                    return {
                        ...todo,
                        done: !todo.done
                    };
                }

                return todo;
            });

        default:
            return initialState;
    }

};
import Context from "./Context";

import React from 'react';
import { useReducer } from "react";
import Reducer, {initState} from "./Reducer";

const Provider = ({children}) => {

    const [state, dispatch] = useReducer(Reducer, initState)

    return (
        <Context.Provider value = {[state, dispatch]}>
            {children}
        </Context.Provider>
    );
};

export default Provider;
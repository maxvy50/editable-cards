import React from "react";
import { Provider } from "react-redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { mybuhApi } from "../../shared/api/mockApi"

const store = configureStore({
    reducer: {
        [mybuhApi.reducerPath]: mybuhApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mybuhApi.middleware) 
})

export function withStore(component: () => React.ReactNode) {
    return () => (
        <Provider store={store}>
            {component()}
        </Provider>
    )
}
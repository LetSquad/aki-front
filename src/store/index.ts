import { configureStore } from "@reduxjs/toolkit";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import infoReducer from "./info/reducer";
import placeReducer from "./place/reducer";
import rentReducer from "./rent/reducer";
import rentSlotReducer from "./rentSlot/reducer";
import userReducer from "./user/reducer";

export const store = configureStore({
    reducer: {
        place: placeReducer,
        info: infoReducer,
        rent: rentReducer,
        rentSlot: rentSlotReducer,
        user: userReducer
    },
    devTools: process.env.NODE_ENV !== "production",
    // eslint-disable-next-line unicorn/prefer-spread
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([promise, thunk])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

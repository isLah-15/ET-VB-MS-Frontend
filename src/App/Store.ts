import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { userAPI } from '../Features/Auth/UserAPI'
import { loginAPI } from '../Features/Auth/LoginAPI'
import UserSlice from '../Features/Auth/UserSlice'
import { eventAPI } from '../Features/Events/EventAPI'
import { bookingAPI } from '../Features/Booking/BookingAPI'
import { paymentAPI } from '../Features/Payment/PaymentAPI'
import { customerSupportAPI } from '../Features/Support/SupportAPI'
import { venueAPI } from '../Features/Venue/VenueAPI'




const persistConfig = {
    key: 'root', //storage key for the persisted state
    version: 1, //version of the persisted state
    storage, // storage engine to use (localStorage in this case)
    whitelist: ['user'] // Only persist the user slice - this means only the user state will be saved in local storage
}

// a reducer is a function that takes the current state and an action, and returns a new state i.e for user, usersAPI, loginAPI

const rootReducer = combineReducers({ //combining all reducers into one root reducer
    [userAPI.reducerPath]: userAPI.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [eventAPI.reducerPath]: eventAPI.reducer,
    [bookingAPI.reducerPath]: bookingAPI.reducer,
    [paymentAPI.reducerPath]: paymentAPI.reducer,
    [customerSupportAPI.reducerPath]: customerSupportAPI.reducer,
    [venueAPI.reducerPath]: venueAPI.reducer,
    user: UserSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer) // warap combined redicers with persistReducer to enable persistence in local storage 

export const store = configureStore({
    reducer: persistedReducer, // create store with the persisted reducer

    //The reason we need to add the middleware is because the RTK Query APIs (usersAPI and loginAPI) use middleware to handle caching, invalidation, polling, and other features.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false // disable serializable check for the persisted state - A serializable value is a value that can be converted to JSON and back without losing information. Its desabled here because the RTK Query APIs use non-serializable values (like functions) in their state.
    })
        .concat(userAPI.middleware) // add the usersAPI middleware to the store - helps with caching, invalidation, polling, and other features
        .concat(loginAPI.middleware)
        .concat(eventAPI.middleware)
        .concat(bookingAPI.middleware)
        .concat(paymentAPI.middleware)
        .concat(customerSupportAPI.middleware)
        .concat(venueAPI.middleware)
        // .concat(carApi.middleware) // add the CarAPI middleware

})

export const persistedStore = persistStore(store) // needed for persisting the store to local storage
export type RootState = ReturnType<typeof store.getState> // RootState is the type of the entire state tree in the store - TS support

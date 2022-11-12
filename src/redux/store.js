import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import contactReducer from 'redux/contacts-slice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import filterReducer from 'redux/filter-slice';

const contactsPersistConfig = {
    key: 'root',
    storage, 
}

const reducer = combineReducers({contacts: contactReducer});

const persistedContactsReducer = persistReducer(contactsPersistConfig, reducer); 


export const store = configureStore({
    reducer: {
        contacts: persistedContactsReducer,
        filter: filterReducer,
  },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);

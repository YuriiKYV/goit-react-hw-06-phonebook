import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const contactsSlice = createSlice({
    name: "contacts",
    initialState: [],
    reducers: {
        addedContact: {
            reducer: (store, { payload }) => {
                store.push(payload);
            },
            prepare: (data) => {
                return {
                    payload: {
                        ...data,
                        id: nanoid()
                    }
                }
            }
        },
        removedContact: (store, {payload}) => store.filter(({id}) => id !== payload)
    }
}) 

export const { addedContact, removedContact } = contactsSlice.actions;
export default contactsSlice.reducer;
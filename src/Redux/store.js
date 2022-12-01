import { configureStore } from '@reduxjs/toolkit'
import InsightSlice from './InsightSlice/InsightSlice';

export const store = configureStore({
    reducer: {
        Insight: InsightSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

import { configureStore } from '@reduxjs/toolkit'
import InsightSlice from './InsightSlice/InsightSlice';
import ReportSlice from './ReportsSlice/ReportSlice';

export const store = configureStore({
    reducer: {
        Insight: InsightSlice,
        Reports: ReportSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

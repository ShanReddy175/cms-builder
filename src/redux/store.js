import { configureStore } from "@reduxjs/toolkit";
import ruler from "./slices/ruler";
import pageJson from "./slices/pageJson";
import emptySection from "./slices/emptySection";


export const store = configureStore({
    reducer: {
        ruler: ruler,
        pageJson: pageJson,
        emptySection: emptySection
    }
})
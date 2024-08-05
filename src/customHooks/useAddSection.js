import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageJson } from "../redux/slices/pageJson";

export default function useAddSection(){
    const pageJson = useSelector(state => state.pageJson);
    const dispatch = useDispatch();

    const addSection = (key, value) => {
        dispatch(
            setPageJson({
                ...pageJson,
                page: {
                    ...pageJson.page,
                    body: {
                        ...pageJson.page.body,
                        [key]: {...value}
                    }
                }
            })
        )
    }

    return addSection;
}
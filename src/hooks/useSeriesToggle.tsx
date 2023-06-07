/* eslint-disable react-hooks/rules-of-hooks */

// lib
import {z} from "zod";
import type { Dispatch, SetStateAction } from "react";
import { useState, useCallback } from "react";

const propSchema = z.object({
    initialStates: z.array(z.boolean().default(false)).min(2)
});

type toggleArrType = readonly [boolean, () => void, Dispatch<SetStateAction<boolean>>];

const useSeriesToggle = ({ initialStates }: z.infer<typeof propSchema>): readonly toggleArrType[] => {
  const toggleArr: toggleArrType[] = [];

    for(let i=0; i<initialStates.length; i++){
        const [componentState, setComponentState]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(initialStates[i]);
        const Toggle = useCallback(() => setComponentState(!componentState), [componentState]);
        toggleArr.push([componentState, Toggle, setComponentState] as const)
    }

    return toggleArr;
}

export default useSeriesToggle
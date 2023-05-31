import {z} from "zod";
import type {Dispatch, SetStateAction} from 'react';
import { useCallback, useState } from 'react';

const paramSchema = z.boolean().default(false);

const useToggle = (initialState: z.infer<typeof paramSchema>) => {
    const [componentState, setComponentState]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(initialState);
  
    const Toggle = useCallback(() => setComponentState(!componentState), [componentState]);

    return [componentState, Toggle, setComponentState] as const;
}

export default useToggle;
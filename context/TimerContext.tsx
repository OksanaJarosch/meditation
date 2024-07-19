import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface TimerContextType {
    duration: number;
    setDuration: Dispatch<SetStateAction<number>>
}

interface TimerProviderProps {
    children: ReactNode;
}


export const TimerContext = createContext<TimerContextType>({
    duration: 10,
    setDuration: () => {},
})

const TimerProvider = ({children}: TimerProviderProps) => {
    const [duration, setDuration] = useState(10);

    return(
        <TimerContext.Provider value={{duration, setDuration}}>
            {children}
        </TimerContext.Provider>
    )
}

export default TimerProvider;
import { Dispatch, SetStateAction, createContext } from "react";

type ThemeContextType = {
    darkMode: boolean,
    setDarkMode: Dispatch<SetStateAction<boolean>>
}

const ThemeContext = createContext<ThemeContextType>({
    darkMode: false,
    setDarkMode: ()=> null
})

export default ThemeContext;
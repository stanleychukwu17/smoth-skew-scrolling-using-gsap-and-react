import { useEffect, useState } from "react"

interface windowDetails {
    width: number;
    height: number;
}
// 
const getWindowSize = (): windowDetails => {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}

export default function useWindowSize(): windowDetails {
    const [windowSize, setWindowSize] = useState<windowDetails>(getWindowSize())

    // this useEffect tracks the changes to the window size
    useEffect(() => {
        const updateWindowSize = () => {
            setWindowSize(getWindowSize())
        }

        // adds the event listener on page load and removes the event listener when the component unMounts
        window.addEventListener('resize', updateWindowSize)
        return () => window.removeEventListener('resize', updateWindowSize)
    }, [])

    return windowSize
}
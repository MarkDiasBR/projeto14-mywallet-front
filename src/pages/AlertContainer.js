import { useState, useEffect } from "react";

export default function AlertContainer({ children, state }) {
    const [visivel, setVisivel] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setVisivel(false);
        }, 100000);
    }, [visivel])

    return (
        visivel &&
        <>
            {children}
        </>
    )
}
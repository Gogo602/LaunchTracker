import { useEffect, useState } from "react"


const useFetch = (url) => {
    const [launches, setLaunches] = useState([20])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch Data")
                }
                return res.json()
            })
            .then((launches) => {
                setLaunches(launches)
                console.log(launches)
                setLoading(false)
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false)
        })
    }, [url])

    return launches;
}

export default useFetch;
import useFetch from "../hooks/useFetch";



export default function LaunTracker(){
    const [launches, error, loading] = useFetch('https://api.spacexdata.com/v4/launches')
    

    return (
        <div className="px-5 py-10">
            <h1>Space-X-Launchers</h1>
            {loading && (
                <p>Loading......</p>
            )}
            <ul className="">
                {launches && 
                launches.map((item, index) => {
                return (
                <li key={index} className="py-5">
                    <h2>{item.name}</h2>
                    <p>Date {new Date(item.date_utc).toLocaleDateString()}</p>
                    <p>Launch Site: {item.launchpad}</p>
                    <p>Details{item.details ? item.details : "No Details of this Launch"}</p>
                    {item.links?.webcast && (  
                        <a href={item.links.webcast} target="_blank" rel="noopener noreferrer">Watch Launch</a>
                    )}
                </li>
                )
                }) 
            }
            </ul>
            {error && (
                <p>Error: {error}</p>
            )}
            
        </div>
    )
} 
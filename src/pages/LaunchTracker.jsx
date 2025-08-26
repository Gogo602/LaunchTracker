import { useState } from "react";
import useFetch from "../hooks/useFetch";


export default function LaunTracker(){
    const [launches, error, loading] = useFetch('https://api.spacexdata.com/v4/launches')
    const [currentPage, setCurrentPage] = useState(1)
    const launchesPerPage = 10

    const indexOfLastLaunch = currentPage * launchesPerPage
    const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage
    const currentLaunches = launches.slice(indexOfFirstLaunch, indexOfLastLaunch)
    const totalPages = Math.ceil(launches.length / launchesPerPage)

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber)
        window.scrollTo({
            top: 0,
            behaviour: "smooth"
        })
    }

    return (
        <div className="w-full flex items-center justify-center py-10 px-5">
            <div className="space-y-5">
                <h1 className="text-4xl font-bold">Space-X-Launchers</h1>
                <p>
                    {loading && (
                        <p>Loading......</p>
                    )}
                </p>
                <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {currentLaunches.map((item, index) => {
                    return (
                        <li key={index} className="p-3 rounded-md shadow-gray-200 bg-gray-200 shadow-md">
                        {item.links?.patch.small && ( 
                            <img src={item.links.patch.small} alt="rocket_img" className="mx-auto py-2"/>
                        )}
                        <h2 className="text-center text-2xl font-bold">{item.name}</h2>
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
                {/* Pagination */}
                <div className="flex items-center justify-center">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handleClick(pageNumber)}
                            disabled={pageNumber === currentPage}
                            className="border border-e-amber-700 px-2 py-1 mx-2"
                        >{pageNumber}</button>
                    ))}
                </div>
                {error && (
                    <p>Error: {error}</p>
                )}
            </div>
        </div>
    )
} 
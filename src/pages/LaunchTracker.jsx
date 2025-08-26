import { useState } from "react";
import useFetch from "../hooks/useFetch";


export default function LaunTracker(){
    const [launches, error, loading] = useFetch('https://api.spacexdata.com/v4/launches')
    const [isActive, setIsActive] = useState(false)
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
            behavior: "smooth"
        })
    }

    // active and inactive classes for pagination buttons
    const active = "bg-blue-500 border border-e-amber-700 px-2 py-1 mx-2"
    const inActive = "bg-gray-500 hover:bg-blue-300 border border-e-amber-700 px-2 py-1 mx-2"

    const handleActive = () => {
        setIsActive(!isActive)
    }

    return (
        <div className="w-full flex items-center justify-center py-10 px-5">
            <div className="space-y-5">
                <h1 className="text-4xl font-bold">Space-X-Launchers</h1>
                    {loading ? (
                        <p className="flex items-center justify-center h-[80vh]">Loading......</p>
                    ) : (
                        <div>
                            <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 mb-5">
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
                                        onClick={() => { handleClick(pageNumber); handleActive(pageNumber); }}
                                        disabled={pageNumber === currentPage}
                                        className={pageNumber === currentPage ? active : inActive}
                                    >{pageNumber}</button>
                                ))}
                            </div>
                        </div> 
                    )}
                {error && (
                    <p>Error: {error}</p>
                )}
            </div>
        </div>
    )
} 
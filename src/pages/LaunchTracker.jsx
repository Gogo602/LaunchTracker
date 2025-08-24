import useFetch from "../hooks/useFetch";



export default function LaunTracker(){
        const launches = useFetch('https://api.spacexdata.com/v4/launches')

    return (
        <div>
            {launches && 
                launches.map((item) => {
                return (
                <div key={item.id}>
                    <p>Details</p>
                    <p>{item.details}</p>
                </div>
                )
                }) 
            }
            
        </div>
    )
} 
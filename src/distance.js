export default function Distance({ leg }) {
    if(!leg.distance || !leg.duration) return null;

    return (
        <div>
            <p>
                This resturant is <span className = "highlight">{leg.distance.text}</span> away 
                from your current location. Estimated travel time : <span className = "highlight">{leg.duration.text}</span>
            </p>
        </div>
    )
}

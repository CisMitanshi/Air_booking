import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const FlightDetails = ({ flightData, loaderFlight }) => {
    const [data, setData] = useState(null)
    const userLoggedIn = localStorage.getItem("user");

    const nav = useNavigate()

    useEffect(() => {
        if (flightData) {
            setData(flightData)
        }
    }, [flightData])


    // Function for update flight info data
    const onbook = (price) => {
        const flightInfo = JSON.parse(localStorage.getItem("flightInfo"))
        flightInfo.price = price
        localStorage.setItem("flightInfo", JSON.stringify(flightInfo));
        nav("/book")
    }

    return (
        <div>
            <section id="theme_search_form " className="top-serch mt-10">
                <div className="container">
                    <div className="row">
                        {data?.length > 0 ? (
                            data?.map((items, index) => (
                                <div className="col-12" key={index}>
                                    <div className="theme_search_form_area mt-4 mb-4">
                                        <div className="flight_search_item_wrappper">
                                            <div className="flight_search_items">
                                                <div className="multi_city_flight_lists">
                                                    <div className="flight_multis_area_wrapper">
                                                        <div className="flight_search_left">
                                                            <div className="flight_logo">
                                                            </div>
                                                            <div className="flight_search_destination">
                                                                <p>From</p>
                                                                <h3>{items?.itineraries[0]?.segments[0]?.departure?.iataCode}</h3>
                                                                <h6>
                                                                    {items?.itineraries[0]?.segments[0]?.departure?.at && (
                                                                        <>
                                                                            {new Date(items?.itineraries[0].segments[0].departure.at).toLocaleDateString()} {' '}
                                                                            -- {new Date(items?.itineraries[0].segments[0].departure.at).getHours()}:
                                                                            {new Date(items?.itineraries[0].segments[0].departure.at).getMinutes()}
                                                                        </>
                                                                    )}
                                                                </h6>

                                                            </div>
                                                        </div>
                                                        <div className="flight_search_middel">
                                                            <div className="flight_right_arrow">
                                                                <img src="assets/img/icon/right_arrow.png" alt="icon" />
                                                                <h6>Non-stop</h6>
                                                                <p>{items?.itineraries[0]?.duration}</p>
                                                            </div>
                                                            <div className="flight_search_destination">
                                                                <p>To</p>
                                                                {
                                                                    items?.itineraries[0].segments?.length > 1 ? (
                                                                        <>
                                                                            <h3>{items?.itineraries[0]?.segments[1]?.arrival.iataCode}</h3>
                                                                            <h6>
                                                                                {items?.itineraries[0]?.segments[1]?.arrival?.at && (
                                                                                    <>
                                                                                        {new Date(items?.itineraries[0].segments[1]?.arrival.at).toLocaleDateString()} {' '}
                                                                                        -- {new Date(items?.itineraries[0].segments[1]?.arrival.at).getHours()}:
                                                                                        {new Date(items?.itineraries[0].segments[1]?.arrival.at).getMinutes()}
                                                                                    </>
                                                                                )}
                                                                            </h6>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <h3>{items?.itineraries[0]?.segments[0]?.arrival.iataCode}</h3>
                                                                            <h6>
                                                                                {items?.itineraries[0]?.segments[0]?.arrival?.at && (
                                                                                    <>
                                                                                        {new Date(items?.itineraries[0].segments[0]?.arrival.at).toLocaleDateString()} {' '}
                                                                                        -- {new Date(items?.itineraries[0].segments[0]?.arrival.at).getHours()}:
                                                                                        {new Date(items?.itineraries[0].segments[0]?.arrival.at).getMinutes()}
                                                                                    </>
                                                                                )}
                                                                            </h6>
                                                                        </>
                                                                    )
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flight_search_right">
                                                    <h5>Seat Avaiable : {items?.numberOfBookableSeats}</h5>
                                                    <h2>{items?.price.currency} {items?.price.base}</h2>
                                                    {userLoggedIn?.length > 0 ? <button onClick={() => { onbook(items?.price.base) }} className='btn btn_theme btn_md mt-2' >  Book Now</button> : <Link to="/login" >Login to Book</Link>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                {loaderFlight && (
                                    <div className="theme_search_form_area mt-4 mb-4">
                                        <div className="flight_search_item_wrappper">
                                            <div className="flight_search_items">
                                                <span className="p-4">No flights found</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FlightDetails
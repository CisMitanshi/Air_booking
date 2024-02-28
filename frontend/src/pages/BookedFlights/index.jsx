
import React, { useEffect, useState } from 'react'
import Header from '../../components/header'
import axios from 'axios';

const BookedFlight = () => {

    const [data, setData] = useState([])

    // Function for getting booked ticket data	
    useEffect(() => {
        const getUrl = 'http://localhost:8000/flight-booking/'
        axios.get(getUrl)
            .then(response => {
                console.log('response flight', response.data);
                setData(response.data)
            })
            .catch(error => {
                console.error('Error posting data:', error);
            });
    }, [])
    return (
        <div>
            <div className="font-sans text-gray-900 antialiased">
                <Header />
                <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
                    <div className="main-responsive-nav">
                        <div className="container">
                            <div className="main-responsive-menu">
                                <div className="logo">
                                    <a href="index.html">
                                        <img src="assets/img/logo.png" alt="logo" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="dashboard_common_table">
                            <h3>Flight booking</h3>
                            <div className="table-responsive-lg table_common_area">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Sl no.</th>
                                            <th>Booking ID</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Booking type</th>
                                            <th>Booking amount</th>
                                            <th>Departing From</th>
                                            <th>Destination</th>
                                            <th>Departure Date</th>
                                            <th>adult</th>
                                            <th>children</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index}.</td>
                                                <td>#JK589V80{index}</td>
                                                <td>{item?.first_name}</td>
                                                <td>{item?.last_name}</td>
                                                <td>{item.flight_type}</td>
                                                <td>{item.flight_price}</td>
                                                <td>{item.departing_from}</td>
                                                <td>{item.destination}</td>
                                                <td>{item.departure_date}</td>
                                                <td>{item.adult}</td>
                                                <td>{item.children}</td>
                                                <td className="complete">Completed</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookedFlight

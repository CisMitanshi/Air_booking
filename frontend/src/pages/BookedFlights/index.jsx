
import React, { useEffect, useState } from 'react'
import Header from '../../components/header'
import axios from 'axios';

const BookedFlight = () => {

    const [data, setData] = useState([])

    // Function for getting booked ticket data	
    useEffect(() => {
        const getUrl = 'http://192.168.1.98:8000/flight-booking/'
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
                                            <th>Booking type</th>
                                            <th>Booking amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index}.</td>
                                                <td>#JK589V80{index}</td>
                                                <td>{item.flight_type}</td>
                                                <td>{item.flight_price}</td>
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

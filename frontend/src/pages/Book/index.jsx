import React from 'react'
import { useState } from 'react';
import Header from '../../components/header';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Book = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const flight = JSON.parse(localStorage.getItem("flightInfo"))
    const navigate = useNavigate()


    // Initialize form for first time render
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: user.user_data.email || '',
        phone_number: "",
        address: "",
        city: "",
        country: "",
        user_id: user.user_id || '',
        flight_type: flight.cabinClass || '',
        departure_date: flight.journeyDate || '',
        departing_from: flight.fromLocation || '',
        destination: flight.toLocation || '',
        flight_price: flight.price || '',
        children: flight.childCount || '0',
        adult: flight.adultCount || '0',
        infants: flight.infantCount || '0'

    });
    const [errors, setErrors] = useState({});

    // Function to handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Function to validate form inputs
    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name) {
            newErrors.first_name = "First Name is required";
        }
        if (!formData.last_name) {
            newErrors.last_name = "Last Name is required";
        }
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }
        if (!formData.phone_number) {
            newErrors.phone_number = "Phone Number is required";
        }
        if (!formData.address) {
            newErrors.address = "Address is required";
        }
        if (!formData.city) {
            newErrors.city = "City is required";
        }
        if (!formData.country) {
            newErrors.country = "Country is required";
        }
        if (!formData.user_id) {
            newErrors.user_id = "User ID is required";
        }
        if (!formData.flight_type) {
            newErrors.flight_type = "Flight Type is required";
        }
        if (!formData.departure_date) {
            newErrors.departure_date = "Departure Date is required";
        }
        if (!formData.departing_from) {
            newErrors.departing_from = "Departing From is required";
        }
        if (!formData.destination) {
            newErrors.destination = "Destination is required";
        }
        if (!formData.flight_price) {
            newErrors.flight_price = "Flight Price is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted with values:", formData);
        if (validateForm()) {
            const postUrl = 'http://localhost:8000/flight-booking/'
            axios.post(postUrl, formData)
                .then(response => {
                    console.log('response flight', response.data);
                    setFormData({})
                    navigate('/booked')

                })
                .catch(error => {
                    console.error('Error posting data:', error);
                });
        } else {
            // Form validation failed, do something (e.g., display errors)
            console.log("Form validation failed");
        }
    };

    return (
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
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <form onSubmit={handleSubmit}>

                        <div className="py-8">
                            <center>
                                <span className="text-2xl font-semibold">Flight Book Form</span>
                            </center>
                        </div>

                        <div>
                            <label className="block font-medium text-sm text-gray-700" htmlFor="first_name">First Name</label>
                            <input
                                type='text'
                                name='first_name'
                                value={formData.first_name}
                                onChange={(e) => handleInputChange(e)}
                                placeholder='First Name'
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                            />
                            {errors.first_name && <div className="error text-red">{errors.first_name}</div>}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-gray-700" htmlFor="last_name">Last Name</label>
                            <input
                                type='text'
                                name='last_name'
                                value={formData.last_name}
                                onChange={(e) => handleInputChange(e)}
                                placeholder='Last Name'
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                            />
                            {errors.last_name && <div className="error text-red">{errors.last_name}</div>}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-gray-700" htmlFor="email">Email</label>
                            <input
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={(e) => handleInputChange(e)}
                                placeholder='Email'
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                            />
                            {errors.email && <div className="error text-red">{errors.email}</div>}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-gray-700" htmlFor="phone_number">Phone Number</label>
                            <input
                                type='text'
                                name='phone_number'
                                value={formData.phone_number}
                                onChange={(e) => handleInputChange(e)}
                                placeholder='Phone Number'
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                            />
                            {errors.phone_number && <div className="error text-red">{errors.phone_number}</div>}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-gray-700" htmlFor="address">Address</label>
                            <input
                                type='text'
                                name='address'
                                value={formData.address}
                                onChange={(e) => handleInputChange(e)}
                                placeholder='Address'
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                            />
                            {errors.address && <div className="error text-red">{errors.address}</div>}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-gray-700" htmlFor="city">City</label>
                            <input
                                type='text'
                                name='city'
                                value={formData.city}
                                onChange={(e) => handleInputChange(e)}
                                placeholder='City'
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                            />
                            {errors.city && <div className="error text-red">{errors.city}</div>}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-gray-700" htmlFor="country">Country</label>
                            <input
                                type='text'
                                name='country'
                                value={formData.country}
                                onChange={(e) => handleInputChange(e)}
                                placeholder='Country'
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                            />
                            {errors.country && <div className="error text-red">{errors.country}</div>}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-gray-700" htmlFor="user_id">User ID</label>
                            <input
                                type='text'
                                name='user_id'
                                value={formData.user_id}
                                onChange={(e) => handleInputChange(e)}
                                placeholder='User ID'
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                            />
                            {errors.user_id && <div className="error text-red">{errors.user_id}</div>}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-gray-700" htmlFor="flight_type">Flight Type</label>
                            <input
                                type='text'
                                name='flight_type'
                                value={formData.flight_type}
                                onChange={(e) => handleInputChange(e)}
                                placeholder='Flight Type'
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                            />
                            {errors.flight_type && <div className="error text-red">{errors.flight_type}</div>}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-gray-700" htmlFor="departure_date">Departure Date</label>
                            <input
                                type='date'
                                name='departure_date'
                                value={formData.departure_date}
                                onChange={(e) => handleInputChange(e)}
                                placeholder='Departure Date'
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                            />
                            {errors.departure_date && <div className="error text-red">{errors.departure_date}</div>}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-gray-700" htmlFor="departing_from">Departing From</label>
                            <input
                                type='text'
                                name='departing_from'
                                value={formData.departing_from}
                                onChange={(e) => handleInputChange(e)}
                                placeholder='Departing From'
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                            />
                            {errors.departing_from && <div className="error text-red">{errors.departing_from}</div>}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-gray-700" htmlFor="destination">Destination</label>
                            <input
                                type='text'
                                name='destination'
                                value={formData.destination}
                                onChange={(e) => handleInputChange(e)}
                                placeholder='Destination'
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                            />
                            {errors.destination && <div className="error text-red">{errors.destination}</div>}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-gray-700" htmlFor="flight_price">Flight Price</label>
                            <input
                                type='text'
                                name='flight_price'
                                value={formData.flight_price}
                                onChange={(e) => handleInputChange(e)}
                                placeholder='Flight Price'
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                            />
                            {errors.flight_price && <div className="error text-red">{errors.flight_price}</div>}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-gray-700" htmlFor="flight_price">children</label>
                            <input
                                type='text'
                                name='children'
                                value={formData.children}
                                onChange={(e) => handleInputChange(e)}
                                placeholder='children'
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                            />
                            {errors.children && <div className="error text-red">{errors.children}</div>}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-gray-700" htmlFor="flight_price">Adult</label>
                            <input
                                type='text'
                                name='adult'
                                value={formData.adult}
                                onChange={(e) => handleInputChange(e)}
                                placeholder='adult'
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                            />
                            {errors.adult && <div className="error text-red">{errors.adult}</div>}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-gray-700" htmlFor="flight_price">Infants</label>
                            <input
                                type='text'
                                name='infants'
                                value={formData.infants}
                                onChange={(e) => handleInputChange(e)}
                                placeholder='Infants'
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                            />
                            {errors.infants && <div className="error text-red">{errors.infants}</div>}
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <button
                                type="submit"
                                className="sing-btn ms-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Book
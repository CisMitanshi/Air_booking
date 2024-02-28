import React, { useEffect, useState } from "react";
import { ProgressBar } from 'react-loader-spinner'
import { Link } from "react-router-dom";
import Header from "../../components/header";
import axios from 'axios';
import Select from 'react-select';
import './style.css'
import FlightDetails from "../../components/FlightDetails";


const apiKey = process.env.REACT_APP_SEARCH_KEY

const Home = () => {
	const [flightData, setflightData] = useState(null);
	const [toLocation, setToLocation] = useState('')
	const [fromLocation, setFromLocation] = useState('')
	const [journeyDate, setJourneyDat] = useState('28-02-2024')
	const [returnDate, setReturnDat] = useState('29-02-2024')
	const [adultCount, setAdultCount] = useState(2);
	const [childCount, setChildCount] = useState(0);
	const [infantCount, setInfantCount] = useState(0);
	const [cabinClass, setCabinClass] = useState('Business');
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [passanger, setPassanger] = useState('')
	const [activeTab, setActiveTab] = useState('oneWay')
	const [selectedOption, setSelectedOption] = useState(null);
	const [selectedOptionToLocation, setselectedOptionToLocation] = useState(null);
	const [options, setOptions] = useState([])
	const [loading, setLoading] = useState(false)
	const [optionsToLocation, setOptionsToLocation] = useState([])


	// Function for toggle dropdown	
	const toggleDropdown = () => {
		setDropdownOpen((prev) => !prev);

	};

	useEffect(() => {
		if (selectedOption && selectedOption !== null) {
			setFromLocation(selectedOption?.code)
		}
	}, [selectedOption])

	useEffect(() => {
		if (selectedOptionToLocation && selectedOptionToLocation !== null) {
			setToLocation(selectedOptionToLocation?.code)
		}

	}, [selectedOptionToLocation])



	 // Function for seach flight
	const serachFlight = () => {
		setLoading(true)
		const dataInfo = {
			fromLocation:fromLocation,
			toLocation:toLocation,
			journeyDate:journeyDate,
			cabinClass:cabinClass,
			childCount:childCount,
			infantCount:infantCount,
			adultCount:adultCount
		}
		localStorage.setItem("flightInfo",JSON.stringify(dataInfo))
		let getUrl = ''

		if (activeTab === 'oneWay') {
			getUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${fromLocation}&destinationLocationCode=${toLocation}&departureDate=${journeyDate}&adults=${adultCount}&nonStop=false&max=250`
		}

		if (activeTab === 'Roundtrip') {
			getUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${fromLocation}&destinationLocationCode=${toLocation}&departureDate=${journeyDate}&returnDate=${returnDate}&adults=${adultCount}&nonStop=false&max=250`
		}
		axios.get(getUrl, {
			headers: {
				'Authorization': `Bearer ${apiKey}`,
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				console.log('Response: search data', response.data.data);
				setflightData(response.data.data)
				setLoading(false)

			})
			.catch(error => {
				console.error('Error:', error);
				setLoading(false)
			});
	}

	// Function for create label and value for render on dropdown	
	const debounce = (func, delay) => {
		let timerId;
		return function (...args) {
			if (timerId) {
				clearTimeout(timerId);
			}
			timerId = setTimeout(() => {
				func(...args);
			}, delay);
		};
	};

	// Function for seach city and airport name code
	const onHandlerFromLocation = debounce((event) => {
		if (event) {
			const getUrl = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${event}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`
			axios.get(getUrl, {
				headers: {
					'Authorization': `Bearer ${apiKey}`,
					'Content-Type': 'application/json'
				}
			})
				.then(response => {
					console.log('Response:', response.data.data);
					let temp = response.data.data.map((items) => {
						return { 'value': items.address.cityName, 'label': items.address.cityName, 'code': items.address.cityCode }
					})
					setOptions(temp)
				})
				.catch(error => {
					console.error('Error:', error);
				});
		}
		return options
	}, 300)

	// Function for seach city and airport name code
	const onHandlerToLocation = debounce((event) => {
		if (event) {
			const getUrl = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${event}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`
			axios.get(getUrl, {
				headers: {
					'Authorization': `Bearer ${apiKey}`,
					'Content-Type': 'application/json'
				}
			})
				.then(response => {
					console.log('Response:', response.data.data);
					let temp = response.data.data.map((items) => {
						if (items.address.cityCode !== fromLocation) {
							return { 'value': items.address.cityName, 'label': items.address.cityName, 'code': items.address.cityCode }
						}
						else {
							return {
								'value': '',
								'label': '',
								'code': ''
							}
						}
					})
					setOptionsToLocation(temp)
				})
				.catch(error => {
					console.error('Error:', error);
				});
		}
		return options
	}, 300)

	const handlerTab = (tab) => {
		setActiveTab(tab)
	}
	return (
		<>
			<Header />
			<section id="theme_search_form" className="top-serch">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="theme_search_form_area">
								<div className="theme_search_form_tabbtn">
									<ul className="nav nav-tabs" role="tablist">
										<li className="nav-item" role="presentation">
											<button className="nav-link active" id="flights-tab" data-bs-toggle="tab"
												data-bs-target="#flights" type="button" role="tab" aria-controls="flights"
												aria-selected="true"><i className="fas fa-plane-departure"></i>Flights</button>
										</li>
									</ul>
								</div>
								<div className="tab-content" id="myTabContent">
									<div className="tab-pane fade show active" id="flights" role="tabpanel"
										aria-labelledby="flights-tab">
										<div className="row">
											<div className="col-lg-12">
												<div className="flight_categories_search">
													<ul className="nav nav-tabs" role="tablist">
														<li className="nav-item" role="presentation">
															<button className={activeTab !== "Roundtrip" ? 'nav-link active' : 'nav-link'} id="oneway-tab" data-bs-toggle="tab"
																onClick={() => handlerTab('oneWay')}
																data-bs-target="#oneway_flight" type="button" role="tab"
																aria-controls="oneway_flight" aria-selected="true">One Way</button>
														</li>
														<li className="nav-item" role="presentation">
															<button className={activeTab === "Roundtrip" ? 'nav-link active' : 'nav-link'} id="roundtrip-tab" data-bs-toggle="tab"
																data-bs-target="#roundtrip" type="button" role="tab"
																onClick={() => handlerTab('Roundtrip')}
																aria-controls="roundtrip"
																aria-selected="false">Roundtrip</button>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="tab-content" id="myTabContent1">
											<div className="tab-pane fade show active" id="oneway_flight" role="tabpanel"
												aria-labelledby="oneway-tab">
												<div className="row">
													<div className="col-lg-12">
														<div className="oneway_search_form">
															<form action="#!">
																<div className="row">
																	<div className="col-lg-3 col-md-6 col-sm-12 col-12">
																		<div className="flight_Search_boxed">
																			<p>From</p>
																			<Select
																				className="select-clas mt-4"
																				defaultValue={selectedOption}
																				onChange={setSelectedOption}
																				onInputChange={(e) => {
																					onHandlerFromLocation(e);
																				}}
																				options={options}
																			/>
																			<div className="plan_icon_posation">
																				<i className="fas fa-plane-departure"></i>
																			</div>
																		</div>
																	</div>
																	<div className="col-lg-3 col-md-6 col-sm-12 col-12">
																		<div className="flight_Search_boxed">
																			<p>To</p>
																			<Select
																				className="select-clas mt-4"
																				defaultValue={selectedOptionToLocation}
																				onChange={setselectedOptionToLocation}
																				onInputChange={(e) => {
																					onHandlerToLocation(e);
																				}}
																				options={optionsToLocation}
																			/>
																			<div className="plan_icon_posation">
																				<i className="fas fa-plane-arrival"></i>
																			</div>
																			<div className="range_plan">
																				<i className="fas fa-exchange-alt"></i>
																			</div>
																		</div>
																	</div>
																	<div className="col-lg-4  col-md-6 col-sm-12 col-12">
																		<div className="form_search_date">
																			<div className="flight_Search_boxed date_flex_area">
																				<div className="Journey_date">
																					<p>Journey date</p>
																					<input type="date" value={journeyDate} onChange={(e) => setJourneyDat(e.target.value)} />
																					<span>{journeyDate}</span>
																				</div>
																			</div>
																		</div>
																		{/*  */}
																		{activeTab === "Roundtrip" && (<div className="form_search_date">
																			<div className="flight_Search_boxed date_flex_area">
																				<div className="Journey_date">
																					<p>Journey date</p>
																					<input type="date" value={returnDate} onChange={(e) => setReturnDat(e.target.value)} />
																					<span>{returnDate}</span>
																				</div>
																			</div>
																		</div>)
																		}

																	</div>
																	<div className="col-lg-2 col-md-6 col-sm-12 col-12" >
																		<div className="flight_Search_boxed dropdown_passenger_area"  >
																			<div onClick={toggleDropdown}>
																				<p >Passenger, Class</p>
																				<span>{adultCount}, {childCount}, {infantCount}</span>
																				<div className="dropdown" >
																					{
																						dropdownOpen &&
																						(
																							<div className="traveller-calulate-persons dropdown_passenger_info">
																								<div className="passengers">

																									<div className="passengers-types">
																										<div className="passengers-type">
																											<div className="text">
																												<span className="count pcount">{adultCount}</span>
																												<div className="type-label">
																													<p>Adult</p>
																													<span>12+ yrs</span>
																												</div>
																											</div>
																											<div className="button-set">
																												<button type="button" className="btn-add" onClick={() => setAdultCount(adultCount + 1)}>
																													<i className="fas fa-plus"></i>
																												</button>
																												<button type="button" className="btn-subtract" onClick={() => setAdultCount(adultCount - 1)} disabled={adultCount <= 1}>
																													<i className="fas fa-minus"></i>
																												</button>
																											</div>
																										</div>
																										<div className="passengers-type">
																											<div className="text">
																												<span className="count ccount">{childCount}</span>
																												<div className="type-label">
																													<p className="fz14 mb-xs-0">Children</p>
																													<span>2 - Less than 12 yrs</span>
																												</div>
																											</div>
																											<div className="button-set">
																												<button type="button" className="btn-add-c" onClick={() => setChildCount(childCount + 1)}>
																													<i className="fas fa-plus"></i>
																												</button>
																												<button type="button" className="btn-subtract-c" onClick={() => setChildCount(childCount - 1)} disabled={childCount <= 0}>
																													<i className="fas fa-minus"></i>
																												</button>
																											</div>
																										</div>
																										<div className="passengers-type">
																											<div className="text">
																												<span className="count incount">{infantCount}</span>
																												<div className="type-label">
																													<p className="fz14 mb-xs-0">Infant</p>
																													<span>Less than 2 yrs</span>
																												</div>
																											</div>
																											<div className="button-set">
																												<button type="button" className="btn-add-in" onClick={() => setInfantCount(infantCount + 1)}>
																													<i className="fas fa-plus"></i>
																												</button>
																												<button type="button" className="btn-subtract-in" onClick={() => setInfantCount(infantCount - 1)} disabled={infantCount <= 0}>
																													<i className="fas fa-minus"></i>
																												</button>
																											</div>
																										</div>
																									</div>
																								</div>
																								<div className="cabin-selection">
																									<h6>Cabin Class</h6>
																									<div className="cabin-list">
																										<button type="button" className={cabinClass === 'Economy' ? 'label-select-btn active' : 'label-select-btn'} onClick={() => setCabinClass('Economy')}>
																											<span className="muiButton-label">Economy</span>
																										</button>
																										<button type="button" className={cabinClass === 'Business' ? 'label-select-btn active' : 'label-select-btn'} onClick={() => setCabinClass('Business')}>
																											<span className="muiButton-label">Business</span>
																										</button>
																										<button type="button" className={cabinClass === 'FirstClass' ? 'label-select-btn active' : 'label-select-btn'} onClick={() => setCabinClass('FirstClass')}>
																											<span className="MuiButton-label">First Class</span>
																										</button>
																									</div>
																								</div>
																							</div>
																						)
																					}
																				</div>
																				<span>{cabinClass}</span>
																			</div>

																		</div>
																	</div>
																	<div className="col-6 offset-3 top_form_search_button text-center">
																		{
																			loading === false ? (<button className="btn btn_theme btn_md" onClick={serachFlight}>Search</button>)
																				: (
																				<center>
																					<ProgressBar height="80"
																						width="680"
																						color="#8E2EEE"
																						ariaLabel="progress-bar-loading" />
																				</center>
																		)
																		}
																	</div>
																</div>
															</form>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div>
				<FlightDetails flightData={flightData} />
			</div>
			<div className="copyright_area footerLast">
				<div className="container">
					<div className="row align-items-center">
						<div className="co-lg-6 col-md-6 col-sm-12 col-12">
							<div className="copyright_left">
								<p>Copyright © 2023 All Rights Reserved</p>
							</div>
						</div>
						<div className="co-lg-6 col-md-6 col-sm-12 col-12">
							<div className="copyright_right">
								<img src="assets/img/common/cards.png" alt="img" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home
// For Add or Remove Flight Multi City Option Start
$(document).ready(function () {
    $("#addMulticityRow").on('click', (function () {
        let a = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

        if (document.querySelectorAll('.multi_city_form').length === 5) {
            alert("Max Citry Limit Reached!!")
            return;
        }
        $(".multi_city_form_wrapper").append(`
        
        <div className="multi_city_form">
        <div className="row">
            <div className="col-lg-12">
                <div className="multi_form_remove">
                    <button type="button"
                        id="remove_multi_city">Remove</button>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="flight_Search_boxed">
                    <p>From</p>
                    <input type="text" value="New York">
                    <span>DAC, Hazrat Shahajalal
                        International...</span>
                    <div className="plan_icon_posation">
                        <i className="fas fa-plane-departure"></i>
                    </div>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="flight_Search_boxed">
                    <p>To</p>
                    <input type="text" value="London ">
                    <span>CXB, London  Airport</span>
                    <div className="plan_icon_posation">
                        <i className="fas fa-plane-arrival"></i>
                    </div>
                    <div className="range_plan">
                        <i className="fas fa-exchange-alt"></i>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="form_search_date">
                    <div
                        className="flight_Search_boxed date_flex_area">
                        <div className="Journey_date">
                            <p>Journey date</p>
                            <input type="date" value="2022-05-18">
                            <span>Thursday</span>
                        </div>
                        <div className="Journey_date">
                            <p>Return date</p>
                            <input type="date" value="2022-05-20">
                            <span>Saturday</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-2  col-md-6 col-sm-12 col-12">
            <div
                className="flight_Search_boxed dropdown_passenger_area">
                <p>Passenger, Class </p>
                <div className="dropdown">
                    <button
                        className="dropdown-toggle final-count"
                        data-toggle="dropdown" type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        0 Passenger
                    </button>
                    <div className="dropdown-menu dropdown_passenger_info"
                        aria-labelledby="dropdownMenuButton1">
                        <div
                            className="traveller-calulate-persons">
                            <div className="passengers">
                                <h6>Passengers</h6>
                                <div
                                    className="passengers-types">
                                    <div
                                        className="passengers-type">
                                        <div className="text">
                                            <span
                                                className="count pcount">2</span>
                                            <div
                                                className="type-label">
                                                <p>Adult</p>
                                                <span>12+
                                                    yrs</span>
                                            </div>
                                        </div>
                                        <div
                                            className="button-set">
                                            <button
                                                type="button"
                                                className="btn-add">
                                                <i
                                                    className="fas fa-plus"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn-subtract">
                                                <i
                                                    className="fas fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        className="passengers-type">
                                        <div className="text">
                                            <span
                                                className="count ccount">0</span>
                                            <div
                                                className="type-label">
                                                <p
                                                    className="fz14 mb-xs-0">
                                                    Children
                                                </p><span>2
                                                    - Less
                                                    than 12
                                                    yrs</span>
                                            </div>
                                        </div>
                                        <div
                                            className="button-set">
                                            <button
                                                type="button"
                                                className="btn-add-c">
                                                <i
                                                    className="fas fa-plus"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn-subtract-c">
                                                <i
                                                    className="fas fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        className="passengers-type">
                                        <div className="text">
                                            <span
                                                className="count incount">0</span>
                                            <div
                                                className="type-label">
                                                <p
                                                    className="fz14 mb-xs-0">
                                                    Infant
                                                </p><span>Less
                                                    than 2
                                                    yrs</span>
                                            </div>
                                        </div>
                                        <div
                                            className="button-set">
                                            <button
                                                type="button"
                                                className="btn-add-in">
                                                <i
                                                    className="fas fa-plus"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn-subtract-in">
                                                <i
                                                    className="fas fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cabin-selection">
                                <h6>Cabin Class</h6>
                                <div className="cabin-list">
                                    <button type="button"
                                        className="label-select-btn">
                                        <span
                                            className="muiButton-label">Economy
                                        </span>
                                    </button>
                                    <button type="button"
                                        className="label-select-btn active">
                                        <span
                                            className="muiButton-label">
                                            Business
                                        </span>
                                    </button>
                                    <button type="button"
                                        className="label-select-btn">
                                        <span
                                            className="MuiButton-label">First
                                            Class </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span>Business</span>
            </div>
        </div>
        </div>
    </div>
        `);

    }))
    // Remove Button Click 
    $(document).on('click', (function (e) {
        if (e.target.id === "remove_multi_city") {
            $(e.target).parent().closest('.multi_city_form').remove()
        }
    })

    )

});
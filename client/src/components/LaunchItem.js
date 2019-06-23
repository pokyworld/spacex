import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { Link } from 'react-router-dom';

const LaunchItem = ({ launch }) => {
    const { flight_number, mission_name, launch_date_utc, launch_success } = launch;
    return (
        <div id={flight_number} className="card mb-3">
            <div className="card-header">
                <h5>Mission: <span className={classNames({
                    "text-success": launch_success,
                    "text-danger": !launch_success && moment() > moment(launch_date_utc),
                    "text-warning": moment() < moment(launch_date_utc)
                })}>{mission_name}</span></h5>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-9">
                        <p>Date: {moment(launch_date_utc).format("YYYY-MM-DD HH:mm")}</p>
                    </div>
                    <div className="col-md-3">
                        <Link to={{
                            pathname: `/launch/${flight_number}`,
                            state: { ...launch }
                        }} className="btn btn-secondary text-dark">Details</Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LaunchItem;

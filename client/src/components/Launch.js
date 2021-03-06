import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import moment from 'moment';

const LAUNCH_QUERY = gql`
    query LaunchQuery($flight_number: Int!) {
        launch(flight_number: $flight_number) { 
            flight_number,mission_name,launch_year,
            launch_date_unix,launch_date_utc,launch_success,
            rocket {
                rocket_id, rocket_name, rocket_type
            },
            launch_site {
                site_name, site_name_long
            },
            launch_failure_reason { 
                time, altitude, reason
            } 
        } 
    }
`;

export default class Launch extends Component {
    render() {
        const { flight_number, mission_name,
            launch_date_utc,
            rocket,
            launch_success, launch_site, launch_failure_reason } = this.props.launch;
        const { listWrapper, listGroup, listGroupItem, listItem } = styles;
        return (
            <div style={listWrapper}>
                <h5>Launch Details Page</h5>
                <ul style={listGroup} className="list-group">
                    <li style={listGroupItem} className="list-group-item"><div style={listItem}>Mission</div><div>{mission_name}</div></li>
                    <li style={listGroupItem} className="list-group-item"><div style={listItem}>Flight Number</div><div>{flight_number}</div></li>
                    <li style={listGroupItem} className="list-group-item"><div style={listItem}>Launch Date</div><div>{moment(launch_date_utc).format("YYYY-MM-DD HH:mm")}</div></li>
                    <li style={listGroupItem} className="list-group-item"><div style={listItem}>Status</div><div className={classNames({
                        "text-success": launch_success,
                        "text-danger": !launch_success && moment() >= moment(launch_date_utc),
                        "text-warning": moment() < moment(launch_date_utc)
                    })}>
                        {launch_success === true && moment() >= moment(launch_date_utc) && `Successful Launch`}
                        {launch_success === null && moment() >= moment(launch_date_utc) && `Failed Launch`}
                        {launch_success === false && moment() >= moment(launch_date_utc) && `Failed Launch`}
                        {moment() < moment(launch_date_utc) && `Future Launch`}
                    </div></li>
                    <li style={listGroupItem} className="list-group-item"><div style={listItem}>Rocket Name</div><div>{rocket.rocket_name}</div></li>
                    {launch_site &&
                        <li style={listGroupItem} className="list-group-item"><div style={listItem}>Launch Site</div><div>{launch_site.site_name_long}</div></li>
                    }
                    {launch_failure_reason &&
                        <li style={listGroupItem} className="list-group-item"><div style={listItem}>Launch Failure</div><div>{`Time: ${launch_failure_reason.time}<br/>Altitude: ${launch_failure_reason.altitude}<br/>Reason: ${launch_failure_reason.reason}<br/>`}</div></li>
                    }

                </ul>
                <Link to="/" path="/" className="btn btn-secondary text-dark">Return to List</Link>
                <div className="clearfix"></div>
                <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
                    {
                        ({ loading, error, data }) => {
                            if (loading) return <h5>Loading...</h5>;
                            if (error) console.log(error);
                            const { launch } = data;
                            return (<Fragment>
                                {
                                    // data.launche
                                    <ul style={listGroup} className="list-group">
                                        <li style={listGroupItem} className="list-group-item"><div style={listItem}>Mission</div><div>{launch.mission_name}</div></li>
                                        <li style={listGroupItem} className="list-group-item"><div style={listItem}>Flight Number</div><div>{launch.flight_number}</div></li>
                                        <li style={listGroupItem} className="list-group-item"><div style={listItem}>Launch Date</div><div>{moment(launch.launch_date_utc).format("YYYY-MM-DD HH:mm")}</div></li>
                                        <li style={listGroupItem} className="list-group-item"><div style={listItem}>Status</div><div className={classNames({
                                            "text-success": launch.launch_success,
                                            "text-danger": !launch.launch_success && moment() >= moment(launch.launch_date_utc),
                                            "text-warning": moment() < moment(launch_date_utc)
                                        })}>
                                            {launch.launch_success === true && moment() >= moment(launch.launch_date_utc) && `Successful Launch`}
                                            {launch.launch_success === null && moment() >= moment(launch.launch_date_utc) && `Failed Launch`}
                                            {launch.launch_success === false && moment() >= moment(launch.launch_date_utc) && `Failed Launch`}
                                            {moment() < moment(launch.launch_date_utc) && `Future Launch`}
                                        </div></li>
                                        <li style={listGroupItem} className="list-group-item"><div style={listItem}>Rocket Name</div><div>{launch.rocket.rocket_name}</div></li>
                                        {launch.launch_site &&
                                            <li style={listGroupItem} className="list-group-item"><div style={listItem}>Launch Site</div><div>{launch.launch_site.site_name_long}</div></li>
                                        }
                                        {launch.launch_failure_reason &&
                                            <li style={listGroupItem} className="list-group-item"><div style={listItem}>Launch Failure</div><div>{`Time: ${launch.launch_failure_reason.time}<br/>Altitude: ${launch.launch_failure_reason.altitude}<br/>Reason: ${launch.launch_failure_reason.reason}<br/>`}</div></li>
                                        }
                                    </ul>
                                }
                            </Fragment>);
                        }
                    }
                </Query>
            </div>
        )
    }
};

const styles = {
    listWrapper: {
        maxWidth: 800,
        margin: "auto",
        marginTop: 40,
        paddingBottom: 30
    },
    listGroup: {

        marginTop: 40,
        marginBottom: 40
    },
    listGroupItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: "4vw",
        paddingRight: "4vw",
        flex: "2 1"
    },
    listItem: {
        fontWeight: 800,
        marginRight: 15,
        minWidth: 120
    }
}

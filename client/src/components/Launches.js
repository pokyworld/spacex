import React, { Component, Fragment } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import LaunchItem from './LaunchItem';
import MissionKey from "./MissionKey";

const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches {
            flight_number, mission_name, launch_year, 
            launch_date_utc, launch_success, 
            rocket {
                rocket_id,
                rocket_name,
                rocket_type
            },
            launch_site {
                site_name, 
                site_name_long
            },
            launch_failure_reason {
                time, altitude, reason
            }
        }
    }`;
export class Launches extends Component {
    state = {
        launches: 0
    };

    render() {
        // console.log(this.state);

        const { launches } = this.state;
        const { listWrapper } = styles;
        return (
            <div style={listWrapper}>
                <h5 className="dislay-4 my-3">Launches
                {launches >= 1 && ` (${launches})`}
                </h5>
                <MissionKey />
                <Query query={LAUNCHES_QUERY}>
                    {
                        ({ loading, error, data }) => {
                            if (loading) return <h5>Loading...</h5>;
                            if (error) console.log(error);

                            return (<Fragment>
                                {
                                    data.launches.map(launch => (
                                        <LaunchItem key={launch.flight_number} launch={launch} />
                                    ))
                                }
                            </Fragment>);
                        }
                    }
                </Query>
            </div>
        )
    }
}

const styles = {
    listWrapper: {
        maxWidth: 800,
        margin: "auto",
        marginTop: 40
    }
};

export default Launches;

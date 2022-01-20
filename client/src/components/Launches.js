import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Launchitem from './Launchitem'
import MissionStatus from './MissionStatus'

const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches {
            details
            mission_name
            launch_year
            launch_date_local
            launch_success
            id
            

        }
    }
`;

export class Launches extends Component {
    render() {
        return (
            <Fragment>
                <h1 className="display-4 my-3">Launches</h1>
                <MissionStatus/>
                <Query query={LAUNCHES_QUERY}>
                    {
                        ({ loading, error, data }) =>{
                            if(loading) return <h4>Loading...</h4>
                            if(error) console.error(error);
                            console.log(data);

                            return <Fragment>
                                {
                                    data.launches.map(launch => (
                                        <Launchitem  key={launch.details} launch={launch} />
                                    ))
                                }
                            </Fragment>
                        }
                    }
                </Query>
            </Fragment>
        )
    }
}

export default Launches

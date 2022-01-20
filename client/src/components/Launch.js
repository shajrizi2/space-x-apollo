import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const LAUNCH_QUERY = gql`
    query LaunchQuery($id: String) {
        launch(id: $id) {
            id
        details
        mission_name
        launch_year
        launch_success
        launch_date_local,
        rocket {
            rocket_name
            rocket_type
        }
        
        }
    }
`;

export class Launch extends Component {
    render() {
        let { id } = this.props.match.params;
        // id = parseInt(id);
        return (
            <Fragment>
                <Query query={LAUNCH_QUERY} variables={{id}}>
                    {
                        ({loading, error, data}) =>{
                            if (loading) return <h4>Loading...</h4>
                            if (error) console.log(error)

                            const {mission_name, id, details, launch_date_local, launch_success, launch_year, rocket:{rocket_name, rocket_type}} = data.launch

                            return <div>
                                <h1 className="display-4 my3">Mission: {mission_name}</h1>
                                <h4 className="mb-3">Launch Details</h4>
                                <ul className="list-group">
                                    <li className="list-group-item">Id: {id}</li>
                                    <li className="list-group-item">Launch Year: {launch_year}</li>
                                    <li className="list-group-item">Launch Successful: <span className={classNames({
                                       'text-success': launch_success,
                                       'text-danger': !launch_success
                                    })}>{launch_success ? 'Yes' : 'Failed'}</span></li>
                                    <li className="list-group-item">Details: {details}</li>
                                </ul>
                                <h4 className="my-3">Rocket Details</h4>
                                <ul className="list-group">
                                    <li className="list-group-item">Rocket Name: {rocket_name}</li>
                                    <li className="list-group-item">Rocket Type: {rocket_type}</li>
                                </ul>
                                <hr/>
                                <Link to="/" className="btn btn-primary">Back</Link>
                            </div>
                        }
                    }
                </Query>
            </Fragment>
        )
    }
}

export default Launch

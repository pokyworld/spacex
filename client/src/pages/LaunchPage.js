import React from 'react';
import Header from "../components/Header";
import Launch from "../components/Launch";

const LaunchPage = (props) => {
    const { state } = props.location;
    return (
        <div className="container">
            <Header />
            <Launch launch={state} />
        </div>
    )
};

export default LaunchPage;

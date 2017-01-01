import React from 'react';
import ReactDOM from 'react-dom';

export default class Overlay extends React.Component {

    render() {
        return <div class="overlay">
            <h1>{this.props.title}</h1>
            <p>{this.props.message}</p>
        </div>;
    }

}
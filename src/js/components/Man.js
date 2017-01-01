import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Shows a parcially or completed hangman depending of how many mistakes the user has made.
 */
export default class Man extends React.Component {

    static propTypes = {
        mistakes: React.PropTypes.number.isRequired
    };

    render() {
        return <svg></svg>;
    }

}
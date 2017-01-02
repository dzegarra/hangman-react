import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Show the letters already used.
 */
export default class MissedLetters extends React.Component {

    static propTypes = {
        letters: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    };

    render() {
        const letters = this.props.letters || [];
        if (letters.length) {
            return <div className="missed-letters">Missed letters: {letters.map((letter)=> {
                return <span className="letter" key={letter}>{letter}</span>;
            })}</div>;
        }
        return <span></span>;
    }

}
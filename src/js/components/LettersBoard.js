import React from 'react';
import ReactDOM from 'react-dom';

export default class LettersBoard extends React.Component {

    static propTypes = {
        word: React.PropTypes.string,
        usedLetters: React.PropTypes.arrayOf(React.PropTypes.string)
    };

    render() {
        let word = this.props.word || '',
            usedLetters = this.props.usedLetters || [];
        return (
            <div className="letters-board">
                {word.split('').map((l, index)=> {
                    const used = usedLetters.indexOf(l) > -1;
                    if (used) {
                        return <div key={index} className="letter used">{l}</div>;
                    }
                    return <div key={index} className="letter">{' '}</div>;
                })}
            </div>
        );
    }
}
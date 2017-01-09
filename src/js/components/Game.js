import React from 'react';
import ReactDOM from 'react-dom';
//import CircularProgress from 'material-ui/CircularProgress';
import unique from 'lodash/uniq';
import LettersBoard from './LettersBoard';
import Man from './Man';
import MissedLetters from './MissedLetters';

export default class Game extends React.Component {

    wordAPI = 'http://www.setgetgo.com/randomword/get.php';

    /**
     * Max number of errors
     */
    maxErrors = 7;

    allowedLetters = /[a-zA-Z]/

    /**
     * Dialog messages.
     */
    messages = {
        intro: {
            title: 'Instructions',
            msg: 'Guess the fucking word before I complete the drawing of the hangman. NO CHEATING!'
        },
        gameover: {
            title: 'Game over',
            msg: `Sorry bro, you're too dumb.`
        },
        youwon: {
            title: 'You won!',
            msg: 'Lucky bastard you won the game.'
        },
        error: {
            title: 'Error',
            msg: 'Check your internet connection'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            word: '',
            goodLetters: [],
            wrongLetters: []
        };
        this.resetGame = this.resetGame.bind(this);
    }

    componentDidMount() {
        const msg = this.messages.intro;
        this.props.onRequestShowMessage(msg.title, msg.msg, this.resetGame);

        //Listen for keystrokes
        document.addEventListener('keydown', function (e) {
            const key = e.key;
            if (key && key.length==1 && this.allowedLetters.test(key)) {
                this.tryLetter(key.toUpperCase());
            }
        }.bind(this));
    }

    resetGame() {
        this.setState({
            active: true,
            word: '',
            goodLetters: [],
            wrongLetters: []
        });
        this.genNewWord();
    }

    genNewWord() {
        fetch(this.wordAPI)
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject(new Error(response.statusText));
                }
                return response.text();
            })
            .then(txt => {
                this.setState({ word: txt.toUpperCase() });
            })
            .catch(this.notifyError.bind(this));
    }

    isLetterUsed(letter) {
        const isInGoods = this.state.goodLetters.indexOf(letter) > -1,
              isInBads = this.state.wrongLetters.indexOf(letter) > -1;
        return isInGoods || isInBads;
    }

    tryLetter(letter) {

        //Letter is NOT expected
        if (!this.state.active) return;
        
        this.setState((prevState) => {
            let word = prevState.word,
                goodLetters = prevState.goodLetters,
                wrongLetters = prevState.wrongLetters;

            //Letter already used
            if (this.isLetterUsed(letter)) return;

            if ( word.indexOf(letter) > -1 ) {
                goodLetters = goodLetters.concat(letter);
            } else {
                wrongLetters = wrongLetters.concat(letter);
            }

            return {goodLetters, wrongLetters};

        }, this.checkGameOver);
        
    }

    checkGameOver() {
        if (this.triesExceded()) {
            this.notifyGameOver();
        } else if (this.isComplete()) {
            this.notifyWon();
        }
    }

    triesExceded() {
        return this.state.wrongLetters.length >= this.maxErrors;
    }

    isComplete() {
        const guessLettersLength = this.state.goodLetters.length,
              wordLength = unique(this.state.word.split('')).length;
        return guessLettersLength === wordLength;
    }

    notifyGameOver() {
        const msg = this.messages.gameover;
        this.props.onRequestShowMessage(msg.title, msg.msg, this.resetGame);
        this.setState({active: false});
    }

    notifyWon() {
        const msg = this.messages.youwon;
        this.props.onRequestShowMessage(msg.title, msg.msg, this.resetGame);
        this.setState({active: false});
    }

    notifyError() {
        const msg = this.messages.error;
        this.props.onRequestShowMessage(msg.title, msg.msg, this.resetGame);
        this.setState({active: false});
    }

    render() {
        return (
            <div>
                <div className="game">
                    <Man className="man" mistakes={this.state.wrongLetters.length} />
                    <div className="board">
                        <LettersBoard 
                            word={this.state.word} 
                            usedLetters={this.state.goodLetters} />
                        {this.state.wrongLetters.length > 0 && 
                            <MissedLetters letters={this.state.wrongLetters} />
                        }
                    </div>
                </div>
                {this.state.active && this.state.word.length == 0 && <div className="center-all">
                    <div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
                </div>}
            </div>
        );
    }
}
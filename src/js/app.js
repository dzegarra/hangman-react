import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import LettersBoard from './components/LettersBoard';
import Man from './components/Man';
import Overlay from './components/Overlay';
import Game from './components/Game';
import '../styles/main.scss';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogTitle: '',
            dialogMsg: '',
            dialogCb: null
        };
        this.showMessage = this.showMessage.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    showMessage(title, msg, cb) {
        this.setState({
            dialogTitle: title,
            dialogMsg: msg,
            dialogCb: cb
        });
    }

    resetGame() {
        if (this.state.dialogCb) this.state.dialogCb.call(undefined);
        this.setState({
            dialogTitle: '',
            dialogMsg: '',
            dialogCb: null
        });
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Overlay 
                        title={this.state.dialogTitle} 
                        message={this.state.dialogMsg} 
                        onRequestClose={this.resetGame} />
                    <Game 
                        onRequestShowMessage={this.showMessage} />
                </div>
            </MuiThemeProvider>
        );
    }

    /**<div>
        <div>
            <Man />
            <UsedLetters />
        </div>
        <LettersBoard />
    </div> */
}

ReactDOM.render(<App />, document.getElementById('root'));

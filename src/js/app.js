import React from 'react';
import ReactDOM from 'react-dom';
import 'material-design-lite';

import LettersBoard from './components/LettersBoard';
import Man from './components/Man';
import Overlay from './components/Overlay';
import Game from './components/Game';
import '../styles/main.scss';

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
            <div>
                <Overlay 
                    title={this.state.dialogTitle} 
                    message={this.state.dialogMsg} 
                    onRequestClose={this.resetGame} />
                <Game 
                    onRequestShowMessage={this.showMessage} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

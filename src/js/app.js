import React from 'react';
import ReactDOM from 'react-dom';
import LettersBoard from './components/LettersBoard';
import Man from './components/Man';
import Overlay from './components/Overlay';
import UsedLetters from './components/UsedLetters';

class App extends React.Component {

    render() {
        return (
            <div>
                <Overlay />
            </div>
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
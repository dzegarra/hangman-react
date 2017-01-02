import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';

export default class Overlay extends React.Component {

    static propTypes = {
        title: React.PropTypes.string,
        message: React.PropTypes.string,
        onRequestClose: React.PropTypes.func
    };

    render() {
        const title = this.props.title || '';
        const message = this.props.message || '';

        if ( title.length>0 || message.length>0 ) {
            return (
            <div className="overlay">
                <div className="overlay-content">
                    <h1>{title}</h1>
                    <p>{message}</p>
                    <RaisedButton 
                        label="Close" 
                        primary={true} 
                        onClick={(e)=>this.props.onRequestClose(e)} />
                </div>
            </div>);
            
        }
        return null;
    }

}

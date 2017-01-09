import React from 'react';
import ReactDOM from 'react-dom';

export default class Man extends React.Component {

    /**
     * DOM element which contain the SVG graphic.
     */
    el = null;

    static propTypes = {
        mistakes: React.PropTypes.number.isRequired
    };

    bodyParts = [
        'rope',
        'head',
        'body',
        'arm-left',
        'arm-right',
        'leg-left',
        'leg-right'
    ];


    componentDidMount() {
        this.hideAllBody();
    }

    shouldComponentUpdate(nextProps) {
        this.setProgress(nextProps.mistakes);
        return false;// Never NEVER! re-render this component
    }


    hideAllBody() {
        const len = this.bodyParts.length;
        for ( let i=0 ; i < len ; i++ ) {
            this.hideBodyPart(this.bodyParts[i]);
        }
    }

    showBodyPart(name) {
        let node = this.el.getElementById(name);
        node.setAttribute('visibility', 'visible');
    }

    hideBodyPart(name) {
        let node = this.el.getElementById(name);
        node.setAttribute('visibility', 'hidden');
    }

    setProgress(value) {
        let partIndex = 0,
            limit = (value < this.bodyParts.length) ? value : this.bodyParts.length;
        
        this.hideAllBody();

        while(partIndex < limit) {
            this.showBodyPart(this.bodyParts[partIndex]);
            partIndex++;
        }
    }

    render() {
        console.log('kajdhnsfkljadgs');
        const className = this.props.className || '';
        const svg = require('raw-loader!../../images/man.svg');
        return <div dangerouslySetInnerHTML={{__html: svg}} className={className} ref={(el) => {
            this.el = document.querySelector('svg');
        }}/>;
    }

}

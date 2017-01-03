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

    shouldComponentUpdate(nextProps, nextState) {
        this.setProgress(nextProps.mistakes);
        return true;
    }

    hideAllBody() {

    }

    showBodyPart(name) {
        let node = this.el.getElementById(name);
        node.setAttribute('visibility', 'visible');
    }

    hideBodyPart() {
        let node = this.el.getElementById(name);
        node.setAttribute('visibility', 'hidden');
    }

    setProgress(value) {
        let partIndex = 0,
            limit = value < this.bodyParts.length ? value : this.bodyParts.length;
        
        this.hideAllBody();
        
        while(partIndex < limit) {
            this.showBodyPart(this.bodyParts[partIndex]);
        }
    }

    render() {
        const className = this.props.className || '';
        let svg = require('raw-loader!../../images/man.svg');
        return <div dangerouslySetInnerHTML={{__html: svg}} className={className} ref={(elContainer) => {
            let svg = elContainer.querySelector('svg');
            console.log(svg);
            this.el = svg;
        }}/>;
    }

}

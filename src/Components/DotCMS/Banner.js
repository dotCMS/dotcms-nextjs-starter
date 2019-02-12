import React, { Component } from 'react';
import dotcmsApi from '../../libs/dotcms.api';

export default class SimpleWidget extends Component {
    state = {
        widgetCode:'test'
    };

    componentDidMount() {
        dotcmsApi.request({
            url: `${process.env.REACT_APP_DOTCMS_HOST}/api/widget/id/` + this.props.identifier
        })
        .then(response =>  response.text())
        .then(text => {
            this.setState({
                ...this.state,
                widgetCode: text
            });
 
        })
    }
    render() {

        const divStyle = {
            backgroundColor: '40px',
            border: '5px solid white',
            backgroundImage: `url('/dA/${this.props.identifier}/image/1200h/jpegp/retiree-banner.jpeg)`,
            height: "400px",
            marginTop:`-150px`,
            backgroundSize:"cover"
          };



        return (

                
                <div className="bg-wrapper" style={divStyle} />

 
                

        );
    }
}
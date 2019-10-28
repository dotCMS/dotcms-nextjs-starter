import React, { Component } from 'react';


export default class Activity extends Component {


    render() {
        const description = this.props.description.length>120 ? this.props.description.substring(120) : this.props.description;
        const imageUrl = "/dA/" + this.props.identifier + "/image/270w/50q/" + this.props.imageBinaryFileTitle;
        const myHref = "/activities/" + this.props.urlTitle;
        return (
            <a className="box-info" href={myHref}>
                <img className="box-info-img" src={imageUrl} alt={this.props.title} width="270" height="270"/>
                <div className="box-info-body">
                    <h4 className="box-info-title">{this.props.title}</h4>
                    <p className="box-info-text">
                        {description}
                        
                        
                        </p>
                </div>
            </a>
        );
    }
}

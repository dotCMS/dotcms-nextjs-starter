import React, { Component } from 'react';


export default class Banner extends Component {


    render() {
        const divStyle = {
            color: 'blue',
            backgroundImage: 'url("/dA/' + this.props.identifier + '/image/1200w/50q/banner")',
          };




        return (
            <div className="banner bg-image-full bg-overlay-30 context-dark" style={divStyle}>
            <div className="container">
                <div className="row justify-content-lg-center">
                    <div className="col-lg-9 text-center">
                        <p className="banner-title">{this.props.title}</p>
                        <h2 className="text-decoration-lines-2">
                            <span>
                                {this.props.caption}
                                <span className="text-decoration-line text-decoration-line-left"></span>
                                <span className="text-decoration-line text-decoration-line-right"></span>
                            </span>
                        </h2>
                        
                        
                        <div className="group-lg">
                            <a className="button button-primary button-leaf" href={this.props.link}>{this.props.buttonText}</a>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

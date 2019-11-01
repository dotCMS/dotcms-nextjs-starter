import React, { Component } from 'react';


export default class Image extends Component {


    render() {

        return (

            <article className="thumbnail-classic mb-5">
                <a className="thumbnail-classic-figure" href="{'/dA/' + this.props.identifier + '/1200x/50q/' + this.props.fileName }" data-lightgallery="item">
                    <picture>
                        <source media="(min-width: 800px)" srcset={'/dA/' + this.props.identifier + '/1200w/50q/' + this.props.fileName + ' /dA/' + this.props.identifier + '/2400w/50q/' + this.props.fileName + ' 2x'} />
                        <source media="(min-width: 480px)" srcset={'/dA/' + this.props.identifier + '/600w/50q/' + this.props.fileName + ' /dA/' + this.props.identifier + '/1200w/50q/' + this.props.fileName + ' 2x'} />
                        <img src={'/dA/' + this.props.identifier + '/480w/50w/50q/' + this.props.fileName} alt={this.props.description} className="img-fluid"></img>
                    </picture>
                </a>
                <div className="thumbnail-classic-caption">
                    <h4 className="thumbnail-classic-title">{this.props.title}</h4>
                    <p className="thumbnail-classic-text">{this.props.description}</p>
                    <a className="thumbnail-classic-link mdi mdi-plus-circle-outline" href={'/dA/' + this.props.identifier + '/1200w/50q/' + this.props.fileName} data-lightgallery="item"></a>
                </div>    
            </article>

        );
    }
}

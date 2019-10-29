import React, { Component } from 'react';


export default class Image extends Component {


    render() {

        return (
            <a class="video-cover bg-overlay-30 mb-5" data-lightbox="iframe" href={'https://www.youtube.com/watch?v=' + this.props.id}>
            <div class="video-img" style={{backgroundImage: 'url(' + this.props.thumbnailLarge +')'}}></div>
            <span class="icon mdi mdi-play video-cover-icon"></span>
            </a>

        );
    }
}

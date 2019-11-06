export default function Video(props) {
    return (
        <a
            className="video-cover bg-overlay-30 mb-5"
            data-lightbox="iframe"
            href={'https://www.youtube.com/watch?v=' + props.id}
        >
            <div className="video-img" style={{ backgroundImage: 'url(' + props.thumbnailLarge + ')' }}></div>
            <span className="icon mdi mdi-play video-cover-icon"></span>
        </a>
    );
}

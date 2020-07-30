export default function Video(props) {
    return (
        <a
            className="video-cover"
            data-lightbox="iframe"
            href={'https://www.youtube.com/watch?v=' + props.id}
            style={{height: '100%'}}
        >
            <div
                className="video-img"
                style={{
                    background: `url("${props.thumbnailLarge}") 0 0 no-repeat`,
                    height: '100%'
                }}
            />
        </a>
    );
}
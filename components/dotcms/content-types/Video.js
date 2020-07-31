export default function Video(props) {
    return (
        <a
            className="video-cover"
            href={'https://www.youtube.com/watch?v=' + props.id}
            style={{ marginBottom: '1rem', display: 'block' }}
        >
            <div
                className="video-img"
                style={{
                    background: `url("${props.thumbnailLarge}") 0 0 no-repeat`,
                    height: '360px'
                }}
            ></div>
        </a>
    );
}

export default function Video(props) {
    return (
        <a
            className="video-cover"
            href={'https://www.youtube.com/watch?v=' + props.id}
            rel="noopener noreferrer"
            style={{ marginBottom: '1rem', display: 'block' }}
            target="_blank"
        >
            <div
                className="video-img"
                style={{
                    background: `url("${props.thumbnailLarge}") 0 0 no-repeat`,
                    height: '360px'
                }}
            />
        </a>
    );
}

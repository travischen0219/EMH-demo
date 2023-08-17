import React, { useState, ChangeEvent } from 'react';

interface IVideoResponse {
    videoUrl: string;
}

const VideoPlayer: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [videoSrc, setVideoSrc] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleButtonClick = () => {
        const url = `http://localhost:8000/gen-avatar?text=${encodeURIComponent(text)}`;
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            const videoUrl = URL.createObjectURL(blob);
            setVideoSrc(videoUrl);
            setErrorMessage(''); // Clear the error message if the fetch was successful
        })
        .catch((error: Error) => {
            console.error('Error fetching video:', error);
            setErrorMessage(`Error fetching video: ${error.message}`);
        });
    };

    return (
        <div className="flex flex-1 flex-col p-8">
            {/* <input type='text' value={text} onChange={handleInputChange} />
            <button onClick={handleButtonClick}>Fetch Video</button>
            {errorMessage && <div>{errorMessage}</div>}
            {videoSrc && <video controls autoPlay src={videoSrc} />} */}
            <video controls autoPlay src={videoSrc} />
        </div>
    );
}

export default VideoPlayer;
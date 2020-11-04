import React from 'react';

const VideoDetailsPage = ({ match }) => {
    const videoId = match.params.videoId;

    return ( 
        <div className="page">
            Video VideoDetailsPage
            <p>video Id : {videoId}</p>
        </div>
     );
}
 
export default VideoDetailsPage;
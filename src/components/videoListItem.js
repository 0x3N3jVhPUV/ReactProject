import React from 'react'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";

const VideoListItem = ({movie}) => {
    return <li>
        <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} height="100px" width="100px"/>
            <h3>{movie.title}</h3>
        </li>
}

export default VideoListItem;
import React from 'react';
import { Link } from 'react-router-dom';

export default function VideoCard({ video }) {
  const { title, thumbnails, channelTitle } = video.snippet;

  return (
    <Link to={`/video/${video.id.videoId || video.id}`} state={{ video }}>
      <div className="video-card">
        <img src={thumbnails.medium.url} alt="thumbnail" />
        <p className="title">{title}</p>
        <p className="channel">{channelTitle}</p>
      </div>
    </Link>
  );
}

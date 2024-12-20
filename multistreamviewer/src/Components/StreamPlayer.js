import React, { useState } from "react";

function StreamPlayer({ playerHtml, channelId, width = 1280, height = 720 }) {
	const [channel, setChannel] = useState(channelId);
	// const [playerWidth, setPlayerWidth] = useState(width);
	// const [playerHeight, setPlayerHeight] = useState(height);

	return (
		<div
			id={channel}
			className="StreamPlayer"
			dangerouslySetInnerHTML={{ playerHtml }}></div>
	);
}

export default StreamPlayer;

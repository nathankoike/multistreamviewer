import * as React from "react";

import Box from "@mui/material/Box";
import { red } from "@mui/material/colors";
import { purple } from "@mui/material/colors";

// import "../App.css";

function StreamPlayer({
	playerHtml,
	youtube = false,
	width = 1280,
	height = 720,
}) {
	const [playerWidth, setPlayerWidth] = React.useState(width);
	const [playerHeight, setPlayerHeight] = React.useState(height);

	return (
		<Box
			sx={{
				// Change the border color for YouTube and Twitch streams
				borderColor: youtube ? red[700] : purple[300],
				border: 3,
				borderRadius: 5,
				height: playerHeight,
				width: playerWidth,
				padding: 1,
				overflow: "hidden",
				display: "flex",
			}}>
			<Box
				sx={{
					width: playerWidth,
					height: playerHeight,
					borderRadius: 4,
					overflow: "hidden",
					display: "flex",
				}}>
				<div dangerouslySetInnerHTML={{ __html: playerHtml }}></div>
			</Box>
		</Box>
	);
}

export default StreamPlayer;

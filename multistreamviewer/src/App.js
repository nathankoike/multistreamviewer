import * as React from "react";

import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// import "./App.css";
import StreamPlayer from "./Components/StreamPlayer";

import Header from "./Components/Header";

const theme = createTheme({
	palette: {
		primary: {
			main: "#a0c0ff",
		},
		secondary: {
			main: "#e6aaf0",
		},
		background: {
			default: "#20201c",
			paper: "#20201c",
		},
		text: {
			main: "#ffffff",
			primary: "#ffffff",
			secondary: "#cccccc",
		},
		error: {
			main: "#ff4f5f",
		},
		warning: {
			main: "#ffb779",
		},
		info: {
			main: "#78b7ff",
		},
		success: {
			main: "#6ff67a",
		},
	},
});

function App() {
	const [streams, setStreams] = React.useState([]);
	const [twitchCount, setTwitchCount] = React.useState(0);

	// We need to use a webscraper so this needs to be fetched from the backend
	const addYouTubeStream = async function () {
		// Channel ID (and eventually maybe streaming platform ID) goes here
		const body = { channelId: "@LofiGirl" };

		try {
			// Try to get a stream's embed HTML from the backend
			const data = await fetch("/youtube", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			}).then(data => data.json());

			// Remove whitespace added in backend for code readability
			const newStream = data.player.trim();

			// Update the stream array in state with the new stream
			setStreams([...streams, <StreamPlayer playerHtml={newStream} youtube />]);
		} catch (err) {
			console.log(err, "an error occurred");
		}
	};

	// This is all static, so we can template this client-side
	const addTwitchStream = async function () {
		// // Channel ID (and eventually maybe streaming platform ID) goes here
		// const body = { channelId: "trashtastepodcast" };

		// try {
		// 	// Try to get a stream's embed HTML from the backend
		// 	const data = await fetch("/twitch", {
		// 		method: "POST",
		// 		headers: { "Content-Type": "application/json" },
		// 		body: JSON.stringify(body),
		// 	}).then(data => data.json());

		// 	console.log(data);

		// 	// Remove whitespace added in backend for code readability
		// 	const newStream = data.playerHtml;

		// 	// Update the stream array in state with the new stream
		// 	setStreams([
		// 		...streams,
		// 		<div dangerouslySetInnerHTML={{ __html: newStream }}></div>,
		// 	]);

		// 	// Avoid a race condition when adding the player script
		// 	setTimeout(() => {
		// 		const script = document.createElement("script");

		// 		script.innerHTML = data.scriptString;

		// 		document.body.appendChild(script);
		// 	}, 1000);
		// } catch (err) {
		// 	console.log(err, "an error occurred");
		// }

		////////////////////////////////////////////////////////////////////////

		const divId = `twitch_player_div_${twitchCount}`;

		// Remove whitespace added in backend for code readability
		const newStream = `<div id="${divId}"></div>`;

		// Update the stream array in state with the new stream
		setStreams([
			...streams,
			<div dangerouslySetInnerHTML={{ __html: newStream }}></div>,
		]);

		const channelId = "trashtastepodcast";

		// Avoid a race condition when adding the player script
		setTimeout(() => {
			const script = document.createElement("script");

			script.innerHTML = `
				let options = {
          			channel: "${channelId}"
        		};
		        let player = new Twitch.Player("${divId}", options);
        		player.setVolume(0.5);
			`;

			document.body.appendChild(script);
		}, 1000);
	};

	// Pre-add the Twitch stream script
	const twitchScript = document.createElement("script");
	twitchScript.src = "https://player.twitch.tv/js/embed/v1.js";
	document.body.prepend(twitchScript);

	return (
		<ThemeProvider theme={theme}>
			{/* <script src=></script> */}
			<Box
				height="100vh"
				display="flex"
				flexDirection="column"
				bgcolor="background.default">
				<div className="App">
					<Header
						addYouTubeStream={addYouTubeStream}
						addTwitchStream={addTwitchStream}
					/>
					{streams.map(stream => (
						<div>{stream}</div>
					))}
				</div>
			</Box>
		</ThemeProvider>
	);
}

export default App;

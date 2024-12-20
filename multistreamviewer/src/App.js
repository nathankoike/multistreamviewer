import logo from "./logo.svg";
import * as React from "react";

import "./App.css";
// import StreamPlayer from "./Components/StreamPlayer";
import Header from "./Components/Header";

function App() {
	const [streams, setStreams] = React.useState([]);

	const addStream = function () {
		const body = { channelId: "" };
		fetch("/youtube", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then(data => {
			data.json().then(resData => {
				console.log(resData);

				const newStream = resData.player.trim();

				console.log(streams);

				setStreams([...streams, newStream]);

				console.log("stream added");
			});
		});
	};

	return (
		<div className="App">
			<Header addStream={addStream} />
			{streams.map(stream => (
				<div dangerouslySetInnerHTML={{ __html: stream }}></div>
			))}
		</div>
	);
}

export default App;

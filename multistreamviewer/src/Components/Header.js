import * as React from "react";
import Button from "@mui/material/Button";

// import "../App.css";

function Header({ addYouTubeStream, addTwitchStream }) {
	const [fn, setFn] = React.useState(`
		console.log("no function set");
		`);

	const getServerFunction = async function () {
		try {
			// Try to get a function from the backend
			const data = await fetch("/test", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ data: null }),
			}).then(data => data.json());

			console.log(data);

			// Set the function
			setFn(data.fn);
		} catch (err) {
			console.log(err, "an error occurred");
		}
	};

	const runServerScript = function () {
		console.log(fn);

		const script = document.createElement("script");

		script.innerHTML = fn;

		document.body.appendChild(script);
	};

	return (
		<div className="App">
			<Button onClick={addYouTubeStream}>Add YouTube Stream</Button>
			<Button onClick={addTwitchStream}>Add Twitch Stream</Button>
			<Button onClick={getServerFunction}>Get Server Function</Button>
			<Button onClick={runServerScript}>Run Server Function</Button>
		</div>
	);
}

export default Header;

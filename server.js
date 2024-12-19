import express from "express";
import youtubeStream from "./youtubeStream.js";
import twitchStream from "./twitchStream.js";
// import youtubeStream from "./demoj.js";

const app = express();

const youtubeChannelID = "";
const twitchChannelID = "";

app.get("/*", async (_, res) => {
	const youtubeStreamPlayer = await youtubeStream(youtubeChannelID);
	const twitchStreamPlayer = await twitchStream(twitchChannelID);

	console.log(secondStream);

	res.send(
		`${youtubeStreamPlayer}
            <br /><br /><br />
        ${twitchStreamPlayer}
        `
	);
});

app.listen(3000, () => {
	console.log("App is running on http://localhost:3000");
});

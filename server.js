import express from "express";
import youtubeStream from "./youtubeStream.js";
import twitchStream from "./twitchStream.js";

const PORT = 3000;

const app = express();

const youtubeChannelID = "";
const twitchChannelID = "";

app.get("/*", async (_, res) => {
	const youtubeStreamPlayer = await youtubeStream(youtubeChannelID);
	const twitchStreamPlayer = await twitchStream(twitchChannelID);

	res.send(
		`${youtubeStreamPlayer}
            <br /><br /><br />
        ${twitchStreamPlayer}
        `
	);
});

app.listen(PORT, () => {
	console.log(`App is running on http://localhost:${PORT}`);
});

import express from "express";

import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";

import youtubeStream from "./youtubeStream.js";
import twitchStream from "./twitchStream.js";

const PORT = 3000;
const youtubeChannelID = "@AkiRosenthal";
const twitchChannelID = "dttodot";

const app = express();

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("/*", async (req, res, next) => {
	// const youtubeStreamPlayer = await youtubeStream(youtubeChannelID);
	// const twitchStreamPlayer = await twitchStream(twitchChannelID);
	// res.send(
	// 	`${youtubeStreamPlayer}
	//         <br /><br /><br />
	//     ${twitchStreamPlayer}
	//     `
	// );

	fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
		if (err) {
			console.log(err);
			return res.status(500).send("an error occurred");
		}

		res.send(
			data.replace(
				'<div id="root"></div>',
				`<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
			)
		);
	});
});

app.post("/youtube", async (req, res, next) => {
	console.log(req.body);

	const innerHtml = await youtubeStream(req.body.channelId);

	res.send({ player: innerHtml });
});

app.listen(PORT, () => {
	console.log(`App is running on http://localhost:${PORT}`);
});

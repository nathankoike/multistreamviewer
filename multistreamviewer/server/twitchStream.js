async function twitchStream(channelId, width = 1280, height = 720) {
	const data = {
		playerHtml: `<div id="twitch_player_div"></div>`,
		scriptString: `
      let options = {
          channel: "${channelId}"
        };
        let player = new Twitch.Player("twitch_player_div", options);
        player.setVolume(0.5);
    `,
	};

	return data;
}

export default twitchStream;

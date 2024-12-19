async function twitchStream(channelId, width = 1280, height = 720) {
	return `<script src= "https://player.twitch.tv/js/embed/v1.js"></script>
    <div id="twitch_player_div"></div>
    <script type="text/javascript">
      var options = {
        width: ${width},
        height:${height},
        channel: "${channelId}",
        muted: false
      };
      let player = new Twitch.Player("twitch_player_div", options);
    //   player.setVolume(0.5);
    </script>
    `;
}

export default twitchStream;

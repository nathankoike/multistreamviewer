import puppeteer from "puppeteer";

// TODO:
// Make this entire function work with a single regex (I think it's possible)
async function extractEmbedUrl(channelId) {
	let embedUrl = ""; // We will eventually return this

	// Start Puppeteer
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	try {
		// Navigate the page to a URL
		await page.goto(`https://www.youtube.com/${channelId}/live`);

		// Get the HTML data from the page
		const html = await page.content();

		// Narrow down the search for the embed URL
		const embedRe =
			/content=\"https:\/\/www.youtube.com\/embed\/.*\>\<meta property=\"og:video:type\"/g;

		const matches = html.match(embedRe);

		// Extract the first match
		const firstMatch = matches
			? matches[0].substring(matches[0].indexOf("<"))
			: null;

		// console.log(firstMatch);

		if (firstMatch) {
			const embedUrlRe = /content=\".*\">/g; // Narrow down the search further

			// If we made it here, this should never fail
			embedUrl = firstMatch.match(embedUrlRe)[0];

			// We tweak the indices bc we want to isolate the URL
			const [start, end] = [
				embedUrl.indexOf("=") + 2,
				embedUrl.indexOf(">") - 1,
			];

			// Isolating the URL is a simple slice (no more regex yippee!)
			embedUrl = embedUrl.substring(start, end);
		}
	} catch (err) {
		console.log("ERR", err);
	}

	await browser.close(); // IDK I'll just treat it like a file I guess

	// console.log(embedUrl);

	return embedUrl;
}

async function youtubeStream(channelId, width = 1280, height = 720) {
	const url = await extractEmbedUrl(channelId);

	// Make sure we have a valid video source
	if (url) {
		return `
            <iframe id="embed_target_0" width=${width} height=${height} src="${url}" frameborder="0"
                allow="clipboard-write; encrypted-media; web-share" allowfullscreen>
            </iframe>`;
	}

	console.log("invalid");

	return `
        <div style="height: ${height}px; width: ${width}px; background-color: #000">
        </div>`;
}

export default youtubeStream;

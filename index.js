async function commits() {
	let body = await fetch('https://api.github.com/repos/chchjcr/menu/commits?page=1&per_page=5');
	let json = await body.json();
	return json.map(c => c.url)
}

async function getFile(url) {
	let body = await fetch(url);
	let json = await body.json();
	let latest = json.files.find(f => f.filename.endsWith('.pdf'));
	if (!latest) return '';
	return 'https://beta.chchjcr.co.uk/menu/' + latest.filename;
}

commits().then(async (urls) => {
	let file = '';
	for (let url of urls) {
		file = await getFile(url);
		if (file) {
			window.location.href = file;
			break;
		}
	}
	if (!file) document.write('No menus found.');
})
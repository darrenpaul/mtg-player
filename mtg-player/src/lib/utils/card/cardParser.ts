export const batchImportParser = (text: string) => {
	const lines = text.split('\n');

	const cards = lines.map((line) => {
		const regex = /(\d{1,2}x) (.+)/gm;
		const matched = regex.exec(line);
		if (!matched) return;
		const quantity = matched[1].replace('x', '');
		const name = matched[2];
		return { name, quantity };
	});

	return cards;
};

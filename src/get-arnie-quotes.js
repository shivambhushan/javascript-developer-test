const { httpGet } = require("./mock-http-interface");

// Helper function to fetch a quote from a single URL
async function getQuote(url) {
	try {
		const response = await httpGet(url);
		const responseBody = JSON.parse(response.body);
		const message = responseBody.message || '';
		const status = response.status;

		const objectKey = (status === 200 ? 'Arnie Quote' : 'FAILURE');
		const resultObj = {};
		resultObj[objectKey] = message;
		return resultObj;
	} catch (error) {
		return { 'FAILURE': error.message || 'Unexpected unknown Error' };
	}
}

const getArnieQuotes = async (urls) => {
	// Mapped each URL to the helper function promise and waiting for all to resolve/reject
	const results = await Promise.all(urls.map((url) => getQuote(url)));
	return results;
};

module.exports = {
	getArnieQuotes,
};

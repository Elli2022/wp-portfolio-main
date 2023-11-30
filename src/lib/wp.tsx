const apiKey = process.env.wordpressApiKey;

const WP = async (query: string, variables?: any) => {
	try {
		const res = await fetch(`${apiKey}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query,
				variables: variables || null
			})
		})
		const data = await res.json();
		return data;

	} catch(err: any) {
		console.error(err)
	}

}

export default WP;
// src/hooks/index.js
const API_BASE_URL = 'http://localhost:3000'; // 替换为你的后端地址

export async function handle({ request, resolve }) {
	const updatedRequest = new Request(request);

	// Add API_BASE_URL to the request URL
	updatedRequest.url = `${API_BASE_URL}${request.url}`;

	return resolve(updatedRequest);
}

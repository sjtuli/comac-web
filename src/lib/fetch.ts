// 设置全局默认参数
async function myfetch(url: string, options: RequestInit) {
	const BASE_URL = 'http://localhost:3000'; // 替换为实际的基础URL

	// 合并默认参数和传入的参数
	const mergedOptions = {
		...options,
		headers: {
			// 在这里可以添加其他默认请求头
			...options.headers,
		},
	};

	// 使用fetch进行请求
	return fetch(`${BASE_URL}${url}`, mergedOptions)

}

export { myfetch as fetch };

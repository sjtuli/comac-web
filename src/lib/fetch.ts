import type { UserStruct } from '../routes/store';
import { preferences } from '../routes/store';

export const BASE_URL = 'http://localhost:3000'; // 替换为实际的基础URL

async function myfetch(url: string, options: RequestInit) {
	// 设置全局默认参数
	async function handleLocalStorage() {
		return new Promise<UserStruct>((resolve, _) => {
			preferences.subscribe((e) => {
				// console.log('e', e);
				resolve(e);
			});
		});
	}

	const user: UserStruct = await handleLocalStorage();

	const handleAuth = async () => {
		return new Promise<any>((resolve, reject) => {
			try {
				const mergedOptions = {
					...options,
					headers: {
						// 在这里可以添加其他默认请求头
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Headers': 'Content-Type',
						...options.headers,
					},
				};
				if (user.login_status) {
					mergedOptions.headers = {
						Authorization: `Bearer ${user.token}`,
						...mergedOptions.headers,
					};
				}
				resolve(mergedOptions);
			} catch (error) {
				reject(error);
			}
		});
	};
	const mergedOptions = await handleAuth().catch((e) => {
		console.error('[ handleAuth ] >', e);
	});
	const response = await fetch(`${BASE_URL}${url}`, mergedOptions);
	return response;
}

async function cunstomFetch(url: string, options: RequestInit) {
	options.method === undefined && (options.method = 'POST');
	try {
		const response = await myfetch(`${url}`, options);
		console.log('[ response ] >', response);
		const res = await response.json();
		if (response.ok) {
			// 登录成功，可以进行跳转或其他操作
			console.log('[ res ] >', res);
			return { msg: res.message, type: 'success', res, response };
			// 保存用户信息
		} else {
			// 处理请求失败的情况
			console.error('Login failed');
			return { msg: res.detail, type: 'error', res, response };
		}
	} catch (error) {
		console.error('Error during login:', 'error');
		return { msg: '网络连接失败', type: 'error', res: null, response: null };
	}
}

export { myfetch as fetch, cunstomFetch };

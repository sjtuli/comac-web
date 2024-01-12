import { persisted } from 'svelte-persisted-store';
import { cunstomFetch, fetch } from '$lib/fetch';

export const NO_MOTION_PREFERENCE_QUERY =
	'(prefers-reduced-motion: no-preference)';
export const isSmallScreen = (): boolean => document.body.clientWidth < 767;
export const DEBOUNCE_TIME = 100;

export interface IDesktop {
	isDesktop: boolean;
}

class AppUser {
	public id = 0;
	public info = {
		username: '',
		phone_num: 0,
		sjtu_id: 0,
		resign_time: '',
	};
}

export class UserStruct extends AppUser {
	private access_token = '';
	public async login(username: string, password: string) {
		const formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		const { res, msg, type, response } = await cunstomFetch('/user/login', {
			body: formData,
		});
		this.access_token = res.result.access_token;
		return { msg, type, response, res };
	}

	public async refreshUserInfo() {
		if (!this.isLogin)
			return { msg: '未登录', type: 'error', response: null, res: null };
		const { res, msg, type, response } = await cunstomFetch(`/user/getInfo`, {
			method: 'POST',
		});
		this.info = res.result;
		return { msg, type, response, res };
	}

	get login_status() {
		const arelogin = this.access_token !== '';
		return arelogin;
	}

	get token() {
		return this.access_token;
	}
}


const appUser = new UserStruct();

// First param `preferences` is the local storage key.
// Second param is the initial value.
export const preferences = persisted('app-user', appUser, {
	onError: (e: any) => {
		// console.debug('[ e ] >', e);
		throw e;
	},
});

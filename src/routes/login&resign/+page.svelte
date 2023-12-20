<script lang="ts">
	import { fetch } from '$lib/fetch';
	import Toast from './Toast.svelte';

	let state = 'login';

	let username = '';
	let password = '';
	let toastRef: Toast;

	const handleSubmit = async (
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
	) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		let url = `/user/${state}`;

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: formData,
			});
			console.log('[ response ] >', response);
			let res = await response.json();
			if (response.ok) {
				// 登录成功，可以进行跳转或其他操作
				console.log('Login successful!');
				showToast(res.message, 'success');
			} else {
				// 处理登录失败的情况
				console.error('Login failed');
				showToast(res.detail, 'error');
			}
		} catch (error) {
			console.error('Error during login:', error);
		}
	};

	// 函数用于触发 Toast 显示
	function showToast(
		msg: string,
		type: 'info' | 'success' | 'warning' | 'error',
	) {
		toastRef.showToast(msg, type); // 调用 Toast 组件中的 showToast 函数
	}
</script>

<section class="h-100vh w-full flex items-center">
	<Toast bind:this="{toastRef}" />
	<div class="w-1/2 h-full bg-sky">asdfa</div>
	<div class="w-1/2 flex justify-center items-center">
		<div class="login-container rounded-xl p-6 w-90 <xl:w-70">
			<h2>{state === 'login' ? '登录' : '注册'}</h2>
			<form on:submit|preventDefault="{async (e) => handleSubmit(e)}">
				<input
					bind:value="{username}"
					type="text"
					placeholder="用户名"
					required
				/>
				<input
					bind:value="{password}"
					type="password"
					placeholder="密码"
					required
				/>
				<button class="first-button" type="submit"
					>{state === 'login' ? '登录' : '注册'}</button
				>
				<div class="text-end">
					<button
						class=" p-2 cursor-pointer rounded-xl border w-1/3 hover:text-light hover:bg-[#45a049]"
						on:click="{() => {
							state !== 'resign' ? (state = 'resign') : (state = 'login');
						}}">{state == 'resign' ? '前往登录' : '前往注册'}</button
					>
				</div>
			</form>
		</div>
	</div>
</section>

<style lang="scss" scoped>
	.first-button {
		@apply p-2 cursor-pointer rounded-xl bg-[#4caf50] mb-2 text-white w-full hover:bg-[#45a049];
	}
	.login-container {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

		text-align: center;
	}

	.login-container input {
		@apply border;
		box-sizing: border-box;
		margin: 8px 0;
		padding: 10px;
		width: 100%;
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import { preferences, UserStruct } from '../../store';
	import { goto } from '$app/navigation';
	import { messageStore } from '@/components/common/message/store';

	let state = 'login';
	let username = 'admin';
	let password = 'admin';
	let user = new UserStruct();

	onMount(() => {
		// console.log('[ $preferences ] >', $preferences);
		// $preferences.id = 1;
	});

	async function resetInfo() {
		//更新userInfo
		const { msg, type, res, response } = await user.refreshUserInfo();
		$messageStore = [...$messageStore, { msg: msg, type: 'success' }];
		if (response && response.ok) {
			$preferences = user; // getInfo成功后，更新本地数据
		}
	}

	export async function handleSubmit(
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
	) {
		//  处理登录请求
		event.preventDefault();
		const { msg, type, response } = await user.login(username, password);
		$messageStore = [...$messageStore, { msg: msg, type: 'success' }];
		if (response && response.ok) {
			$preferences = user; //登录成功后，更新本地数据
			await resetInfo();
			goto('/');
		}
	}
</script>

<section class="h-100vh w-full flex">
	<div class="w-1/2 h-full bg-sky"></div>
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

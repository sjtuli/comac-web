<script lang="ts">
	import { onMount } from 'svelte';

	let selectedCollege = '';
	let selectedClass = '';
	let selectedTeacher = '';
	let remarks = '';
	let parts = [
		{ name: 'Part 1', params: 5, scale: '100%', points: 200, number: 3 },
		{ name: 'Part 2', params: 8, scale: '100%', points: 200, number: 3 },
		{ name: 'Part 3', params: 10, scale: '100%', points: 200, number: 3 },
	];

	let totalPoints = 0;

	$: {
		totalPoints = parts.reduce((sum, part) => sum + part.points, 0);
	}

	const handleSubmit = async () => {
		const orderData = {
			college: selectedCollege,
			class: selectedClass,
			teacher: selectedTeacher,
			remarks: remarks,
			parts: parts,
			totalPoints: totalPoints,
		};

		try {
			const response = await fetch('your_api_endpoint', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(orderData),
			});

			if (response.ok) {
				alert('订单提交成功！');
			} else {
				alert('订单提交失败，请重试。');
			}
		} catch (error) {
			console.error('网络请求失败：', error);
		}
	};

	let colleges = [];

	onMount(async () => {
		// 模拟异步加载学院列表
		colleges = ['College A', 'College B', 'College C'];
	});
</script>

<section class="w-full p-6 bg-gray-100">
	<div class="max-w-screen-lg mx-auto bg-white p-8 rounded-md shadow-md">
		<h2 class="text-2xl font-bold mb-6">3D打印订单</h2>
		<div class="flex justify-between mb-5">
			<div class=" flex items-center">
				<label for="college" class="block text-sm font-semibold mb-2 w-15"
					>学院：</label
				>
				<select
					id="college"
					bind:value="{selectedCollege}"
					class="w-30 p-2 border rounded"
				>
					{#each colleges as college (college)}
						<option value="{college}">{college}</option>
					{/each}
				</select>
			</div>

			<div class=" flex items-center">
				<label for="class" class="block text-sm font-semibold mb-2 w-15"
					>班级：</label
				>
				<input
					id="class"
					bind:value="{selectedClass}"
					type="text"
					class=" p-2 border rounded w-30"
				/>
			</div>

			<div class=" flex items-center">
				<label for="teacher" class="block text-sm font-semibold mb-2 w-25"
					>指导老师：</label
				>
				<input
					id="teacher"
					bind:value="{selectedTeacher}"
					type="text"
					class="w-20 p-2 border rounded"
				/>
			</div>
		</div>

		<div class="mb-4">
			<label for="remarks" class="block text-sm font-semibold mb-2"
				>打印用途/备注：</label
			>
			<textarea
				id="remarks"
				bind:value="{remarks}"
				class="w-full p-2 border rounded"
			></textarea>
		</div>
		<hr />

		<table class="w-full mb-4">
			<thead>
				<tr>
					<th class="py-2">零件名称</th>
					<th class="py-2">参数</th>
					<th class="py-2">缩放</th>
					<th class="py-2">积分</th>
					<th class="py-2">数量</th>
				</tr>
			</thead>
			<tbody>
				{#each parts as part (part.name)}
					<tr>
						<td class="py-2">{part.name}</td>
						<td class="py-2">{part.params}</td>
						<td class="py-2">{part.scale}</td>
						<td class="py-2">{part.points}</td>
						<td class="py-2">{part.number}</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<td class="font-semibold py-2">合计积分：</td>
					<td class="font-semibold py-2">{totalPoints}</td>
				</tr>
			</tfoot>
		</table>

		<button on:click="{handleSubmit}" class="bg-blue-500 text-white p-2 rounded"
			>提交订单</button
		>
	</div>
</section>

<style>
	table {
		@apply w-full border-collapse table-auto text-base;
	}

	th,
	td {
		@apply py-2 px-4 border;
	}

	th {
		@apply bg-gray-100 dark:bg-gray-800;
	}

	td {
		@apply bg-white dark:bg-gray-700;
	}
	tr:nth-child(even) {
		background-color: #f2f2f2;
	}

	tr {
		@apply bg-black;
	}
</style>

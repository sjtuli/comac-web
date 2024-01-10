<!-- Table.svelte -->
<script lang="ts">
	import { page } from '$app/stores';

	// 模拟数据
	const data = [
		{
			id: 1,
			orderNumber: '2022001',
			class: 'Class A',
			college: 'Engineering',
			teacher: 'John Doe',
			description: 'Description 1',
			status: 'Pending',
			createTime: '2023-01-01',
			totalPrice: '$100',
			help: 'Yes',
			review: 'Pending',
		},
		{
			id: 3,
			orderNumber: '2022001',
			class: 'Class A',
			college: 'Engineering',
			teacher: 'John Doe',
			description: 'Description 1',
			status: 'Pending',
			createTime: '2023-01-01',
			totalPrice: '$100',
			help: 'Yes',
			review: 'Pending',
		},
		{
			id: 5,
			orderNumber: '2022001',
			class: 'Class A',
			college: 'Engineering',
			teacher: 'John Doe',
			description: 'Description 1',
			status: 'Pending',
			createTime: '2023-01-01',
			totalPrice: '$100',
			help: 'Yes',
			review: 'Pending',
		},
	];
</script>

<table>
	<thead>
		<tr>
			<th>ID</th>
			<th>订单号</th>
			<th>班级</th>
			<th>学院</th>
			<th>指导老师</th>
			<th>申请描述</th>
			<th>状态</th>
			<th>创建时间</th>
			<th>总价</th>
			<th>审核</th>
			<th>操作</th>
			{#if $page.route.id === '/[user_id=integer]'}
				<th>取消</th>
			{/if}
		</tr>
	</thead>
	<tbody>
		{#each data as item (item.id)}
			<tr>
				<td>{item.id}</td>
				<td>{item.orderNumber}</td>
				<td>{item.class}</td>
				<td>{item.college}</td>
				<td>{item.teacher}</td>
				<td>{item.description}</td>
				<td>{item.status}</td>
				<td>{item.createTime}</td>
				<td>{item.totalPrice}</td>
				<td>{item.review}</td>
				<td>
					<button class="bg-blue-500 text-white py-1 px-2 rounded">编辑</button>
				</td>
				{#if $page.route.id === '/[user_id=integer]'}
					<td>
						<button class="bg-red-500 text-white py-1 px-2 rounded">取消</button
						>
					</td>
				{/if}
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
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

	.responsive-table {
		@apply block sm:table;
	}
</style>

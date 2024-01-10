<script lang="ts">
	// 假设有三个数据集
	const dataSets = [
		[
			{
				id: 1,
				username: 'User1',
				email: 'user1@example.com',
				phone: '123-456-7890',
				role: 'Admin',
				points: true,
				status: 'Active',
				createdAt: '2023-01-01',
			},
			// 添加更多行...
		],
		[
			{
				id: 2,
				username: 'User2',
				email: 'user2@example.com',
				phone: '987-654-3210',
				role: 'User',
				points: false,
				status: 'Inactive',
				createdAt: '2023-02-01',
			},
			// 添加更多行...
		],
		[
			{
				id: 3,
				username: 'User3',
				email: 'user3@example.com',
				phone: '555-123-4567',
				role: 'Guest',
				points: true,
				status: 'Active',
				createdAt: '2023-03-01',
			},
			// 添加更多行...
		],
	];
</script>

<table class="mb-4">
	<thead>
		<tr>
			<th>ID</th>
			<th>用户名</th>
			<th>邮箱</th>
			<th>手机号</th>
			<th>角色</th>
			<th>是否发过积分</th>
			<th>状态</th>
			<th>创建时间</th>
			<th>操作</th>
		</tr>
	</thead>
	<tbody>
		{#each dataSets as dataSet, i (i)}
			{#each dataSet as row (row.id)}
				<tr>
					<td>{row.id}</td>
					<td>{row.username}</td>
					<td>{row.email}</td>
					<td>{row.phone}</td>
					<td>{row.role}</td>
					<td>{row.points ? '是' : '否'}</td>
					<td>{row.status}</td>
					<td>{row.createdAt}</td>
					<td>编辑 / 删除</td>
				</tr>
			{/each}
		{/each}
	</tbody>
</table>

<style lang="scss" scoped>
	/* 添加样式 */
	table {
		border-collapse: collapse;
		width: 100%;
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
		text-align: center;
	}

	th {
		background-color: #f2f2f2;
	}

	tr:hover {
		background-color: #f5f5f5;
	}
</style>

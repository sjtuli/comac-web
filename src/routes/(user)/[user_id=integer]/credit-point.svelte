<!-- App.svelte -->
<script lang="ts">
	let data = [
		{
			date: '2023-01-01',
			description: '购物',
			consumedPoints: 50,
			remainingPoints: 950,
		},
		{
			date: '2023-02-15',
			description: '餐饮',
			consumedPoints: 30,
			remainingPoints: 920,
		},
		{
			date: '2023-03-20',
			description: '旅行',
			consumedPoints: 80,
			remainingPoints: 840,
		},
	];
</script>

<table>
	<thead>
		<tr>
			<th>日期</th>
			<th>说明</th>
			<th>消费积分</th>
			<th>剩余积分</th>
		</tr>
	</thead>
	<tbody>
		{#each data as { date, description, consumedPoints, remainingPoints }, i (i)}
			<tr class="dark:bg-gray-800">
				<td>{date}</td>
				<td>{description}</td>
				<td>{consumedPoints}</td>
				<td>{remainingPoints}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss" scoped>
	:global(:root) {
		--bg-color: #f8f8f8;
		--text-color: #333;
	}

	@media (prefers-color-scheme: dark) {
		:global(:root) {
			--bg-color: #1a1a1a;
			--text-color: #fff;
			--border-color: #444;
		}
	}

	table {
		margin-top: 20px;
		border-collapse: collapse;
		width: 100%;
	}

	th,
	td {
		--border-color: #ddd;
		border: 1px solid var(--border-color);
		padding: 10px;
		text-align: center;
	}

	th {
		@apply bg-gray-100;
		font-weight: bold;
	}

	tr:hover {
		background-color: #f5f5f5;
	}

	tr:nth-child(even) {
		background-color: #f2f2f2;
	}
</style>

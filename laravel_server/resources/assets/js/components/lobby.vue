<template>
	<div>
		<table class="table table-striped">
			<thead>
				<tr>
					<th>ID</th>
					<th>Player 1</th>
					<th>Player 2</th>
					<th>Player 3</th>
					<th>Player 4</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="game in games"  :key="game.gameID">
					<td>{{ game.gameID }}</td>
					<td>{{ game.player1 }}</td>
					<td v-if="game.player2">{{ game.player2 }}</td>
					<td v-if="!game.player2">Waiting for player 2</td>
					<td v-if="game.player3">{{ game.player3 }}</td>
					<td v-if="!game.player3">Waiting for player 3</td>
					<td v-if="game.player4">{{ game.player4 }}</td>
					<td v-if="!game.player4">Waiting for player 4</td>
					<td>
						<a class="btn btn-xs btn-primary" v-on:click.prevent="join(game)">Join</a>
					</td>
				</tr>
			</tbody>
		</table>

	</div>
</template>

<script type="text/javascript">
	// Component code (not registered)
	module.exports={
		props: ['games'],
        methods: {
            join(game) {
            	this.$emit('join-click', game);
            },		
        },		
	}
</script>

<style scoped>

</style>
<script>
	import {invoke} from '@tauri-apps/api/tauri';

	let name = '';
	let greetMessage = '';

	async function greet() {
		greetMessage = await invoke('greet', {name});
	}
</script>

<div>
	<input placeholder="Enter a name..." bind:value="{name}">
	<button on:click="{greet}">Greet</button>
	<p>{greetMessage}</p>
</div>

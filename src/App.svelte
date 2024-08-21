<script>
	import { Router, Route } from 'svelte-navigator';
	import TV4Play from './routes/tv4play.svelte';
	import Spotify from './routes/spotify.svelte';
	import Hbo from './routes/hbo.svelte';
</script>
  
<Router>
	<Route path="/tv4play" component={TV4Play} />
	<Route path="/spotify" component={Spotify} />
	<Route path="/hbo" component={Hbo} />
</Router>

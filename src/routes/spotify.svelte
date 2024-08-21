<script>
    import AppTemplate from '../components/AppTemplate.svelte';
  
    const spotifyProps = {
      appName: "Spotify",
      appLogo: "./assets/spotify-logo.png",
      appColor: "#00D149",
      castLogo: "./assets/icon-casting-spotify.png"
    };
  </script>
  
  <AppTemplate {...spotifyProps} />
  
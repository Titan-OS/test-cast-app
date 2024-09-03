<script>
    import {onMount, onDestroy} from 'svelte';

    export let appName;
    export let appLogo;
    export let appColor;
    export let airServerLogo = '/assets/airserver-logo.png';
    export let castLogo = '/assets/icon-casting.png';
    let deviceName;

    onMount(() => {
        typeof AirServerAppStart === "function" && AirServerAppStart();
        deviceName = typeof getDeviceUserFriendlyName === "function" ? getDeviceUserFriendlyName() : '[TV NAME]';

        window.addEventListener('beforeunload', handleBeforeDestroy);
        window.addEventListener('keydown', handleKeyDown);
    });

    onDestroy(() => {
        window.removeEventListener('beforeunload', handleBeforeDestroy);
        window.removeEventListener('keydown', handleKeyDown);
    });

    const handleBeforeDestroy = () => {
        typeof AirServerAppStop === "function" && AirServerAppStop();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Backspace') {
            typeof AirServerAppStop === "function" && AirServerAppStop();
        }
    };

</script>

<div class="fullscreen-container">
    <div class="blurred-background" style="background-color: {appColor};"></div>
    <div class="content">
        <div class="description">
            <img src={appLogo} alt={appName} class="app-logo"/>
            <div class="title-section">
                <h1>{appName} is coming soon</h1>
                <p>We are working on bringing it to your TV as soon as possible. Meanwhile, use AirServer to cast from
                    your mobile device.</p>
            </div>
        </div>

        <div class="how-it-works">
            <div class="how-it-works-content">
                <p>STREAMING MOBILE APPS ON YOUR TV</p>
                <h2>How it works</h2>
                <p>
                    Make sure your mobile device and TV are on the same Wi-Fi network. Launch the <span
                        class="highlight">{appName}</span> app and tap the cast icon
                    <img src={castLogo} alt="Cast logo" class="cast-logo"/><br/>
                    Select <span class="highlight">{deviceName}</span> to begin casting. Enjoy!
                </p>
            </div>
            <div class="powered-by">
                <p class="powered-text">POWERED BY</p>
                <img src={airServerLogo} alt="AirServer logo" class="airserver-logo"/>
            </div>
        </div>
    </div>
</div>

<style>
    .fullscreen-container {
        display: flex;
        width: 100%;
        height: 100%;
        position: relative;
        background-color: black;
    }

    .blurred-background {
        position: absolute;
        bottom: 10%;
        right: 5%;
        width: 3560px;
        height: 1583px;
        border-radius: 3560px;
        opacity: 0.2;
        background: #E8001C;
        filter: blur(400px);
        z-index: 0;
    }

    .content {
        display: flex;
        padding: 160px;
        position: relative;
        z-index: 1;
    }

    .description {
        width: 888px;
        padding-top: 116px;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .title-section {
        display: flex;
        flex-direction: column;
        gap: 24px;
        width: 580px;
    }

    .how-it-works {
        width: 672px;
        border-radius: 24px;
        background: rgba(0, 0, 0, 0.8);
        padding: 56px 64px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .how-it-works-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 40px;
    }

    h1, h2 {
        font-size: 64px;
        font-weight: 500;
        line-height: 64px;
        color: white;
        margin: 0;
    }

    p {
        color: rgba(255, 255, 255, 0.6);
        font-size: 28px;
        font-weight: 300;
        line-height: 40px;
        margin: 0;
    }

    .availability {
        font-size: 32px;
        line-height: 48px;
        font-weight: 500;
        color: white;
    }

    .highlight {
        font-weight: bold;
        color: white;
    }

    .powered-by {
        display: flex;
        flex-direction: column;
    }

    .powered-text {
        text-transform: uppercase;
        font-size: 24px;
        line-height: 32px;
    }

    .app-logo {
        width: 160px;
        height: 160px;
        border-radius: 6px;
        border: 2px solid #000;
    }

    .airserver-logo {
        width: 225px;
        height: 32px;
    }

    .cast-logo {
        width: 36px;
        height: 31px;
        flex-shrink: 0;
    }

    .title-section > h1 {
        width: 780px;
    }

</style>

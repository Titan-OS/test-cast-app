//
// Place any custom JS here
//

var card = document.querySelector("#card"),
	cardWrapper = document.querySelector("#card-wrapper"),
	clock = document.querySelector("#clock"),
	homescreen = document.querySelector("#homescreen"),
	language;

if (typeof AirServerAppStart === "function") {
	AirServerAppStart();
}

if (typeof AirServerAppStop === "function") {
	window.addEventListener("beforeunload", AirServerAppStop);
}

async function fetchDataJSON() {
	const response = await fetch("./data.json?v=5");

	const data = await response.json();

	return data;
}

function translate(data) {
	var changed = false,
		languages = Object.keys(data.subtitle),
		preferredLanguage = navigator.language.toLowerCase();

	if (!languages.includes(preferredLanguage)) {
		if (language !== languages[0]) {
			changed = true;
			language = languages[0];
		}
	} else if (language !== preferredLanguage) {
		if (language && language.includes("en") && preferredLanguage.includes("en")) {
			language = preferredLanguage;
		} else {
			changed = true;
			language = preferredLanguage;
		}
	}

	if (changed) {
		const newI = document.createElement("i"),
			  newSpan = document.createElement("span"),
		  	  newStrong = document.createElement("strong");

		var name,
			newContent,
			newContent2,
			newContent3,
			newContent4,
			text = document.querySelector("#text"),
			translation = data.text[language].match(/(.+)([\.|。|\[].+)(\[.+\])(.+)/);

		document.querySelector("#subtitle").innerText = data.subtitle[language];
		document.querySelector("#title").innerText = data.title[language];
		text.innerHTML = "";
		newContent = document.createTextNode(translation[1] + " ");
		text.appendChild(newContent);
		newI.classList = "fa-regular fa-screencast";
		text.appendChild(newI);
		if (translation[2].includes("[Icon]")) {
			translation[2] = translation[2].replace("[Icon]", "");
		}

		newContent2 = document.createTextNode(translation[2]);
		text.appendChild(newContent2);
		newSpan.classList = "text-nowrap text-warning";
		newStrong.appendChild(newSpan);
		text.appendChild(newStrong);
		if (typeof getDeviceUserFriendlyName !== "function") {
			name = translation[3];
		} else {
			name = getDeviceUserFriendlyName();
		}

		newContent3 = document.createTextNode(name);
		newSpan.appendChild(newContent3);
		newContent4 = document.createTextNode(translation[4]);
		text.appendChild(newContent4);
	}
}

fetchDataJSON().then(data => {
	translate(data);
	window.addEventListener("focus", function() {
		translate(data);
	});
});

document.documentElement.style.fontSize = ((window.innerHeight / 1080) * 200).toString() + "%";
function setPosition() {
	cardWrapper.style.left = ((homescreen.offsetWidth / 2) - (cardWrapper.offsetWidth / 2)).toString() + "px";
	cardWrapper.style.top = ((homescreen.offsetHeight / 2) - (cardWrapper.offsetHeight / 2)).toString() + "px";
	cardWrapper.classList.remove("start-50", "top-50", "translate-middle");
	card.removeEventListener("animationend", setPosition);
}

card.addEventListener("animationend", setPosition);
function fadeOut() {
	cardWrapper.style.left = Math.floor(Math.random() * (homescreen.offsetWidth - this.offsetWidth)).toString() + "px";
	cardWrapper.style.top = Math.floor(Math.random() * (homescreen.offsetHeight - this.offsetHeight)).toString() + "px";
	card.classList.remove("animate__fadeOut");
	card.removeEventListener("animationend", fadeOut);
	card.classList.add("animate__fadeIn");
}

function reposition() {
	if (card.classList.contains("animate__fadeIn")) {
		card.classList.remove("animate__fadeIn");
	} else {
		card.classList.remove("animate__delay-1s", "animate__fadeInUp");
	}

	card.addEventListener("animationend", fadeOut);
	card.classList.add("animate__fadeOut");
}

setInterval(reposition, 300000);

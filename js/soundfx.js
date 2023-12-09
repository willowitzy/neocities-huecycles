// Mouseover/ Click sound effect- by JavaScript Kit (www.javascriptkit.com)
// Visit JavaScript Kit at http://www.javascriptkit.com/ for full source code

//** Usage: Instantiate script by calling: var uniquevar=createsoundbite("soundfile1", "fallbackfile2", "fallebacksound3", etc)
//** Call: uniquevar.playclip() to play sound

var html5_audiotypes={ //define list of audio file extensions and their associated audio types. Add to it if your specified audio file isn't on this list:
	"mp3": "audio/mpeg",
	"mp4": "audio/mp4",
	"ogg": "audio/ogg",
	"wav": "audio/wav"
};

//Initialize two sound clips with 1 fallback file each:
var mouseoversound=createsoundbite(
	"./assets/audio/ui_move.wav", "./assets/audio/ui_move.ogg", 	// <-- Path relative to the root level
	"../assets/audio/ui_move.wav", "../assets/audio/ui_move.ogg", 	// <-- Path relative to subfolders
	"../../assets/audio/ui_move.wav", "../../assets/audio/ui_move.ogg" 	// <-- Path relative to sub-subfolders
);
var clicksound=createsoundbite(
	"./assets/audio/ui_select.wav", "./assets/audio/ui_select.ogg",
	"../assets/audio/ui_select.wav", "../assets/audio/ui_select.ogg",
	"../../assets/audio/ui_select.wav", "../../assets/audio/ui_select.ogg",
);
var clickdenysound=createsoundbite(
	"./assets/audio/ui_cant_select.wav", "./assets/audio/ui_cant_select.ogg",
	"../assets/audio/ui_cant_select.wav", "../assets/audio/ui_cant_select.ogg",
	"../../assets/audio/ui_cant_select.wav", "../../assets/audio/ui_cant_select.ogg"
);

var domInteracted = false;
document.addEventListener("click", function () {
	domInteracted = true;
});

// Add 'ended' event listener for both audio elements
mouseoversound.addEventListener('ended', function () {
	console.log('Mouseover sound ended');
});
  
clicksound.addEventListener('ended', function () {
	console.log('Click sound ended');
});

clickdenysound.addEventListener('ended', function () {
	console.log('Click deny sound ended');
});

function createsoundbite(sound) {
	var html5audio=document.createElement('audio');

	if (html5audio.canPlayType){ //check support for HTML5 audio
		for (var i=0; i<arguments.length; i++) {
			var sourceel=document.createElement('source');
			sourceel.setAttribute('src', arguments[i]);
			if (arguments[i].match(/\.(\w+)$/i))
				sourceel.setAttribute('type', html5_audiotypes[RegExp.$1]);
			html5audio.appendChild(sourceel);
		}
		html5audio.load();
		html5audio.playclip = function() {
			html5audio.pause();
			html5audio.currentTime=0;
			html5audio.play();
		};
		return html5audio;
	}
	else{
		return {playclip:function(){throw new Error("Your browser doesn't support HTML5 audio :(")}};
	}
}

// Call this function in the onmouseenter event
function hoverSound() {
	if (domInteracted) {
	  mouseoversound.playclip();
	}
}

// Call this function in the onclick event
function clickSound() {
	clicksound.playclip();
}

// Call this function in the onclick event (when you can't select something)
function clickDenySound() {
	clickdenysound.playclip();
}

// Call this function in the onclick event of an anchor
async function clickSoundLoad(event) {
	// Navigate to the next page after the sound finishes playing
	if (domInteracted) {
		// Prevent the default behavior of the click event
		event.preventDefault();

       	// Play the click sound and wait for it to finish before proceeding
	   	await clicksound.playclip();
		
		// Check if the target element or its parent is an anchor (<a>) element
		const targetElement = event.target;
		const anchorElement = targetElement.tagName.toLowerCase() === 'a' ? targetElement : targetElement.closest('a');

		// If the target element or its parent is an anchor...
		if (anchorElement) {
			const link = anchorElement.getAttribute('href'); // Get the link

			// Delay - 500 miliseconds -> half a second
			setTimeout(() => { window.location.href = link; }, 500);
		}
	}	
	else {} // If DOM wasn't interacted, the anchor will execute its default behavior
}
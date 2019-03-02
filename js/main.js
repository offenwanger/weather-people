// CHeck for browser support
if ('speechSynthesis' in window) {
	supports.innerHTML = 'Speech synthesis suppported.';
} else {
	supports.innerHTML = 'speech synthesis not supported';
}

var button = document.getElementById('speak');
var customSpeechInput = document.getElementById('custom-speech');

let voiceName;
// Fetch the list of voices and populate the voice options.
function loadVoices() {
  // Fetch the available voices.
	var voices = speechSynthesis.getVoices();
  
  // Loop through each of the voices.
	voices.forEach(function(voice) {
    if(voice.name == "Google UK English Female") {
      voiceName = voice.name;
    }
	});
}
loadVoices();

// Chrome apparently loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(e) {
  loadVoices();
};

function speak(text) {
  var msg = new SpeechSynthesisUtterance();
  
  msg.text = text;
  msg.volume = 1;
	msg.rate = 1;
	msg.pitch = 1;
  
  if (voiceName) {
		msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceName; })[0];
	}
  
  window.speechSynthesis.speak(msg);
}


// Set up an event listener for when the 'speak' button is clicked.
button.addEventListener('click', function(e) {
	if (customSpeechInput.value.length > 0) {
		speak(customSpeechInput.value);
	}
});
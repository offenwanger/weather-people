$(function () {
    var socket = io();

    let voiceName;

    $(document).ready(function () {
        $(window).on('load', function () {
            $("#myModal").modal({
                backdrop: 'static',
            });
        });

        $("#feedback-button").click(function () {
            $("#myModal1").modal();
        });
    });

    /* Adapted from: https://codepen.io/aeewhite/pen/BjzbOL */
    $('#record-button').addClass("notRec");
    $('#record-button').click(function () {
        if ($('#record-button').hasClass('notRec')) {
            $('#record-button').removeClass("notRec");
            $('#record-button').addClass("Rec");
            $('#record-button').removeClass("thinking");

        }
        else {
            $('#record-button').removeClass("Rec");
            $('#record-button').addClass("notRec");
            $('#record-button').addClass("thinking");
        }
    });

    $('.kv-ltr-theme-fas-star').rating({
        hoverOnClear: false,
        theme: 'krajee-fas',
        containerClass: 'is-star'
    });

    $('#input-1-ltr-star-md').on('rating:change', function (event, value, caption) {
        socket.emit('rating', value);
        console.log(caption);
    });

    // CHeck for browser support
    if ('speechSynthesis' in window) {
        console.log('Speech synthesis suppported.');
    } else {
        console.log('speech synthesis not supported');
    }

    // Fetch the list of voices and populate the voice options.
    function loadVoices() {
        // Fetch the available voices.
        var voices = speechSynthesis.getVoices();

        // Loop through each of the voices.
        voices.forEach(function (voice) {
            if (voice.name == "Google UK English Female") {
                voiceName = voice.name;
            }
        });
    }
    loadVoices();

    // Chrome apparently loads voices asynchronously.
    window.speechSynthesis.onvoiceschanged = function (e) {
        loadVoices();
    };

    function speak(text) {
        var msg = new SpeechSynthesisUtterance();

        msg.text = text;
        msg.volume = 1;
        msg.rate = 1;
        msg.pitch = 1;

        if (voiceName) {
            msg.voice = speechSynthesis.getVoices().filter(function (voice) { return voice.name == voiceName; })[0];
        }

        window.speechSynthesis.speak(msg);
    }

    socket.on('utterance', function (msg) {
        speak(msg);
        $('#record-button').removeClass("thinking");
    });
});

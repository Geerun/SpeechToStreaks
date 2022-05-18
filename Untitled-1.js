var textHolder = document.getElementsByTagName('h1')[0],
  text = textHolder.innerHTML,
	chars = text.length,
	newText = '',
	i;	

for (i = 0; i < chars; i += 1) {
	newText += '<i>' + text.charAt(i) + '</i>';
}

textHolder.innerHTML = newText;

var letters = document.getElementsByTagName('i'),
	flickers = [5, 7, 9, 11, 13, 15, 17],
	randomLetter,
	flickerNumber,
	counter;

function randomFromInterval(from,to) {
	return Math.floor(Math.random()*(to-from+1)+from);
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function flicker() {		
	counter += 1;
	
	if (counter === flickerNumber) {
		return;
	}

	setTimeout(function () {
		if(hasClass(randomLetter, 'off')) {
			randomLetter.className = '';
		}
		else {
			randomLetter.className = 'off';
		}

		flicker();
	}, 30);
}

(function loop() {
    var rand = randomFromInterval(500,3000);

	randomLetter = randomFromInterval(0, 3);
	randomLetter = letters[randomLetter];
	
	flickerNumber = randomFromInterval(0, 6);
	flickerNumber = flickers[flickerNumber];

    setTimeout(function() {
            counter = 0;
            flicker();
            loop();  
    }, rand);
}());

// /----------------------------------------/ 
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var noteTextarea = $('#result-area');
var noteContent = '';
let slot = '';

const dataSlot = {
    a37: 'S200088342',    р29: 'S200087929',    р30: 'S200087930',    r50: 'S200087950',    r55: 'S200087955',    r36: 'S200087936',    
    r73: 'S200087973',    r10: 'S200087910',    r101: 'S200088001',    r142: 'S200088042',    t141: 'S200088311',    t142: 'S200088312',
    т10: 'S200088180',    t13: 'S200088183',    т15: 'S200088185',    т25: 'S200088195',    т50: 'S200088220', t121: 'S200088291',    
    т98: 'S200088268',    c142: 'S200088177',    s10: 'S200088045',    с30: 'S200088065',    s31: 'S200088066',    s120: 'S200088155',    
    s97: 'S200088132',
}



recognition.continuous = true;
recognition.start();

// This block is called every time the Speech APi captures a line. Ф
recognition.onresult = function(event) {
    var noteContent = '';
    var current = event.resultIndex;
    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;
    let  s = transcript.toLowerCase().replace(/[^\a-zа-я0-9]/g, "");
     slot = dataSlot[s];
     source = 'https://barcode.tec-it.com/barcode.ashx?data=' + slot + '&code=Code128&translate-esc=on';
     document.getElementById('shtrihPicture').src = source;
   
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
    if (!mobileRepeatBug) {
        // noteContent += s;
        noteTextarea.val(s);
    }
};

$('#button').on('click', function(e) {
    document.documentElement.requestFullscreen();
    if (noteContent.length) {
        noteContent = '';
        noteTextarea.val('');
    }
    recognition.start();
});

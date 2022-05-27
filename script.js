
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var noteTextarea = $('#result-area');
var noteContent = '';
let slot = '',
sl = '',
w = '';
const t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 'S200088179']; //9i slot
const s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 'S200088044'];
const r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 'S200087909'];

function makeSlot() {for (let i = 10; i <=142; i++){
    t[i]=('S' + (200088170+i)); 
    console.log(' t '+i + ' '+t[i])
    s[i]=('S' + (200088035+i));
    console.log(' s '+i + ' '+s[i])
    r[i]=('S' + (200087900+i));
    console.log(' r '+i + ' '+r[i])
}
}
makeSlot();
recognition.continuous = true;
recognition.start();

// This block is called every time the Speech APi captures a line. Ф
recognition.onresult = function(event) {
    var noteContent = '';
    var current = event.resultIndex;
    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;
       sl = transcript.toLowerCase().replace(/[^0-9]/gim,'');
       w = transcript.toLowerCase().replace(/[^а-я,a-z,А-Я,A-Z]/gim,'');
        
        console.log(w + sl)

        switch (w) {
            case 't' || 'т':
                getBarcode(t)
                break;
            case 'с' || 's':
                getBarcode(s)
                break;
            case 'r' || 'р':
                getBarcode(r)
                    break;
        
            default:
                break;
        }
        
   
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
    if (!mobileRepeatBug) {
        noteTextarea.val(sl);
    }
};

function getBarcode(row){
    slot = row[sl]
    source = 'https://barcode.tec-it.com/barcode.ashx?data=' + slot + '&code=Code128&translate-esc=on';
    document.getElementById('shtrihPicture').src = source;
}

$('#button').on('click', function(e) {
    // document.documentElement.requestFullscreen();
    if (noteContent.length) {
        noteContent = '';
        noteTextarea.val('');
    }
    recognition.start();
});

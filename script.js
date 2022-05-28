var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var Textarea = document.getElementById('title');
let slot = '',
sl = '',
w = '';
const t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 'S200088179']; //9i slot
const s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 'S200088044'];
const r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 'S200087909'];

function makeSlot() {for (let i = 10; i <=142; i++){
    t[i]=('S' + (200088170+i)); 
    // console.log(' t '+i + ' '+t[i])
    s[i]=('S' + (200088035+i));
    // console.log(' s '+i + ' '+s[i])
    r[i]=('S' + (200087900+i));
    // console.log(' r '+i + ' '+r[i])
}
}
makeSlot();

function getBarcode(row){
    slot = row[sl]
    source = 'https://barcode.tec-it.com/barcode.ashx?data=' + slot + '&code=Code128&translate-esc=on';
    document.getElementById('shtrihPicture').src = source;
}

recognition.continuous = true;
recognition.start();

// This block is called every time the Speech APi captures a line. Ф
recognition.onresult = function(event) {
    var current = event.resultIndex;
    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;
       sl = transcript.toLowerCase().replace(/[^0-9]/gim,'');
       w = transcript.toLowerCase().replace(/[^т,с,р,t,s,r]/gim,'');

        switch (w[0]) {
            case 'т':
            case 't':
                getBarcode(t)
                break;
            case 'с':
            case 's':
                getBarcode(s)
                break;
            case 'р':
            case 'r':
                getBarcode(r)
                    break;
            default:
                break;
        }
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
    if (!mobileRepeatBug) {
        Textarea.textContent = (w[0].toUpperCase() + sl);
    }
};

$('#button').on('click', function(e) {
    document.documentElement.requestFullscreen();
    Textarea.textContent = ('Listening...');
    document.getElementById('shtrihPicture').src = 'https://barcode.tec-it.com/barcode.ashx?data=' + slot + '&code=Code128&translate-esc=on';
    recognition.start();
});

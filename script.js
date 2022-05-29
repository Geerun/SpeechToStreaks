var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var Textarea = document.getElementById('title');
let slot = '',
sl = '',
w = '';
const t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 'S200088179']; //9i slot
const s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 'S200088044'];
const r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 'S200087909'];
const p = [0, 0, 0, 0, 0, 0, 0, 0, 0, 'S200087773'];
const o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 'S200087638'];
const a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 'S200088313'];



function makeSlot() {for (let i = 10; i <=142; i++){
    t[i]=('S' + (200088170+i)); 
    s[i]=('S' + (200088035+i));
    r[i]=('S' + (200087900+i));
    p[i]=('S' + (200087764+i)); 
    o[i]=('S' + (200087629+i));
    a[i]=('S' + (200088304+i));
}
}
makeSlot();

function getBarcode(row){
    slot = row[sl]
    source = 'https://barcode.tec-it.com/barcode.ashx?data=' + slot + '&code=Code128&translate-esc=on';
    document.getElementById('shtrihPicture').src = source;
}

recognition.lang = 'ru-ru';
recognition.continuous = true;
recognition.start();

// This block is called every time the Speech APi captures a line. Ф
recognition.onresult = function(event) {
    var current = event.resultIndex;
    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;
       sl = transcript.toLowerCase().replace(/[^0-9]/gim,'');
       w = transcript.toLowerCase().replace(/[^т,с,р,а,п,о,t,s,r,a,p,o]/gim,'');

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
            case 'o':
            case 'о':
                getBarcode(o)
                    break;
            case 'p':
            case 'п':
                getBarcode(p)
                break;
            case 'a':
            case 'а': //ru
                getBarcode(a)
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

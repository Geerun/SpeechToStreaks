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
const b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 'S200088448'];
const generalArray = ["A3515LAE77Q","C840N35444",'PER7G','S200131551'];
const generalArrayInterpritation = ["отвязка","техника","переборка","арбуз"];


function makeSlot() {for (let i = 10; i <=142; i++){
    t[i]=('S' + (200088170+i)); 
    s[i]=('S' + (200088035+i));
    r[i]=('S' + (200087900+i));
    p[i]=('S' + (200087765+i)); 
    o[i]=('S' + (200087630+i));
    a[i]=('S' + (200088305+i));
    b[i]=('S' + (200088440+i));
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
    //    w = transcript.toLowerCase().replace(/[^т,с,р,а,п,о,t,s,r,a,p,o]/gim,'');
       w = transcript.toLowerCase().replace(/[^a-z,а-я]/gim,'');

    // if (w == "переборка"){sl = 0; getBarcode(generalArray)} else {
    switch (w) {
        case "смена": 
            document.location = "/Calculate/index.html";
            break;
        case "отвязка":
            sl = 0; getBarcode(generalArray)
            break;
        case "техника":
            sl = 1; getBarcode(generalArray)
            break;
        case "переборка":
            sl = 2; getBarcode(generalArray)
            break;
        case "арбуз":
            sl = 3; getBarcode(generalArray)
            break;
        default:
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
            case 'b':
            case 'б':
                getBarcode(b)
                break;

            default:
                break;
        }
        
    }

    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
    if (!mobileRepeatBug) {
        Textarea.textContent = (generalArrayInterpritation.includes(w) ? w : (w[0].toUpperCase() + sl));    }
};

$('#button').on('click', function(e) {
    document.documentElement.requestFullscreen();
    Textarea.textContent = ('Listening...');
    recognition.start();
});


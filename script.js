
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
    s[i]=('S' + (200088035+i));
    r[i]=('S' + (200087900+i));
}
}
makeSlot();
//     a37: 'S200088342',    р29: 'S200087929',    р30: 'S200087930',    r50: 'S200087950',    r55: 'S200087955',    r36: 'S200087936',    
//     r73: 'S200087973',    r10: 'S200087910',    r101: 'S200088001',    r142: 'S200088042',    t141: 'S200088311',    t142: 'S200088312',
//     т10: 'S200088180',    t13: 'S200088183',    т15: 'S200088185',    т25: 'S200088195',    т50: 'S200088220', t121: 'S200088291',    
//     т98: 'S200088268',    c142: 'S200088177',    s10: 'S200088045',    с30: 'S200088065',    s31: 'S200088066',    s120: 'S200088155',    
//     s97: 'S200088132',

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
        console.log(sl)
        console.log(w)

        switch (w) {
            case 't','т':
                getBarcode(t)
                break;
            case 'с','s':
                getBarcode(s)
                break;
            case 'r','р':
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

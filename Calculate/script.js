function getOldData() {
   document.getElementById('pod').value = localStorage['pod'];
   document.getElementById('pop').value = localStorage['pop'];
   document.getElementById('per').value = localStorage['per'];
   document.getElementById('spus').value = localStorage['spus'];
}

function calculate() {
      var p, s, p1, p2, t, oo, sumo,toto, stazh,gsum = 0;
      p = +document.getElementById('pod').value;
      s = +document.getElementById('spus').value;
      p1 = +document.getElementById('pop').value;
      p2 = +document.getElementById('per').value;
      t = +document.getElementById('chas').value;
      
      toto = p+s+p1+p2;
      oo = (p1*7.7)+(p2*2.5)+(s*3.98)+(p*3.73);
      // stazh = (oo + t*64)/10;
      gsum = oo+t*64; //+stazh
      sumo = gsum*0.87;

document.getElementById('oper').textContent = ("Операций " + Math.floor(toto));
document.getElementById('popoper').textContent = ("За операции " + Math.floor(oo));
document.getElementById('okl').textContent = ("Оклад " + Math.floor(t*64));
document.getElementById('stg').textContent = ("Стаж " + Math.floor(stazh));
document.getElementById('itogo').textContent = ("Итого " + Math.floor(gsum));
document.getElementById('popop').textContent = (Math.floor(sumo)+" ");

localStorage.setItem("pod", p);
localStorage.setItem("spus", s);
localStorage.setItem("pop", p1);
localStorage.setItem("per", p2);
setTimeout("document.location = '../index.html'", 4000);
}

function clos() {
   document.getElementById('winres').display.none;}
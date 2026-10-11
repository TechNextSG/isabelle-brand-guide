// click a swatch to copy its hex; scroll reveals with a safety net
(function(){
  var t=document.createElement('div');t.className='toast';document.body.appendChild(t);var h;
  function toast(m){t.textContent=m;t.classList.add('on');clearTimeout(h);h=setTimeout(function(){t.classList.remove('on')},1400)}
  document.querySelectorAll('.sw').forEach(function(b){
    var hex=b.getAttribute('data-hex');
    b.querySelector('.chip').style.background=hex;
    b.addEventListener('click',function(){
      (navigator.clipboard?navigator.clipboard.writeText(hex):Promise.reject()).then(function(){toast(hex+' copied')},function(){toast(hex)});
      b.classList.add('copied');setTimeout(function(){b.classList.remove('copied')},1200);
    });
  });
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(e){io.observe(e)});
  }
  setTimeout(function(){els.forEach(function(e){e.classList.add('in')})},1500);
})();

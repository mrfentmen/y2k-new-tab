(function () {
  var f = document.getElementById('pv');
  var wb = document.getElementById('winbody');
  var icon = document.getElementById('winicon');
  var base = 'icons/icon16.png';
  function done() {
    window.__storeReady = true;
    window.dispatchEvent(new Event('store-ready'));
  }
  function measure() {
    var w = 360, h = 480;
    try {
      var doc = f.contentDocument;
      if (doc && doc.body) {
        w = Math.max(doc.body.scrollWidth, doc.documentElement ? doc.documentElement.scrollWidth : 0, 320);
        h = Math.max(doc.body.scrollHeight, doc.documentElement ? doc.documentElement.scrollHeight : 0, 180);
      }
    } catch (e) {}
    var scale = Math.min(800 / w, 560 / h, 1.6);
    f.width = w; f.height = h;
    wb.style.width = Math.round(w * scale) + 'px';
    wb.style.height = Math.round(h * scale) + 'px';
    f.style.transform = 'scale(' + scale + ')';
    f.style.transformOrigin = 'top left';
    if (icon && base) { icon.style.backgroundImage = 'url(' + base + ')'; icon.style.backgroundSize = 'cover'; }
    done();
  }
  window.addEventListener('load', function () {
    try {
      var doc = f.contentDocument;
      if (doc && doc.readyState === 'complete') { measure(); }
      else { f.addEventListener('load', measure); }
    } catch (e) { f.addEventListener('load', measure); }
    setTimeout(measure, 2500);
  });
  setTimeout(measure, 3500);
})();

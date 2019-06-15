var showFile = ( function() {
  var fr = new FileReader;
  fr.onload = function(e) {
      var li = document.createElement('li');
      li.innerHTML = "<img src='" + e.target.result + "' >";
      document.getElementById( 'list' ).appendChild(li);
  };
  return function(e) {
    var files = e.target.files, file, i;
    for (i = 0; file = files[i]; i++) {
      if (!f.type.match('image.*')) continue;
      fr.readAsDataURL(file);
    }
  }
} )()
  document.getElementById('files').addEventListener('change', showFile, false);
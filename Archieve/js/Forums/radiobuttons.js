<!DOCTYPE HTML>
<html>
<body>   

    <fieldset class = "onlyIt" style="position:absolute;margin:10px 0 0 300px">
      <legend>группа 1</legend>
      <input type="radio" name="two_01" value="1" id="1">1<br>
      <input type="radio" name="two_01" value="2" id="2">2<br>
      <input type="radio" name="two_01" value="3" id="3">3<br>
    </fieldset>
    <fieldset class = "onlyIt" style= "width:200px;">
      <legend>группа 2</legend>
      <input type="radio" name="0" value="1" id="4">4<br>
      <input type="radio" name="0" value="2" id="5">5<br>
      <input type="radio" name="0" value="3" id="6">6</label><br>
    </fieldset>
    <fieldset class = "onlyIt" style= "width:200px;">
      <legend>группа 3</legend>
      <input type="radio" name="1" value="1" id="7">7<br>
      <input type="radio" name="1" value="2" id="8">8<br>
      <input type="radio" name="1" value="3" id="9">9<br>
    </fieldset>

  <script>

uncheckAnothers = function(classForTest) {
	var 
		radiobuttons = document.querySelectorAll("fieldset." + classForTest + " input[type=radiobutton]"),
		fieldsets = document.querySelectorAll("fieldset." + classForTest),
		x
	;
	function unchecker(e) {
		e = e || window.event;
		var x, target = e.target || e.srcElement;
		if(target.type != "radio") return false;
		for(x = 0; x < radiobuttons.length; x++) {
			if (radiobuttons[x].parentNode !== this) {
				radiobuttons[x].checked = false;
			}
		}
	}
	for(x = 0; x < fieldsets.length; x++) {
		fieldsets[x].onclick = unchecker;
	}
}
uncheckAnothers("onlyIt");

  </script>
  
</body>
</html>
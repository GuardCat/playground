<script>
function cTest() {
	this.a=[];
	this.b="It's work!"

	this.insert= function (txt) {
		this.a.push(txt);
		return (this.a.length);
	}
	this.xOut= function () {
		alert(this.a);
	}
}

var r=new cTest;
r.insert("2");
r.insert("fgfh");
r.insert("odjsfhf");
r.xOut();
alert(r.b);
self.close();
</script>
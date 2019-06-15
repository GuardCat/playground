/* GCTesterClass */
var answers = [
	1, 2, [2,4,5]
]
try{test = new GCTester(1, 2, [2, 4, 5]);} catch(e) {alert(e)}
function GCTester(rightArray) {
	var testSource = document.getElementById("GCTest");
	var questions = testSource.innerHTML.split("~");
	var x, y, testCaption, div, quest, answer, questsElements = [];
	var multiple = false, button, label, qNumber;
 	testSource.innerHTML = ""; 
	for(x = 1; x < questions.length; x++) {
		questions[x] = questions[x].split("^");
		div = document.createElement("div");
		div.className = "GCTestBlock";
 		qNumber = document.createElement("p");
		qNumber.className 	= "GCTestQNumber";
		qNumber.innerHTML = "Вопрос " + x + " из " + questions.length;
		div.appendChild(qNumber);
		quest = document.createElement("p");
		quest.className 	= "GCTestQuestion";
		if(questions[x][0].substr(0,1) === "*") {
			multiple = true;
			questions[x][0] = questions[x][0].substr(1);
		} else {
			multiple = false;
		}
		quest.innerHTML = questions[x][0];
		div.appendChild(quest);
		for(y = 1; y < questions[x].length; y++) {
			answer = document.createElement("input");
			label = document.createElement("p");
 			answer.type = multiple ? "checkbox" : "radio";
			answer.name = "q" + x;
			label.className = "GCTestAnswer";
 			label.appendChild(answer); 
			label.innerHTML += y + ". " + questions[x][y];
			div.appendChild(label);
		}
		questsElements.push(div);
	}	
}

var 
	it = gc("#it"),
	haveLs = !!window.localStorage,
  
 	log = ( function() {
		var form = gc("#console"), oldMessage = "",
			num = 0;

		return function log(txt) {
			var message;

			if (txt != oldMessage) {
				oldMessage = txt;
				message = gc.toBorn(
					"div", 
					{
						className: "log",
						innerHTML: "<div></div>" + String(txt)
					}
				);
				form.insertBefore(message, form.querySelector(".log"));
				num = 1;
			} else {
				if (++num > 1) {
					form.querySelector(".log").querySelector("div").innerHTML = num;
				}
			}
			return txt;
		}
	})();


function killLocalStorage() {
  if (!haveLs) {
    noLs();
    return false;
  }
	if ( !confirm( "Точно удалить локальные данные?" ) ) return;
	localStorage.runnerTxt = '';
	log("Локальные данные очищены");
}

function cls() {
 it.value='';
 gc('#console').innerHTML = '';
 log('') 
}

function runIt() {
	try{
		log(String(eval.call(window, it.value)));
	} catch(e) {
		log(e.toString());
	}
}

function saveIt() {
  if (!haveLs) {
    noLs();
    return false;
  }
  window.localStorage.runnerTxt = it.value;
  log("Записано");
}

function readIt() {
	var text = window.localStorage ? window.localStorage.runnerTxt : false;
  if (!haveLs) {
    noLs();
    return false;
  }
	if (text) {
		it.value = text;
		log("Прочитано");
	} else {
		log("Нет сохранённых данных");
	}
}

function noLs() {
  var errorMessage = "Этот браузер не работает с localStorage."
  log(errorMessage);
}

function makeBookmarklet(txt) {
	if (txt.substr(0, 11) === "javascript:") return txt;
	txt = "javascript:(function(){" + txt;
	txt = txt.replace(/[\n\r]/g, "");
	txt = txt.replace(/\s{2,}/g, " ");
	txt = txt.replace(/\s*([\=+\*\+\-\/<>]|[\+\-\*!<>])\s*/g, "$1");
	txt = txt.replace(/\s*([\:\}\{\)\(\[\];,])\s*/g, "$1");
	return txt + "})()"; 
}

onload = function() {
	var 
		eventsForButtons = {
			"Go": runIt,
			"Cls": cls,
			"Read": readIt,
			"Save": saveIt,
			"Kill": killLocalStorage,
			"Bkmt": function() {
				it.value = makeBookmarklet(it.value);
			}
		}, x;
	readIt();
	
	for (x in eventsForButtons) {
		gc( "input[value=" + x + "]" ).addEventListener( "click", eventsForButtons[x], false );
	}

	normalizeWidth();
}
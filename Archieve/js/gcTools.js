/**
	gcTools.js сборник удобных инструментов
*/
(
	function (toolbox) {
 		var 
			element, nodeList,
			toolsObj, oldId, oldQuery
		; 
		window[toolbox] = {
			gid: function(id){
				id = id || oldId;
				if(id !== oldId) {
					oldId = id;
					element = document.getElementById(id);
					if(!element){
						throw("Функция gid() получила отсутствующий id.")
					}
				}
				return element;
			},
			
			gidVal: function(id, onlyText){
				var el;
				el = window[toolbox].gid(id);
				if(!el.value && (!el.value === "")) {// если нет свойства value
					return onlyText ? el.innerText : el.innerHTML
				}
				return el.value;
			},
			
			gidNum: function(id, onlyText) {
				return parseFloat(gidVal(id, onlyText));
			},
			
			/**
						Функция eventForEach устанавливает обработчик для каждого элемента
			 		в переданном ей массиве. Принимает: массив элементов, тип события (c "on"),
					функцию-обработчик,аргументы для обработчика.
			*/
			eventForEach: function(elements, e, handler){
				var x, args = Array.prototype.slice.call(arguments, 3);
				for (x = 0; x < elements.length; x++) {
					elements[x][e] = (
						function(args){
							return function() {
								handler.apply(this, args);
							}
						}
					)(args);
				}
			},
			toBorn: function(nodeName, values, parentNode){
				var x, element = document.createElement(nodeName);
				values = values || {};
				for(x in values){
					element[x] = values[x];
				}
				if(parentNode) {
					parentNode.appendChild(element);
				}
				return element;
			}
		}//tools object
	}// анонимная функция
)("gc")
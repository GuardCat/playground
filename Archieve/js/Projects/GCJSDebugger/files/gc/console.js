/* Объект, используемый вместо консоли */
( function(msgContainer, namespace) {
  var
    lastMessage,  n = 1, /* Для подсчета повторяющихся сообщений */
    icons = {
      info: "i",
      warn: "!",
      error: "x",
      log: "&gt;"
    } 
  ;
  namespace = namespace || window;
  
  /**
  */
  function _print(text, icon) {
    var 
      msg = document.createElement("table"), tr, tb, x, td,
      makeTd = function( parent, text, className, beforeThis ) {//  Костыль для уменьшения повторов кода
        var td = document.createElement("td");
        td.className = className;
        td.innerHTML = text;
        if (beforeThis) {
          parent.insertBefore(td, beforeThis)
        } else {
          parent.appendChild(td)
        }
        return td
      } 
    ;
    
    //if (text === "") text = '""';
    if ( !( icon in icons ) ) icon = "log";
    text = String(text);
    
    // Присваиваем таблице класс и создаем её базовую структуру
    msg.className = "msg-" + icon;
    msg.appendChild( tb = document.createElement( "tbody" ) );
    tb.appendChild( tr = document.createElement( "tr" ) );

    // Повторяющемуся сообщению увеличиваем счетчик и выходим
    if ( lastMessage && lastMessage.text === text && lastMessage.icon === icons[ icon ] ) {
      if ( !lastMessage.querySelector(".n") ) {
        td = makeTd( lastMessage.querySelector("tr"), n, "n", lastMessage.querySelector(".icon") )
      } else {
        td = lastMessage.querySelector(".n")
      }
      td.innerHTML = ++n;
      return false;
    } else {
      n = 1
    }
    
    // Создаем и наполняем ячейки
    makeTd(tr, icons[icon], "icon");
    makeTd(tr, text, "text");

    // Выводим сообщение
    if (lastMessage) {
      msgContainer.insertBefore(msg, lastMessage)
    } else {
      msgContainer.appendChild(msg)
    }
    
    lastMessage = msg;
    msg.text = text;
    msg.icon = icons[ icon ];
  }
  
  // Пульт управления консолью
  namespace["log"] = function(text) {
    _print(text, "log")
  };
    
  namespace["warn"] = function(text) {
    _print(text, "warn")
  };
    
  namespace["error"] = function(text) {
    _print(text, "error")
  };
    
  namespace["info"] = function(text) {
    _print( text, "info")
  };
    
  namespace["dir"] = function(obj) {
    for (var key in obj) {
      _print(".<b>" + key + ": </b>" + obj[key], "log")
    }
    _print("<b>Dir for </b>«" + obj.toString() + "». Elements: " + Object.keys(obj).length + ".", "info");
  };
    
  namespace["fullDir"] = function(obj) {
    try {
      var keys = Object.getOwnPropertyNames(obj), x;    
      for (x = 0; x < keys.length; x++) {
        _print("<b class = 'dir'>" + keys[x] + ": </b>" + obj[ keys[x] ], "log")
      }
      _print("<b>Full dir for </b>«" + obj.toString() + "». Elements: " + keys.length + "." , "warn");
    } catch(e) {
      _print(e, "error");
      _print("<b>Full dir is impossimble for </b>«" + obj.toString() + "»", "error");
    }
  };
    
  namespace["clear"] = function() {
    lastMessage = null;
    msgContainer.innerHTML = "";  
  }
       
} ) ( document.getElementById( "console" ), gc )
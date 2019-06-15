/* settings and aliases */
gc.gui = {
  source  : gc("#source"),            // Main textarea
  buttons : gc(".menuButtons > div[id]", true),
  console : gc("#console"),           // Console container
  settings: gc("#settingsForm")
}

gc.lsNamespace = "gcJSDebuggerLastSource";
gc.lsNamespaceForSettings = "gcJSDebuggerSettings";
gc.defaultSettings = {
  portrait  : 0.70,
  landscape : 0.55,
  tabType   : "	"
};
gc.settings = {};

/* functions for menu */
gc.menuEvents = {
  runSource: function() {
    var report;
    try {
      gc.log( eval.call( window, '"use strict";' + gc.gui.source.value ) )
    } catch(e) {
      report = "<b>" + e.name + "</b>";
      report += "<br><br> " + e.message;
      if (e.stacktrace) report += "<br><br> stack:" + e.stacktrace;
      gc.error(report)
    }
  },
  
  settingsButton: function( ) {
    gc.gui.settings.style.display = gc.gui.settings.style.display == "block" ? "none" : "block";   
  },
  
  cls: function( ) {
    if ( !confirm("Are you sure clear textarea and console?") ) return;
    gc.gui.source.value = "";
    gc.clear();
  },

  saveSource: function() {
    localStorage.setItem(gc.lsNamespace, gc.gui.source.value);
    if (localStorage.getItem(gc.lsNamespace) === gc.gui.source.value) gc.info("Saved " + ( (gc.gui.source.value.length / 1024).toFixed(2) ) + "KB")
  },
  
  readSource: function() {
    if (localStorage.getItem(gc.lsNamespace)) {
      gc.gui.source.value = localStorage.getItem(gc.lsNamespace);
      gc.info("Read " + ( (gc.gui.source.value.length / 1024).toFixed(2) ) + "KB") 
    } else {
      gc.warn("No data in local storage")
    }
  },
  
  eraseLSData: function() {
    if ( confirm("Do you sure erase local storage data?") ){
      localStorage.removeItem(gc.lsNamespace)
    }
  },
  
  setSave: function() {
    for ( var x = 0; x < gc.gui.settings.elements.length; x++ ) {
      localStorage.setItem( gc.lsNamespaceForSettings + gc.gui.settings[x].name, gc.gui.settings[x].value );
    }
    gc.otherFunctions.readSettings( );
    gc.info("Settings saved");//( gc.lsNamespaceForSettings + gc.gui.settings[x].name + "=" + gc.gui.settings[x].value )
    gc.otherFunctions.resizeTextarea();
    gc.menuEvents.settingsButton();
  },
  
  setCancel: function() {
    gc.otherFunctions.readSettings( );
    gc.gui.settings.style.display = "none";
  },
  
  setDefault: function() {
    for (var el in gc.defaultSettings) { 
      gc.gui.settings[el].value = gc.defaultSettings[el];
    }
  }
}

gc.otherFunctions = {
  resizeTextarea: function( ) {
    var coeff = gc.isPortrait( ) ? gc.settings.portrait : gc.settings.landscape;
    gc.gui.source.style.height = screen.height * coeff + "px";
  },
  
  blockButtonsIfNoObj: function(buttons, obj) {
    if (!obj) {
      Array.prototype.forEach.call( buttons, function(el) {
        el.removeAttribute("id");
      } )
    }
  },
  
  /* loading settings if exists */
  readSettings: function() {
    var el, getted;
    for (el in gc.defaultSettings) { 
      getted = window.localStorage ? localStorage.getItem( gc.lsNamespaceForSettings + el ) : "";
      gc.settings[el] = getted ? getted : gc.defaultSettings[el];
      gc.gui.settings[el].value = gc.settings[el];
    }
  },
  
  tabIt: function(e){
    var pos = e.target.selectionStart;
    if (e.keyCode === 9) {
      gc.gui.source.value = gc.gui.source.value.substr(0, pos) + gc.settings.tabType + gc.gui.source.value.substr( pos );
      gc.gui.source.selectionStart = gc.gui.source.selectionEnd = pos + gc.settings.tabType.length;
      e.preventDefault();
    }
  }
}

gc.otherFunctions.blockButtonsIfNoObj( Array.prototype.slice.call(gc.gui.buttons, 2), window.localStorage );

if (window.localStorage) {
  gc.menuEvents.readSource( );
} else {
  gc.warn("Local storage is not present.");
}
gc.otherFunctions.readSettings();


/* Zone of events */
addEventListener("resize", gc.otherFunctions.resizeTextarea, false);
addEventListener("load", gc.otherFunctions.resizeTextarea, false);
gc.gui.source.addEventListener("keydown", gc.otherFunctions.tabIt, false);

// Menu events
Array.prototype.forEach.call( gc.gui.buttons, function(el) {  
  el.addEventListener("click", gc.menuEvents[el.id], false)
} );

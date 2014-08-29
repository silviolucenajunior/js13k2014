/**
 * Created with JetBrains PhpStorm.
 * User: root
 * Date: 28/08/14
 * Time: 17:04
 * To change this template use File | Settings | File Templates.
 */

function ScreenManager(){
   this.screens = [
      {
         title: "Guide",
         url: "screens/Guide.html",
         loaded: false,
         active: false,
         html: ''
      },
      {
         title: "Title",
         url: "screens/Title.html",
         loaded: false,
         active: false,
         html: ''
      },
      {
         title: "Records",
         url: "screens/Records.html",
         loaded: false,
         active: false,
         html: ''
      },
      {
         title: "Game",
         url: "screens/Game.html",
         loaded: false,
         active: false,
         html: ''
      }
   ];
   this.init();
}

ScreenManager.prototype = {
   constructor: ScreenManager,
   init: function(){
   },
   _load: function(screen){
      var self = this;
      (function(screen){
         $.ajax({
            url: screen.url,
            success: function(response, status){
               screen.loaded = true;
               screen.html = response;
               $("#screen").html(screen.html);
               app.menuManager['bind' + screen.title]();
            }
         });
      })(screen);
   },
   _getScreenByTitle: function(title){
      for (var i = 0; i < this.screens.length; i++){
         var screen = this.screens[i];
         if (screen.title == title){
            return screen;
         }
      }
      return false;
   },
   show: function(title){
      var screen = this._getScreenByTitle(title);
      if (!screen.loaded){
         this._load(screen);
      } else {
         $("#screen").html(screen.html);
         app.menuManager['bind' + screen.title]();
      }
   }
};

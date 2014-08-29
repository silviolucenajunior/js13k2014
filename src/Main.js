/**
 * Created with JetBrains PhpStorm.
 * User: root
 * Date: 28/08/14
 * Time: 17:04
 * To change this template use File | Settings | File Templates.
 */


function Main(){
   this.screenManager = null;
   this.menuManager = null;
   this.game = null;
   this.init();
}

Main.prototype = {
   constructor: Main,
   init: function(){
      this.screenManager = new ScreenManager();
      this.menuManager = new MenuManager();
      //this.game = new ElementalPuzzle();
      this.screenManager.show("Title");
   }
}
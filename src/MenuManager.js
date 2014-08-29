/**
 * Created with JetBrains PhpStorm.
 * User: root
 * Date: 29/08/14
 * Time: 13:08
 * To change this template use File | Settings | File Templates.
 */

function MenuManager(){

}

MenuManager.prototype = {
   constructo: MenuManager,
   bindTitle: function(){
      $("#guide-btn").bind("click", function(event){
         event.preventDefault();
         app.screenManager.show("Guide");
      });

      $("#game-btn").bind("click", function(event){
         event.preventDefault();
         app.screenManager.show("Game");
      });

      $("#records-btn").bind("click", function(event){
         event.preventDefault();
         app.screenManager.show("Records");
      });

   },
   bindGuide: function(){

      $("#return-title-btn").bind("click", function(event){
         event.preventDefault();
         app.screenManager.show("Title");
      });
   },
   bindRecords: function(){

      $("#return-title-btn").bind("click", function(event){
         event.preventDefault();
         app.screenManager.show("Title");
      });
   },
   bindGame: function(){

      var game = new ElementalPuzzle();
      game.start_board(4);
   }
};
/**
 * Created with JetBrains PhpStorm.
 * User: root
 * Date: 21/08/14
 * Time: 15:41
 * To change this template use File | Settings | File Templates.
 */

function ElementalPuzzle(){
   this.board = null;
   this.first_selected = null;
   this.last_selected = null;
}

ElementalPuzzle.prototype = {
   constructor: ElementalPuzzle,
   _init: function(){

   },
   render_board: function(){
      console.log(this.board);

      var size = this.board.length;

      for (var i = 0; i < size; i++){
         var string = "";
         for (var j = 0; j < size; j++){

            string += "<span class='piece piece-" + this.board[i][j] + "'>" + this.board[i][j] + "</span>";
         }
         $("#board-" + i).append(string);
      }



   },
   //This function start a Board like a matrix. This is a representation of pieces in game.
   start_board: function(size){

    /*  this.board = [
         [1, 1, 1, 1],
         [1, 1, 1, 1],
         [1, 1, 1, 1],
         [1, 1, 1, 1]
      ];

      console.log(this.board);

      return;*/

      if (size % 2 != 0){
         throw new Error("O tamanho do tabuleiro deve ser par.")
      }

      this.board = [];

      var pieces_enabled = [1, 2, 3, 4];
      var pieces_status = [0, 0, 0, 0]

      for (var i = 0; i < size; i++){

         this.board[i] = [];

         for (var j = 0; j < size; j++){

            var piece = Math.floor(Math.random() * 4);

            while(pieces_status[piece] == size){
               var piece = Math.floor(Math.random() * 4);
            }

            this.board[i][j] = pieces_enabled[piece];

            pieces_status[piece]++;

         }
      }
      console.log(this.board);

      //

      this.render_board();

   }
}
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
   this.valid_moviments = {
      1: [2],
      2: [3],
      3: [4],
      4: [1]
   };
}

ElementalPuzzle.prototype = {
   constructor: ElementalPuzzle,
   _init: function(){

   },
   render_board: function(){

      $("#board-0").html("");
      $("#board-1").html("");
      $("#board-2").html("");
      $("#board-3").html("");

      console.log(this.board);

      var size = this.board.length;

      for (var i = 0; i < size; i++){
         var string = "";
         for (var j = 0; j < size; j++){

            string += "<span data-space='" + i + "," + j +"' data-piece='" + this.board[i][j] +"' class='piece piece-" + this.board[i][j] + "'>" + this.board[i][j] + "</span>";
         }
         $("#board-" + i).append(string);
      }

      this._bind_events();



   },

   legal_move: function(move_b){
      var move_a = $(this.first_selected).attr("data-piece");
      return this.valid_moviments[move_a][0] == move_b;

   },

   process_move: function(){
      var space_a = $(this.first_selected).attr("data-space");
      var space_b = $(this.last_selected).attr("data-space");

      this.board[space_a.split(",")[0]][space_a.split(",")[1]] = $(this.last_selected).attr("data-piece");
      this.board[space_b.split(",")[0]][space_b.split(",")[1]] = $(this.first_selected).attr("data-piece");

      this.render_board();
      this.first_selected = null;
      this.last_selected = null;

      this._check_victory();

   },

   _check_victory: function(){
      var points = 0;
      if (this.board[0][0] == 1 && this.board[0][1] == 1 && this.board[0][2] == 1 && this.board[0][3] == 1 ){
         if (this.board[1][0] == 2 && this.board[1][1] == 2 && this.board[1][2] == 2 && this.board[1][3] == 2 ){
            if (this.board[2][0] == 3 && this.board[2][1] == 3 && this.board[2][2] == 3 && this.board[2][3] == 3 ){
               if (this.board[3][0] == 4 && this.board[3][1] == 4 && this.board[3][2] == 4 && this.board[3][3] == 4 ){
                  alert("Você Ganhou");
               }
            }
         }
      }
   },
   _bind_events: function(){
      var self = this;

      $(".piece").bind("click", function(event){
         if (!self.first_selected){
            self.first_selected = this;
         } else {
            if(self.legal_move($(this).attr("data-piece"))){
               self.last_selected = this;
               self.process_move();
            } else {
               alert("Ilegal Move");
               this.first_selected = null;
               this.last_selected = null;
            }
         }
      });
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
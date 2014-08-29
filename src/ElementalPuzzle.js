/**
 * Created with JetBrains PhpStorm.
 * User: root
 * Date: 21/08/14
 * Time: 15:41
 * To change this template use File | Settings | File Templates.
 */

function ElementalPuzzle(){
   this.board = null;
   this.board_size = null;
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

      if(this._check_victory()){
         alert("You Win");
         app.screenManager.show("Title");
      }

   },

   _check_victory: function(){
      var points = 0;

      //Check Area 1
      for (var i = 0; i < this.board_size; i++){
         if (this.board[0][i] != 1){
            return false;
         }
      }

      //Check Area 2
      for (var i = 0; i < this.board_size; i++){
         if (this.board[1][i] != 2){
            return false;
         }
      }

      //Check Area 3
      for (var i = 0; i < this.board_size; i++){
         if (this.board[2][i] != 3){
            return false;
         }
      }

      //Check Area 4
      for (var i = 0; i < this.board_size; i++){
         if (this.board[3][i] != 4){
            return false;
         }
      }

      //All areas are OK
      return true;

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
               self.first_selected = null;
               self.last_selected = null;
            }
         }
      });
   },
   //This function start a Board like a matrix. This is a representation of pieces in game.
   start_board: function(size){
      this.board_size = size;

    /*  this.board = [
         [1, 1, 1, 1],
         [1, 1, 1, 1],
         [1, 1, 1, 1],
         [1, 1, 1, 1]
      ];

      console.log(this.board);

      return;*/

     /* if (size % 2 != 0){
         throw new Error("O tamanho do tabuleiro deve ser par.")
      }*/

      this.board = [];

      var pieces_enabled = [1, 2, 3, 4];
      var pieces_controll = {
         "1" : 0,
         "2" : 0,
         "3" : 0,
         "4" : 0
      };
      var pieces_status = [0, 0, 0, 0]
      var number_of_pieces = 4; //Four Elements

      for (var i = 0; i < number_of_pieces; i++){

         this.board[i] = [];

         for (var j = 0; j < (size << 2); j++){

            //var piece = Math.floor(Math.random() * 4); CUrrent
            var piece_index = Math.floor(Math.random() * pieces_enabled.length);
            var piece = pieces_enabled[piece_index];
            this.board[i][j] = piece;


            console.log("Pieces Enabled");
            console.log(pieces_enabled);
            console.log("Piece Index");
            console.log(piece_index);
            console.log("Piece")
            console.log(piece);
            console.log("Pieces Controll");
            console.log(pieces_controll);

            pieces_controll[piece] += 1;
            if (pieces_controll[piece] == (size << 2)){
               pieces_enabled.splice(piece_index, 1);
            }


            /*while(pieces_status[piece] == size){
               var piece = Math.floor(Math.random() * 4);
            }*/

         //   this.board[i][j] = pieces_enabled[piece];

          //  pieces_status[piece]++;

         }
      }
      console.log(this.board);
//      return;

      //

      this.render_board();

   }
}
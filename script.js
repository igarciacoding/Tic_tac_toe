let player_turn=1;
let board_game = [];

    function generate_grid() {
      const grid_board = document.getElementById('grid');
      const board_size = document.getElementById('numbers').value;
      board_game = Array.from({ length: board_size }, () => Array(board_size).fill(0));
      player_turn=1
      grid_board.innerHTML = '';
      for (let x = 0; x < board_size; x++) {
        for (let y = 0; y < board_size; y++) {
          const newDiv = document.createElement('button');
                newDiv.setAttribute('data-col',y);
                newDiv.setAttribute('data-row',x);
                newDiv.setAttribute('onclick', 'getCellValue(event)');
                newDiv.classList.add('grid-item');
                newDiv.style.backgroundColor = '#2E8B57';
          grid_board.appendChild(newDiv);
        }
      }
      grid_board.style.gridTemplateColumns = 'repeat('+board_size+', 1fr)'
      grid_board.style.gridTemplateRows    = 'repeat('+board_size+', 1fr)'
      grid_board.style.width  = board_size+'00px';
      grid_board.style.height = board_size+'00px';
    }

    function getCellValue(event) {
      let row = event.target.getAttribute("data-row");
      let col = event.target.getAttribute("data-col");
      let button_value = player_turn%2==1 ? 'X' : 'O';
      event.target.textContent=button_value;
      board_game[row][col] = button_value;
      event.target.disabled = true;
      event.target.style.backgroundColor = player_turn%2==1 ? '#4682B4' : '#6A5ACD'; ;
      player_turn++;
      find_win();
    }

    function find_win(){
      const board_size = document.getElementById('numbers').value;
      let find_d = 0,find_e = 0;
        for (let x = 0; x < board_size; x++) {
          let find_r = 0, find_c = 0;
            for (let y = 0; y < board_size; y++) {
              find_r +=                        (board_game[x][y] == 'X') ? 1 : (board_game[x][y] == 'O') ? -1 : 0;
              find_c +=                        (board_game[y][x] == 'X') ? 1 : (board_game[y][x] == 'O') ? -1 : 0;
              find_d += (x==y)              ? ((board_game[x][y] == 'X') ? 1 : (board_game[x][y] == 'O') ? -1 : 0) : 0;
              find_e += (x+y==board_size-1) ? ((board_game[x][y] == 'X') ? 1 : (board_game[x][y] == 'O') ? -1 : 0) : 0;  
            }
            if(Math.abs(find_r)==board_size || 
               Math.abs(find_c)==board_size || 
               Math.abs(find_d)==board_size || 
               Math.abs(find_e)==board_size){
                document.getElementById('grid').querySelectorAll('button').forEach(e => e.disabled = true);
              break;
            }
        }
    }
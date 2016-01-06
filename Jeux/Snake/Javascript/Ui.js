var key_names = ["s_right", "s_down", "s_right", "s_down"];

function initDefault() {
    $('.default').css("box-shadow", "0 0px 15px #DFA347");
    $('.default').css("background", "#EEA83D");
    $('.default').addClass("selected");

    $('.ligne2').css("display", "none");
    $('.ligne3').css("display", "none");
    $('.ligne4').css("display", "none");

    $('.default-color').css("border", "2px solid orange");
    $('.default-color').addClass("selected");
}

$(document).ready(function() {
    var nbr_players = 1;
    var border = true;
    var players_colors = [0, 1, 2, 3];
    var players_names = ["Joueur 1", "Joueur 2", "Joueur 3", "Joueur 4"];

    initDefault();

    $('.menu_button_players').click(function() {
        nbr_players = $(this).val();

        $('.menu_button_players').css("box-shadow", "0 0px 15px #338CC7");
        $('.menu_button_players').css("background", "#3498db");
        $('.menu_button_players').removeClass("selected");

        $(this).css("box-shadow", "0 0px 15px #DFA347");
        $(this).css("background", "#EEA83D");
        $(this).addClass("selected");

        if(nbr_players == 1) {
            $('.ligne2').css("display", "none");
            $('.ligne3').css("display", "none");
            $('.ligne4').css("display", "none");
        }
        else if(nbr_players == 2) {
            $('.ligne2').css("display", "block");
            $('.ligne3').css("display", "none");
            $('.ligne4').css("display", "none");
        }
        else if(nbr_players == 3) {
            $('.ligne2').css("display", "block");
            $('.ligne3').css("display", "block");
            $('.ligne4').css("display", "none");
        }
        else {
            $('.ligne2').css("display", "block");
            $('.ligne3').css("display", "block");
            $('.ligne4').css("display", "block");
        }
    });

    $('.menu_button_color').click(function() {
        // Getting player
        var player_index = $(this).parent().parent().attr("class").slice(-1)-1;

        players_colors[player_index] = $(this).val();

        var button = $("."+$(this).parent().parent().attr("class")).find("button");
        (button).css("border", "2px solid rgb(97, 100, 101)");
        (button).removeClass("selected");

        $(this).css("border", "2px solid orange");
        $(this).addClass("selected");
    });

    $('.menu_button_border').click(function() {
        border = $(this).val();

        $('.menu_button_border').css("box-shadow", "0 0px 15px #338CC7");
        $('.menu_button_border').css("background", "#3498db");
        $('.menu_button_border').removeClass("selected");

        $(this).css("box-shadow", "0 0px 15px #DFA347");
        $(this).css("background", "#EEA83D");
        $(this).addClass("selected");
    });

    $('.menu_button_play').click(function() {
        for (var i = 0; i < 4; i++) {
            if ($(".player" + (i+1)).val() != "") {
                players_names[i] = $(".player" + (i+1)).val();
            }
        }
        hideMenu();
        menu = false;

        var sizeX = $(".sizeX").val();
        var sizeY = $(".sizeY").val();
        console.log(sizeX);

        console.log("# Starting new game : " + nbr_players + " " + players_names + " " + players_colors + " " + border);
        $(".replay").css("display", "none");

        if (snake_game != null) {
            players_list = [];
            snake_game.destroy();

            setTimeout(function() {
                snake_game = null;
                gameStart(nbr_players, players_colors, players_names, border, sizeX, sizeY);
            }, 700);
        }
        else {
            players_list = [];
            gameStart(nbr_players, players_colors, players_names, border, sizeX, sizeY);
        }
    });


});
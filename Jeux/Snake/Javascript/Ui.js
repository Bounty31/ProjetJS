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
    var players_colors = [0, 1, 2, 3];

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


    $('.menu_button_play').click(function() {
        console.log("Starting the game : ");
        console.log(" " + nbr_players + " players");
        console.log(" " + players_colors + " colors");
    });


});
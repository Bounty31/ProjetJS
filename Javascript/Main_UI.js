var hover;
var dropAnimation = 1;
var hoverAnimation = 0;


$(document).ready(function() {
    hover = false;
    TweenLite.set($(".game_img"), {scale:0});
    TweenLite.set($("#games"), {y:-380});

    /* Dropdown animations */
    $(".drop").mouseenter(function(e) {
        if (!hover) {
            animationDropIn(dropAnimation);
            hover = true;
        }
    });
    $(".drop").mouseleave(function(e) {
        if (e.toElement != null &&
                !e.toElement.classList.contains("drop") &&
                !e.toElement.classList.contains("game")) {
            animationDropOut(dropAnimation);
            hover = false;
        }
    });

    /* Image hover animations */
    $(".game img").hover(function() {
            animationHoverIn(this, hoverAnimation);
        },
        function() {
            animationHoverOut(this, hoverAnimation);
        });
});
function animationDropIn(i) {
    if (i == 0) {
        TweenMax.to($("#games"), 0.2, {marginTop: "0px"});
        TweenMax.set($(".game_img"), {opacity: 0});
        TweenMax.staggerFromTo($(".game_img"), 0.15, {
            opacity: 0,
            scale: 0.4
        }, {
            opacity: 1,
            scale: 1
        }, 0.1);
    }
    else if (i == 1) {
        TweenMax.to($("#games"), 0.2, {marginTop: "0px"});

        TweenMax.staggerFromTo($(".game_img"), 0.3, {
            opacity: 0,
            scale: 1
        }, {
            opacity: 1,
            scale: 1
        }, 0.1);

        TweenMax.staggerFromTo($(".game"), 0.3, {
            marginTop: "-80px"
        }, {
            marginTop: "0px"
        }, 0.05);
    }
}

function animationDropOut(i) {
    if (i == 0) {
        TweenMax.staggerFromTo($(".game_img"), 0.2, {
            opacity: 1,
            scale: 1
        }, {
            opacity:0,
            scaleY:0
        }, 0.05);
        var width = $(window).width();
        if (width <= 1170)
            TweenMax.to($("#games"), 0.4, {marginTop:"-390px"});
        else
            TweenMax.to($("#games"), 0.4, {marginTop:"-200px"});
    }
    else if (i == 1) {
        TweenMax.staggerTo($(".game_img"), 0.3, {
            opacity: 0,
            scale: 1
        }, 0.05);
        TweenMax.to($(".game"), 0.25, {
            marginTop: "-80px"
        });
        TweenMax.to($("#games"), 0.4, {marginTop:"-200px"});
    }
}

function animationHoverIn(element, i) {
    console.log("pass");
    if (i == 0) {
        TweenMax.to(element, 0.22, {css: {
            borderColor: "rgba(249,144,37,0.7)",
            webkitFilter: "grayscale(0%)"
        }});
    }
    else if (i == 1) {
    }
}

function animationHoverOut(element, i) {
    if (i == 0) {
        TweenMax.to(element, 0.22, {css: {
            borderColor: "rgba(249,144,37,0.3)",
            webkitFilter: "grayscale(40%)"
        }});
    }
    else if (i == 1) {
    }
}
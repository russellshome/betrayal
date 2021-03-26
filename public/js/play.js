$(document).ready(function () {
    $(".interior").each(function () {
        var el = $(this);
        var position = el.data("position");
        var x = position[0];
        var y = position[1];
        var container = el.parent();
        var width = container.width();
        var height = container.height();
        var centre = [width / 2, height / 2];
        var elHeight = 120;
        var elWidth = 120;
        var elCentre = [(x * elWidth) + centre[0], (y * elHeight) + centre[1]];
        var elLeft = elCentre[0] - (elWidth / 2);
        var elTop = elCentre[1] - (elHeight / 2);
        //console.log(centre[1], elHeight,elCentre);
        el.css("left", elLeft + "px").css("top", elTop + "px");
    });

    $(".countercontainer").click(function() {
        var ct = $(this);
        $(".countercontainer:not([data-name='" + ct.data("name") + "'])").each(function() {
            $(this).find(".character").hide();
        });
        ct.find(".character").toggle();
    });

    $(".card button").on("click", function() {
        var card = $(this).closest(".card");
        $(".card:not([data-name='" + card.data("name") + "'])").each(function() {
            $(this).find(".description").hide();
        });
        card.find(".description").toggle();
    });
});
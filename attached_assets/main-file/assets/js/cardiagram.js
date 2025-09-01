//----------tooltip js code [START] -----------

function showTooltip(evt, text) {
    var parentOffset = $(".diagram-box").offset();
    $("#tooltip").css({
            "left": evt.pageX - parentOffset.left
                    + 20, "top": evt.pageY - parentOffset.top
    });
    $("#tooltip").html(text);
    $("#tooltip").show();
}
function hideTooltip() {
    $("#tooltip").hide();
}
$(document).ready(function () {

});

//----------tooltip js [END] code -----------


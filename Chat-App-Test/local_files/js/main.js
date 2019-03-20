$(function () {

    // alert("Hello! I am an alert box!!");
    $(document).ready(function () {
        $(window).on('load', function () {
            $("#myModal").modal({
                backdrop: 'static',
            });
        });

        $("#feedback-button").click(function () {
            $("#myModal1").modal();
        });
    });




    $('#record-button').addClass("notRec");

    $('#record-button').click(function () {
        if ($('#record-button').hasClass('notRec')) {
            $('#record-button').removeClass("notRec");
            $('#record-button').addClass("Rec");
        }
        else {
            $('#record-button').removeClass("Rec");
            $('#record-button').addClass("notRec");
        }
    });

    $('.kv-ltr-theme-fas-star').rating({
        hoverOnClear: false,
        theme: 'krajee-fas',
        containerClass: 'is-star'
    });

    $('#input-1-ltr-star-md').on('rating:change', function (event, value, caption) {
        console.log(value);
        console.log(caption);
    });
});

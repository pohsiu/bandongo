var messages;
$( document ).ready(function() {
    var url = "/getMessage";
    $.getJSON(url, function(res) {
        messages=res.messages;
    });
    $("#message").change(function() {
        var message = $(this).val();
        for(var i=0; i<messages.length; i++) {
            if(messages[i].id==message) {
                $("#content").html(messages[i].content);
            }
        }
    });
});

function submit() {
    var content=$(".ql-editor p").html();
    var message=$("#message").val();
    $('#submit').prop("disabled", true);
    $.post(
        "/backend/setMessage",
        {message: message, content: content},
        function(response) {
            alert(response);
            location.reload();
        }
    );

    setTimeout(function(){
        $('#submit').prop("disabled", false);
    }, 300);
}
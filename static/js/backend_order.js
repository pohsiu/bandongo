function finish() {
    $('#finish').prop("disabled", true);
    $("#finish").remove();
    var id=$("#id").html();
    $.post(
        "/backend/finishSchedule",
        {id: id},
        function(response) {
          alert(response);
          window.location.href = "/backend/scheduleListPage/1/";
        }
    );
}


function arrive(type) {
    var id=$("#id").html();
    
    var notice = $( "input:checked" ).val()
    console.log(notice);
    
    if(notice == null){
        notice = "checkonly";
        $('#'+type+'Arrived').prop("disabled", true);
        console.log("just checked");
        $.post(
            "/backend/"+type+"Arrive",
            {id: id, notice:notice},
            function(response) {
              alert(response);
              window.location.href = "/backend/order";
            }
        ); 
    }
    else{
       $('#'+type+'Arrived').prop("disabled", true);
       console.log("XD");
       
        $.post(
            "/backend/"+type+"Arrive",
            {id: id, notice:notice},
            function(response) {
              alert(response);
              window.location.href = "/backend/order";
            }
        ); 
    }
    
}

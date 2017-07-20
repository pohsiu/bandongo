var categories;
var members;
var catalogs;
$( document ).ready(function() {
    var url = "/getCateMem";
    $.getJSON(url, function(res) {
        categories=res.categories;
        members=res.members;
    });
    $("#category-food").change(function() {
        var cate = $(this).val();
        
        $("#member-food option").remove();
        for (var i = 0; i < members[cate].length; i++) {
            $("#member-food").append($("<option></option>").attr("value", members[cate][i].id).text(members[cate][i].name));
        }
        $("#member-food option:first").attr('selected', 'selected');
        $("#member-food").selectpicker('refresh');
    });
    $("#category-drink").change(function() {
        var cate = $(this).val();
        
        $("#member-drink option").remove();
        for (var i = 0; i < members[cate].length; i++) {
            $("#member-drink").append($("<option></option>").attr("value", members[cate][i].id).text(members[cate][i].name));
        }
        $("#member-drink option:first").attr('selected', 'selected');
        $("#member-drink").selectpicker('refresh');
    });
    var url = "/getScheduleCatalogs";
    $.getJSON(url, function(res) {
        catalogs=res.catalogs;
    });
});

function deleteFoodOrder(id) {
    if(confirm("sure to delete?")) {
        $.post(
            "/backend/deleteFoodOrder",
            {orderId: id},
            function(response) {
                if(response) {
                    $("#food"+id).remove();
                    var count=$("#foodCount"+response.bag).html();
                    count=parseInt(count)-response.count;
                    $("#foodCount"+response.bag).html(count);
                    
                    var price=$("#foodPrice").html();
                    price=parseInt(price)-response.price;
                    $("#foodPrice").html(price);
                } else {
                    alert("Schedule is finished.");
                }
            }
        );
    }
}

function deleteDrinkOrder(id) {
    if(confirm("sure to delete?")) {
        $.post(
            "/backend/deleteDrinkOrder",
            {orderId: id},
            function(response) {
                if(response) {
                    $("#drink"+id).remove();
                    var count=$("#drinkCount"+response.bag).html();
                    count=parseInt(count)-response.count;
                    $("#drinkCount"+response.bag).html(count);
                    
                    var price=$("#drinkPrice").html();
                    price=parseInt(price)-response.price;
                    $("#drinkPrice").html(price);
                } else {
                    alert("Schedule is finished.");
                }
            }
        );
    }
}

function addFoodOrder() {
    var member=$("#member-food").val();
    var catalog=$("#catalog").val();
    var count=$("#count-food").val();
    
    $.post(
        "/backend/addFoodOrder",
        {member: member, catalog: catalog, count: count},
        function(response) {
            if(response) {
                var bag=response.bag;
                var row='\
                        <tr id="food'+response.id+'">\
                            <td>'+response.remark+'</td>\
                            <td>'+response.member+'</td>\
                        	<td>'+response.catalog+'</td>\
                            <td>'+response.count+'</td>\
                            <td>'+response.price+'</td>\
                            <td><a onclick="deleteFoodOrder('+response.id+');"><span class="glyphicon glyphicon-remove" style="cursor: pointer;"></span></a></td>\
                        </tr>'
                if(bag!=3) {
                    $("#foodBag"+(bag+1)).before(row);
                } else {
                    $("#food").append(row);
                }
                
                var count=$("#foodCount"+response.bag).html();
                count=parseInt(count)+response.count;
                $("#foodCount"+response.bag).html(count);
                
                var price=$("#foodPrice").html();
                price=parseInt(price)+response.price;
                $("#foodPrice").html(price);
            } else {
                alert("Schedule is finished.");
            }
        }
    );
}

function addDrinkOrder() {
    var member=$("#member-drink").val();
    var drinking=$("#drinking").val();
    var remark=$("#sugar").val()+$("#ice").val()+$("#comment").val();
    var price=$("#price").val();
    $.post(
        "/backend/addDrinkOrder",
        {member: member, drinking: drinking, remark: remark, price: price},
        function(response) {
            if(response) {
                var bag=response.bag;
                var row='\
                        <tr id="drink'+response.id+'">\
                            <td>'+response.category+'</td>\
                            <td>'+response.member+'</td>\
                        	<td>'+response.drink+'</td>\
                        	<td>'+response.remark+'</td>\
                            <td>'+response.count+'</td>\
                            <td>'+response.price+'</td>\
                            <td><a onclick="deleteDrinkOrder('+response.id+');"><span class="glyphicon glyphicon-remove" style="cursor: pointer;"></span></a></td>\
                        </tr>'
                if(bag!=3) {
                    $("#drinkBag"+(bag+1)).before(row);
                } else {
                    $("#drink").append(row);
                }
                
                var count=$("#drinkCount"+response.bag).html();
                count=parseInt(count)+1;
                $("#drinkCount"+response.bag).html(count);
                
                var price=$("#drinkPrice").html();
                price=parseInt(price)+response.price;
                $("#drinkPrice").html(price);
            } else {
                alert("Schedule is finished.");
            }
        }
    );
}

var editing=false;
var preFood=-1;
function editFood(id) {
    if(!editing) {
        editing=true;
        var name=$("#foodName"+id).html();
        var text='<select id="foodSelect'+id+'" onChange="postEditFood('+id+');">';
        for(var i=0; i<catalogs.length; i++) {
            if(catalogs[i].name==name) {
                text+='<option value="'+i+'" selected>'+catalogs[i].name+'</option>';
                preFood=i;
            }
            else {
                text+='<option value="'+i+'">'+catalogs[i].name+'</option>';
            }
        }
        text+='<option value="-1">cancel edit</option>';
        text+='</select>';
        $("#foodName"+id).html(text);
    }
}

function postEditFood(id) {
    if($("#foodSelect"+id).val()==-1) {
        $("#foodName"+id).html(catalogs[preFood].name);
        editing=false;
    } else {
        var cataInd=$("#foodSelect"+id).val();
        $("#foodName"+id).html(catalogs[cataInd].name);
        var price=catalogs[cataInd].price*$("#foodCount"+id).html();
        $("#foodPrice"+id).html(price);
        $.post("/backend/editFoodOrder",
            {id: id, food: catalogs[cataInd].id, count: $("#foodCount"+id).html()},
            function(response) {
                if(response.err) {
                    alert(response.err);
                    editing=false;
                } else {
                    alert("edit finished");
                    editing=false;
                }
            }
        )
    }
}

var preCount=-1;
function editCount(id) {
    if(!editing) {
        editing=true;
        var count=$("#foodCount"+id).html();
        var text='<select id="foodCountSelect'+id+'" onChange="postEditFoodCount('+id+');">';
        for(var i=1; i<6; i++) {
            if(i==count) {
                text+='<option value="'+i+'" selected>'+i+'</option>';
                preCount=i;
            }
            else {
                text+='<option value="'+i+'">'+i+'</option>';
            }
        }
        text+='<option value="-1">cancel edit</option>';
        text+='</select>';
        $("#foodCount"+id).html(text);
    }
}

function postEditFoodCount(id) {
    if($("#foodCountSelect"+id).val()==-1) {
        $("#foodCount"+id).html(preCount);
        editing=false;
    } else {
        var name=$("#foodName"+id).html();
        var cataInd=-1;
        for(var i=0; i<catalogs.length; i++) {
            if(catalogs[i].name==name) {
                cataInd=i;
                break
            }
        }
        var count=$("#foodCountSelect"+id).val();
        $("#foodCount"+id).html(count);
        var price=catalogs[cataInd].price*count;
        $("#foodPrice"+id).html(price);
        $.post("/backend/editFoodOrder",
            {id: id, food: catalogs[cataInd].id, count: count},
            function(response) {
                if(response.err) {
                    alert(response.err);
                    editing=false;
                } else {
                    alert("edit finished");
                    editing=false;
                }
            }
        )
        editing=false;
    }
}
$(document).ready(function(){
    $("#submitAmount").click(function(){
        let amount = $("input[name='amount']").val();
        console.log(amount);
        if(amount <= 4 && amount >= 0){
            $("#displayImages").empty();
            $("#resultSubmitAmount").empty();
            
            setupImages(amount);
            $("#submitSelectionContainer")
                .html("<button type='button' id='submitSelection'>Submit Image Selected!</button>");
            $("#submitSelection").click(imageSelected);
        }
        else{
            $("#displayImages").empty();
            $("#resultSubmitAmount").html("Invalid Input! (0,4)");
        }
    });
    
    function setupImages(amount){
        for(let i=0; i<amount; i++){
            $("#displayImages")
                .append("<input type='radio' name='images' id='img-" + (i+1) + "'/>")
                .append("<img src='img/img-" + (i+1) + ".jpg'" +
                        "class='imgResize' alt='this is an image of a puppy'\>");
        }
    }
    
    function imageSelected(){
        $("#rate")
            .html("<select id='likeRate'>"
                + "<option value='op1'>Not even a bit</option>"
                + "<option value='op2'>Maybe a little</option>"
                + "<option value='op3'>Im undecided</option>"
                + "<option value='op4'>A lot</option>"
                + "<option value='op5'>I am a puppy</option>"
                + "</select>"
                );
        $("#puppyName")
            .html("<label for='puppyNameIn'>Please enter your new puppy name:</label>"
                +"<input type='text' name='puppyNameIn'/>"
                );
        $("#ownerName")
            .html("<label for='ownerNameIn'>Please enter your name:</label>"
                +"<input type='text' name='ownerNameIn'/>"
                );
                
        $("#submitNames").html(
            "<button id='submitAll' type='button'>Submit all Information!</button>"
            );
            
        $("#submitAll").click(displayAll);
    }
    
    function displayAll(){
        console.log( $("input[name='images']:checked"). next().attr('src'));
        $("#displayAll").html(
            "<h3> Hello "
            + $("input[name='ownerNameIn']").val()
            + ", your new puppy is named "
            + $("input[name='puppyNameIn']").val()
            + " and you like him "
            + $("#likeRate").find(":selected").text()
            + ". Here is the picture of your puppy: </h3>"
            ).css("background-color", "rgb(12,87,128)");
        $("#displayAllImg").html(
            "<img src='"+ $("input[name='images']:checked").next().attr("src") +"' "
            + "alt='This is the puppy you selected' id='finImg' class='imgResize'/>"
            ).css("background-color", "rgb(12,87,128)");
    }
});
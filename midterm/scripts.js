let nonMatch;

$(document).ready(() => {
    $.ajax({
       type: "get",
       url: "./getNoMatch.php",
       dataType: "json",
       data:{
       },
       success: function(data){
           nonMatch = data;
           updatePage();
       },
    });
});

function updatePage(){
    console.log(nonMatch);
    let currentMatch = nonMatch[Math.floor(Math.random()*nonMatch.length)];
    console.log(typeof currentMatch)
    $(".leftBin").html(
        "<img src=" + currentMatch['picture_url'] + " />"
        );
}
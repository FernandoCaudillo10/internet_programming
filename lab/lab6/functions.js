let mbt = 30;
let sun = 10;
let ifs = 20;
let tax = .1;
let shipSlow = 20;
let shipFast = 1000;
let obj1 = $("object1").text();
let obj2 = $("object2").text();
let obj3 = $("object3").text();
let ship = "";

$(document).ready(function(){
    $.ajax({
        type: "get",
        url: "./randomItem.php",
        dataType: "json",
        data: {
            
        },
        success: function(data){
            console.log(data);
            $("#randName").html(data["product"]);
            $("#randPrice").html("$"+data["price"]);
            $("#mbt").val(data["qty"]);
            let quant = $("#mbt").val();
            
            if(!isNaN(quant)){
                $(".object1").html("$"+(quant * mbt));
                obj1 = $("object1").text();
            }
            updateTotal();
        },
    });
});

$("#mbt").keyup(function(){
    let quant = $("#mbt").val();
    
    if(!isNaN(quant)){
        $(".object1").html("$"+(quant * mbt));
        obj1 = $("object1").text();
    }
}).keyup(updateTotal);
$("#sun").keyup(function(){
    let quant = $("#sun").val();
    
    if(!isNaN(quant)){
        $(".object2").html("$"+(quant * sun));
        obj2 = $("object1").text();
    }
}).keyup(updateTotal);
$("#ifs").keyup(function(){
    let quant = $("#ifs").val();
    
    if(!isNaN(quant)){
        $(".object3").html("$"+(quant * ifs));
        obj3 = $("object1").text();
    }
}).keyup(updateTotal);

var str = "";
$( "#shipping").change(function () {
    
    let ship = "";
    $( "select option:selected" ).each(function() {
        str = "$"+$(this).val();
        ship = $(this).attr("name");
        
    });
    $(".shippingPrice").html(ship);
    $( "#shippingTotal" ).html(str);
}).change(updateTotal);

let codeDiscountPercent  = 0;
$(".Promo").keyup(function() {
    $.ajax({
        type:"get",
        url:"./promoCode.php",
        dataType:"json",
        data:{
            
        },
        success : function(data){
            //console.log(data);
            console.log(data[$(".Promo").val()])
            codeDiscountPercent = data[$(".Promo").val()];
        }
    });
}).keyup(updateTotal);

function updateTotal(){
    let dis = codeDiscountPercent/100;
    console.log(dis);
    let o1 = parseInt($(".object1").text().substr(1));
    let o4 = parseInt($("select option:selected").val());
    console.log(o1,o4);
    $("#subtotal").text(
        "$"+(o1+o4*(dis ? dis : 1)).toFixed(2)
        );
    $("#tax").text(
        "$"+ ((o1+o4*(dis ? dis : 1)) * tax).toFixed(2)//if  dis == 0 or NULL the code will break here
    );
    $("#total").text(
        "$"+((o1+o4*(dis ? dis : 1)) + ((o1+o4*(dis ? dis : 1)) * tax)).toFixed(2)
    );
    // let tempTotal = (o1+o4 + ((o1+o4)) * tax);
    // //console.log(tempTotal);
    // //console.log(dis);
    // //console.log(tempTotal * dis);
    // tempTotal = tempTotal - (tempTotal* dis);
    // let subT  = (o1+o4) - (o1+o4 * dis);
    // console.log(subT);
    // let TAX = (o1+o4) * tax//((subT*tax)) - (subT * dis);//subT * tax
    // // This is the amount from the subtotal right? //yeah i need to get the amount that would be taxed and apply the promo code// i dont know what the math is 
    // //discount goes to subtotal and the tax is on that
    // console.log(TAX);
    // console.log(subT);
            //"$"+(o1+o4 + ((o1+o4)) * tax) - (tempTotal * dis)<---givs NaN
        //console.log(tempTotal);
    
    // if(codeDiscountPercent > 0){
    //     $("#amountOff").html(codeDiscountPercent+"% off");
        
    //     $("#total").text("$"+(tempTotal));//<--works
    //     $("#subtotal").text("$"+(subT));
    //     $("#tax").text("$"+ (TAX));
    // }
    
    //Try again
}



$("button").click(function(){

    if((str == "$15"||str =="$10" || str == "$5")){
        if ($('.checkBox').is(":checked")){
            //console.log("true)");
            $("#purchase").html("thanks for buying");
            $(".acceptText").css("color","black");
            $(".shipAlert").hide();
        }else{
         //accept terms   
            $("#acceptText").css("color","red");
            $(".shipAlert").hide();
        }
    }else{
        //choose shipping 
        $(".shipAlert").html("Please chose a shipping option");
    }
    
});
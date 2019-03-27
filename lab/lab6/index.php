<!DOCTYPE html>
<html>
    <head>
        <title>Otter mart thing</title>
        <link rel="stylesheet" href="styles.css" type="text/css" />
         <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script
            src="https://code.jquery.com/jquery-3.3.1.min.js"
            integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
            crossorigin="anonymous"></script>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
       <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
       <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" integrity="sha384-xrRywqdh3PHs8keKZN+8zzc5TX0GRTLCcmivcbNJWm2rs5C8PRhcEn3czEjhAO9o" crossorigin="anonymous"></script>
    </head>
    <body>
        <div>
            <h1>THis is a mart</h1>
            <form>
                Product: <input type="text" name="product" /> <br>
                Category:
                    <select name="category">
                        <option value="">Select one</option>
                    </select>
                <br>
                Price:
                From:<input type="text" name="priceFrom" size="7"/>
                To:<input type="text" name="priceTo" size="7"/>
                <br>
                Order Results By:
                <br>
                <input type="radio" name="orderBy" value="price"/>Price<br>
                <input type="radio" name="orderBy" value="Name"/>Name
                <br><br>
            </form>
            <br>
            <button id="searchForm">Search</button>
            
        </div>
        <hr>
        <div id="results"></div>

        <div id="purchaseHistoryModal" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Product History</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="history"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

      </div>
    </div>
  </div>
</div>

    </body>
    <script>
        /*global $*/
            $(document).ready(function(){
               $.ajax({
                  type: "GET",
                  url:"api/getCategories.php",
                  dataType:"json",
                  data:{},
                  success: function(data,status){
                    //console.log(data); 
                    //console.log(data[1]);
                    data.forEach(function(key){
                    //let key = data;
                      
                        $("[name=category]").append("<option value=" + key["catId"]+">"+ key["catName"] + "</option>");
                       
                    });
                  }
               });
            });
            
            //$("#searchForm").on("click",function(){
            $("#searchForm").click(function(){  
                //console.log("sads");
                $.ajax({
                    type:"GET",
                    url:"api/getSearchResults.php",
                    dataType:"json",
                    data:{
                      "product": $("[name=product]").val(),
                      "category": $("[name=category]").val(),
                      "priceFrom": $("[name=priceFrom]").val(),
                      "priceTo": $("[name=priceTo]").val(),
                      "orderBy": $("[name=orderBy]:checked").val()
                    },
                    success: function(data,status){
                        //console.log("sadas");
                        $('#results').html("<h3>Products Encountered:</h3>");
                        data.forEach(function(key){
                            //console.log(key);
                            $("#results").append("<a href='#' class='historyLink' id='"+key["productId"]+"'> History</a>");
                            $("#results").append(key['productName'] + " "+ key['productDescription']+" $"+key["price"]+"<br>");
                        })
                    }
                });
            });
            
            $(document).on("click",".historyLink",function(){
                $('#purchaseHistoryModal').modal("show");
                $.ajax({
                    type:"GET",
                    url:"api/getPurchaseHistory.php",
                    dataType:"json",
                    data:{
                        "productId": $(this).attr("id")
                    },
                    success: function (data,status){
                        if(data.length != 0){
                            $("#history").html("");
                            $("#history").append(data[0]['productName']+"<br>");
                            $("#history").append("<img src='" + data[0]['productImage'] +"' width='200' /> <br>");
                            data.forEach(function(key){
                                $("#history").append("Purchase Date: "+key['purchaseDate']+"<br>");
                                $('#history').append("UNit PriceL: "+key['unitPrice']+ "<br>");
                                $("#history").append("Quantity: "+key['quantity']+"<br>");
                            })
                        }
                        else{
                            $("#history").html("like no history");
                        }  
                    }
                })
            })
        </script>
</html>




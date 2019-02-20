$(document).ready(function(){
   $("#submit").click(function(){
      
      let grade = 0;
      
      grade += checkQ1();
      grade += checkQ2();
      grade += checkQ3();
      grade += checkQ4();
      grade += checkQ5();
      grade += checkQ6();
      
      let percent = (grade / 6.0) * 100;
      
        if(percent > 90)
            $("#result").html("Congratu-Ma-lations!!! You got a " + Math.floor(percent) + "% in this quiz!!!");
        else
            $("#result").html("You got a " + Math.floor(percent) + "% in this quiz!");
            
        let correctAnswers = ["to","<div>", "<hello>", "<Qweewee>", "All of the Above and Nothing else", "42","Computer Science","Javascript","Me"];
        
        $("input:checked").not("[type='text']").each(function() {
            console.log($(this).next().text() + ": " +$.inArray( $(this).next().text() , correctAnswers));
            if( $.inArray( $(this).next().text() , correctAnswers) > -1){
                $(this).parent().css("background-color","green");
                $(this).next().after("<img src='check.svg' />");
            }
            else{
                $(this).parent().css("background-color","red");
                $(this).next().after("<img src='clear.svg' />");
            }
        });
        
        $("input").not(":checked").not("[type='text']").each(function() {
            console.log($(this).next().text() + ": " +$.inArray( $(this).next().text() , correctAnswers));
            if( $.inArray( $(this).next().text() , correctAnswers) > -1){
                $(this).parent().css("background-color","red");
                $(this).next().after("<img src='clear.svg' />");
            }
            else{
                $(this).parent().css("background-color","green");
                $(this).next().after("<img src='check.svg' />");
            }
        });
        
        if( $("input[name='q3']").val().length > 0 ){
            $("input[name='q3']").parent().css("background-color","green");
            $("input[name='q3']").after("<img src='check.svg' />");
        }
        else{
            $("input[name='q3']").parent().css("background-color","red");
            $("input[name='q3']").after("<img src='clear.svg' />");
        }
        if( $("input[name='q6']").val() == 'yes' ){
            $("input[name='q6']").parent().css("background-color","green");
            $("input[name='q6']").after("<img src='check.svg' />");
        }
        else{
            $("input[name='q6']").css("background-color","red");
            $("input[name='q6']").after("<img src='clear.svg' />");
        }
        
        $("#submit").css("display", "none");
        $("#reset").css("display","block").click(function(){
           location.reload(); 
        });
        
   });
   
   function checkQ1(){
       let nameAttr = "q1";
       return $("input[name='"+nameAttr+"']:checked").next().text() == "to";
   }
   function checkQ2(){
       let nameAttr = "q2";
       let count = 0;
       $("input[name='"+nameAttr+"']:checked").each(function(){
          let keys = ["<div>", "<hello>", "<Qweewee>"];
          if($.inArray($(this).next().text(), keys) != -1){
              count++;
          }
       });
       console.log(count);
       return count / 3.0;
   }
   function checkQ3(){
       return $("input[name='q3']").val().length > 0;
   }
   function checkQ4(){
       let nameAttr = "q4";
       return $("input[name='"+nameAttr+"']:checked").next().text() ==
                "All of the Above and Nothing else";
   }
   function checkQ5(){
       let nameAttr = "q5";
       return $("input[name='"+nameAttr+"']:checked").length / 4.0;
   }
   function checkQ6(){
       return $("input[name='q6']").val() == "yes";
   }
});
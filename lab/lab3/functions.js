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
        
            console.log("checked:");
        $("input:checked").not("[type='text']").each(function() {
            console.log($(this).next().text() + ": " +$.inArray( $(this).next().text() , correctAnswers));
            if( $.inArray( $(this).next().text() , correctAnswers) > -1){
                $(this).next().after("<img src='check.svg' />");
            }
            else{
                $(this).next().after("<img src='clear.svg' />");
            }
        });
     //       console.log("not checked:");
     //   $("input").not(":checked").not("[type='text']").each(function() {
     //       console.log($(this).next().text() + ": " +$.inArray( $(this).next().text() , correctAnswers));
     //       if( $.inArray( $(this).next().text() , correctAnswers) == -1){
     //           console.log("clear");
     //           $(this).next().after("<img src='clear.svg' />");
     //       }
     //       else{
     //           console.log("check");
     //           $(this).next().after("<img src='check.svg' />");
     //       }
     //   });
        
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
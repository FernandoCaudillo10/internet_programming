$(document).ready(() => {
   $( "#dateTimeSlot" ).datepicker();
   $("#openTimeSlot").click(() => {
        $("#timeSlotForm").css("display", "block");
   });
   $("#cancelTimeSlot").click(() => {
       location.reload();
   });
   $("#addTimeSlot").click(() => {
      console.log(...parseDate($("#dateTimeSlot").val()), ...parseTime($("#startTimeSlot").val()));
      console.log(...parseDate($("#dateTimeSlot").val()), ...parseTime($("#endTimeSlot").val()));
      
      $.ajax({
         type: "POST",
         url: "./endpoints/insertAvailability.php",
         data: {
            start : (parseDate($("#dateTimeSlot").val())).join("/") + " " + (parseTime($("#startTimeSlot").val())).join(":"),
            end : (parseDate($("#dateTimeSlot").val())).join("/") + " " + (parseTime($("#endTimeSlot").val())).join(":"),
         },
         success: () => {
            console.log("Insert Success");
         }
      });
   });
   $.ajax({
      type: "GET",
      url: "./endpoints/getAllAvailability.php",
      dataType: "json",
      success: (data) => {
         console.log(data);
         
         for(let i=0; i<data.length; i++){
            $(".appointmentsContainer").append(
               "<div id='appointment"+i+"' class='appointment'>" +
                  "<div>" + data[i]['startTime'].split(" ")[0] + "</div>" +
                  "<div>" + data[i]['startTime'].split(" ")[1] + "</div>" +
                  "<div>" + difference(data[i]['startTime'].split(" ")[1], data[i]['endTime'].split(" ")[1]) + "</div>" +
                  "<div>" + (data['isReserved'] ? "Someone" : "Not Booked") + "</div>" +
                  "<button type='button'> Details </button> " + 
                  "<button type='button' id='appointmentDelete"+i+"'> Delete </button> " + 
               "</div>"+
               
               "<div class='deletePopUp' id='deletion"+i+"'>" +
                  "<div id='deletionStart"+i+"'> Start Time " +  data[i]['startTime'] + "</div>" +
                  "<div id='deletionEnd"+i+"'> End Time " +  data[i]['endTime'] + "</div>" +
                  "<div> Are you sure you want to remove the time slot? This cannot be undone. </div>" +
                  "<button type='button' id='cancel"+i+"'> Cancel </button>" +
                  "<button type='button' id='remove"+i+"'> Yes, Remove It! </button>" +
               "</div>"
            );
         }
         
         for(let i=0; i<data.length; i++){
            $("#appointmentDelete"+i).click(() => {
               $("#deletion"+i).css("display", "block");
            });
            $("#cancel"+i).click(() => {
               $("#deletion"+i).css("display", "none");
            });
            $("#remove"+i).click(() => {
               let startTime;
               let endTime;
               let temp = $("#deletionStart"+i).text().split(" ");
               startTime = temp[3] + " " + temp[4];
               temp = $("#deletionEnd"+i).text().split(" ");
               endTime = temp[3] + " " + temp[4];
               
               $.ajax({
                  type: "POST",
                  url: "./endpoints/removeAvailability.php",
                  data: {
                     start : startTime,
                     end : endTime,
                  },
                  success: () => {
                     console.log("Removal Success");
                  }
               });
               location.reload();
            });
         }
         
      }
   });
});

function difference(start, end){
   start = start.split(":");
   end = end.split(":");
   
   return ((end[0] - start[0]) + " Hours and " + (end[1] - start[1]) + " Minutes" );
}
function parseDate(date){
   date = date.split("/");
   return [date[2],date[0],date[1]];
}

function parseTime(time){
   time = time.trim();
   time = time.split(":");
   time.forEach((n) => {
      return (n<10) ? '0'+n : n;
   });
   
   if(time.length == 2){
      time.push("00");
   }
   
   return time;
}
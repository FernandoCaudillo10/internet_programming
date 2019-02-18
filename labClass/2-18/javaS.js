
$("#submitButton").click(function(){
    let imageArray = ["cherry", "grapes", "seven"];
    let idTags = ["#leftImg", "#centerImg", "#rightImg"];
    console.log("tst");
    
    let createdRandomList = [];
    for(let i=0; i<3; i++){
        let randomIndex = Math.floor(Math.random() * 3);
        let randomImage = imageArray[randomIndex];
        $(idTags[i]).html("<img src='img/" +randomImage+".png' />")
        createdRandomList.push(randomImage);
    } 
    
    let temp = createdRandomList[0];
    let same = true;
    
    for(let i=0; i<3; i++){
        if(temp != createdRandomList[i]){
            console.log(i+": " +createdRandomList[i]);
            same = false;
        }
    }
    
    if(same){
        updateForWin(createdRandomList[0]);
    }
    else{
        updateForLose();
    }
    
});
let num = 0;
function updateForWin(imageTitle){
    let didWin = $(".didWin");
    let currentWin = $(".currentWin");
    let totalWon = $(".totalWon");
    if(imageTitle == "seven"){
        console.log("before music");
        document.querySelector(".music").play(); 
        console.log("after music");
        didWin.html("JackPot!");
        currentWin.html("You won $500");
        num += 500;
    }
    else if(imageTitle == "grapes"){
        didWin.html("You won!");
        currentWin.html("You won $300");
        num += 300;
    }
    else if(imageTitle == "cherry"){
        didWin.html("You won!");
        currentWin.html("You won $100");
        num += 100;
    }
    totalWon.html("Total Winnings: $" + num);
}
function updateForLose(){
    $(".didWin").html("You Lose!!!!!");
    $(".currentWin").html("You won $0");
    $(".totalWon").html("Total Winnings: $" + num);
}

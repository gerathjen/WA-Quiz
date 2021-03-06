$(document).ready(function () {
	
var questionNumber=0;
// Anzahl Fragen
var maximumQuestions=5;
var questionBank=new Array();
var stage="#game1";
var stage2=new Object;
var questionLock=false;
var numberOfQuestions;
var score=0;
 
$.getJSON('activity.json', function(data) {

for(i=0;i<data.quizlist.length;i++){ 
	questionBank[i]=new Array;
	questionBank[i][0]=data.quizlist[i].question;
	questionBank[i][1]=data.quizlist[i].option1;
	questionBank[i][2]=data.quizlist[i].option2;
	questionBank[i][3]=data.quizlist[i].option3;
}
	numberOfQuestions=questionBank.length; 
	
	scrambleDatabase();
	displayQuestion();
}) //gtjson
 
function scrambleDatabase(){
	for(i=0;i<50;i++) { 
	var rnd1=Math.floor(Math.random()*questionBank.length);
	var rnd2=Math.floor(Math.random()*questionBank.length);
	 
	var temp=questionBank[rnd1];
	questionBank[rnd1]=questionBank[rnd2];
	questionBank[rnd2]=temp;
	} //i 
} //scdb


function displayQuestion(){

 var rnd=Math.random()*3;
 rnd=Math.ceil(rnd);
 var q1;
 var q2;
 var q3;

if(rnd==1){q1=questionBank[questionNumber][1]; q2=questionBank[questionNumber][2]; q3=questionBank[questionNumber][3];}1
if(rnd==2){q2=questionBank[questionNumber][1]; q3=questionBank[questionNumber][2]; q1=questionBank[questionNumber][3];}
if(rnd==3){q3=questionBank[questionNumber][1];q1=questionBank[questionNumber][2];q2=questionBank[questionNumber][3];}
    
$(stage).append('<div class = "questionText">' + questionBank[questionNumber][0] + '</div><div id= "1" class="option">'+q1+'</div> <div id="2" class="option">'+q2+'</div> <div id="3" class="option">'+q3+'</div>');

$('.option').click(function(){
  if(questionLock==false){questionLock=true;	
  //correct answer
  if(this.id==rnd){
   $(stage).append('<div class="feedback1">Richtig</div>');
   score++;
   }
  //wrong answer	
  if(this.id!=rnd){
   $(stage).append('<div class="feedback2">Falsch</div>');
  }
  setTimeout(function(){changeQuestion()},1000);
 }})
} //display question


function changeQuestion(){

	questionNumber++;

	if(stage=="#game1"){stage2="#game1";stage="#game2";}
		else{stage2="#game2";stage="#game1";}
	
	// Abfrage maximale Fragenanzahl
	if(questionNumber<maximumQuestions){displayQuestion();}else{displayFinalSlide();}
	
	$(stage2).animate({"right": "+=800px"},"slow", function() {$(stage2).css('right','-800px');$(stage2).empty();});
	$(stage).animate({"right": "+=800px"},"slow", function() {questionLock=false;});
} //change question


function displayFinalSlide(){

	$(stage).append('<div class="praiseText">Klasse, du hast das Quiz abgeschlossen!</div><div class="questionText">Du hast <b>'+score+'</b> von '+maximumQuestions+' Fragen richtig beantwortet.<br /><br /></div><div class="normalText"><img src="anderscool-jmd.png" alt="anders? - cool!-Logo" align="right" hspace="30"><center>Viel Spa&szlig; bei der Wanderausstellung &#x22;anders? - cool!&#x22;</center></div>');
	// Neustarten des Quiz nach 10 Sekunden //
	setTimeout(function() { location.reload() },10000);
} //display final slide

});//doc ready
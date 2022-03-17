/* 
Author: 		D.B.
Last edited: 	12/18/21
Description: 	external js for index.html - flash card creator
 */

 // global variables
var questionElement = document.getElementById("question");
var answerElement 	= document.getElementById("answer");
var testButton 		= document.getElementById("testButton");
var checkButton 	= document.getElementById("checkAnswers");
var logButton 		= document.getElementById("pairLog");
var resetButton		= document.getElementById("resetTest");
var questionList 	= [];

var questionKey;
var answerValue;

// button default states
testButton.disabled = true;
checkButton.disabled = true;
logButton.disabled = false;

function validateFields()
{
	var cardValidity 	= true;
	var errorDiv = document.getElementById("errorDiv");
	var inputElements = document.querySelectorAll("input[type=text]");
	try {
		for(var i=0; i<inputElements.length; i++){
			currentElement = inputElements[i];
			if (currentElement.value == ""){
				cardValidity = false;
				currentElement.style.background = "rgb(255, 233, 233)";
			} 
			else {
				currentElement.style.background = "white";
				
			} // end IF/ ELSE
		} // end FOR
		if (cardValidity == false){
			throw "Please complete Flash Card";
		} // end IF
	} // end TRY
	catch(msg){
		errorDiv.innerHTML = msg;
	} // end CATCH
	finally {
		if (questionElement.value == ""){
			questionElement.focus();
		} else {
			answerElement.focus();
		} // end IF/ELSE
	} // end FINALLY
	if (cardValidity == true){
		questionElement.focus();
		errorDiv.innerHTML = "";
		logCard();
	} // end IF
}

function logCard()
{
	testButton.disabled = false;
	questionKey = questionElement.value;
	answerValue = answerElement.value;
	
	questionList.push({
			"question": questionKey,
			"answer": answerValue
	});
	questionElement.value = "";
	answerElement.value = "";
	console.log(questionList);
	
}

function disaplyTest()
{	
	errorDiv.innerHtml 		= "";
	checkButton.disabled 	= false;
	testButton.disabled 	= true;
	logButton.disabled 		= true;
	var testContainer 		= document.getElementById("testContainer");
	for (var i=0; i<questionList.length; i++){
		var questionContainer = document.createElement("p");
		var answerInput = document.createElement("input");
			answerInput.setAttribute("type", "text");
			answerInput.setAttribute("id", "ans" + i);
			answerInput.setAttribute("placeholder", "Enter Answer");
		var questionText = document.createTextNode(questionList[i].question);
		questionContainer.append(questionText);
		testContainer.append(questionContainer)
		testContainer.append(answerInput);
	} // end FOR
}

function checkAnswers()
{	
	var answerValidity = true;
	for (var i=0; i<questionList.length; i++){
		var currentAnswerElement = document.getElementById("ans" + i);
		if (currentAnswerElement.value != questionList[i].answer){
			answerValidity = false;
			currentAnswerElement.focus();
			currentAnswerElement.style.background = "red";
		} else {
			currentAnswerElement.style.background = "white";
		}
	} // end FOR
	if (answerValidity == true){
		errorDiv.innerHTML = "Correct!!";
		errorDiv.style.background = "LightBlue";
		
	} else if (answerValidity == false){
		errorDiv.innerHTML = "Wrong!";
		errorDiv.style.background = "red";
	} // end ELSE/IF
} // end FUCNTION checkAnswers

function resetTest()
{
	for (var i=0; i<questionList.length; i++){
		var currentAnswerElement = document.getElementById("ans" + i);
		currentAnswerElement.value = "";
		currentAnswerElement.style.background = "white";
	} // end FOR
	errorDiv.style.background = "LightBlue";
	errorDiv.innerHTML = "";
} // end FUNCTION resetTest

function eventListeners()
{
	if (logButton.addEventListener)
	{ logButton.addEventListener ("click", validateFields, false); }

	if (testButton.addEventListener)
	{ testButton.addEventListener("click", disaplyTest, false); }

	if (checkButton.addEventListener)
	{ checkButton.addEventListener("click", checkAnswers, false); }

	if (resetButton.addEventListener)
	{ resetButton.addEventListener("click", resetTest, false); }
} // end FUNCTION eventListeners

function init()
{
	eventListeners();
} // end FUNCTION init

//XBCEL
if(window.addEventListener)
{ window.addEventListener("load", init, false); }

var entropy;
var strengthLevels = {};

function kickStart(){
	$("#userInput").bind("keyup", baseCheck);
	
}

function baseCheck(strength){
    var retVals = {};
	var passString;
	var strength = $("#strength");
	setBase();
	passString = $("#userInput").val();
	if(passString == ''){
		strength.html("Weak!").removeClass("strong stronger strongest").addClass("weak");
	}	
	passChar = passString.split("");
	computeStrength(passChar,passString);
	outputResult(strength);
}

function setBase(){
	entropy = 0;
	strengthLevels.start = 4;
	strengthLevels.second = 2;
	strengthLevels.third = 1.5;
	strengthLevels.last = 1;
	strengthLevels.caseBonus = 1.5;
	strengthLevels.digitBonus = 1.5;
	strengthLevels.symBonus = 3;
}

function computeStrength(passchar,passString){
	var match = {};
	for(i=0;i<passChar.length;i++){
		if(i==0){
			entropy += strengthLevels.start;
		}
		else if(i>0 && i<7){
			entropy += strengthLevels.second;
		}
		else if(i>6 && i<18){
			entropy += strengthLevels.third;
		}
		else{
			entropy += strengthLevels.last;
		}
	}
		
    var pattCase = new RegExp("^.*[a-z]+.*[A-Z]+.*$|^.*[A-Z]+.*[a-z]+.*$");	
	match.mixedCase = pattCase.test(passChar);
	if(match.mixedCase){
		entropy += strengthLevels.caseBonus;
	}
	
	//console.log(match.mixedCase);
	
	//match.OnlySmall = false;
	//match.OnlyBig = false;
	
	var pattDigit = new RegExp("^.*[0-9].*$");
	match.digit = pattDigit.test(passChar);
	if(match.digit){
		entropy += strengthLevels.digitBonus;
	}
	else{
		match.OnlySmall = passString.match(/^[a-z]+$/);
	
		//var pattOnlyBig = new RegExp(/^[A-Z]+$/);	
		match.OnlyBig = passString.match(/^[A-Z]+$/);
	}
	
	//console.log(match.digit);
	
	var pattSym = new RegExp("^.*[#!@#$%\^&*\(\)\{\}\\[\\]<>?/|\\\\-]+.*$");	
	match.sym = pattSym.test(passChar);
	if(match.sym){
		entropy += strengthLevels.symBonus;
	}
	
	//console.log(match.sym);
	 
	//var pattOnlySmall = new RegExp(/[a-z]+/);	
	//match.OnlySmall = pattOnlySmall.test(passChar);
	
	//console.log(match.OnlySmall);
	
	//var pattOnlyBig = new RegExp("[A-Z]+");	
	//match.OnlyBig = pattOnlyBig.test(passChar);
	
	//console.log(match.OnlyBig);
	
	//var pattOnlyDigits = new RegExp("[0-9]+");	
	match.OnlyDigits = passString.match(/^[0-9]+$/);

	//console.log(match.OnlyDigits);
	
	if(match.OnlySmall || match.OnlyDigits || match.OnlyBig)
	{ 
		if(passChar.length < 8){
			entropy -= 10;
		}
		else{
			entropy -= 7;
		}	
	}
}


function outputResult(strength){

	if (entropy<18)
	{
		strength.html("Weak!").removeClass("strong stronger strongest").addClass("weak");
	}
	else if (entropy>=18 && entropy<22)
	{
		strength.html("Average!").removeClass("stronger strongest").addClass("strong");
	}
	else if (entropy>=22 && entropy<35)
	{
		strength.html("Strong!").removeClass("strongest").addClass("stronger");
	}
	else if (entropy>=48)
	{
		strength.html("Secure!").addClass("strongest");
	}	
}
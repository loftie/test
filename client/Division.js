var d1 = new ReactiveVar();
var d2 = new ReactiveVar();
var check = new ReactiveVar();
var correct = new ReactiveVar();
var counter = new ReactiveVar();
var corCounter = new ReactiveVar();
var numCheck = new ReactiveVar();
var input= new ReactiveVar();

function picker ()
{
	numCheck.set("yes");
	check.set(false);
	d1.set((Math.floor(Math.random()*10))+3);
	//This next line will ensure a2 is less that a1 and >=1
	d2.set(Math.floor(Math.random()*(d1.get()-2))+2);
};


Template.Division.helpers(
{
	check: function()
	{
	return check.get();
	},
	
	correct: function()
	{
	return correct.get();
	},
	
	D3:function()
	{
		var d3 = d1.get() * d2.get();
		return d3;
	},
	
	D1:function()
	{
	return d1.get();
	},
	
	result:function()
	{
		
		if(counter.get()>0)
		{
			return corCounter.get()+"/"+counter.get();
		}
		else
		{
			return ""
		}
	},
	
	num:function()
	{
		if(numCheck.get()==="no")
		{
			return "Please enter a number.";
		}
		else 
		{
			return "";
		}
	},
	
});

Template.Division.events({
//When clicking element with id Submit (i.e. the button Check!)
'submit #answer':function()
	{	
		
		event.preventDefault();
		// grabs the value of the element ans(i.e. the text box)
		input.set(document.getElementById("ans").value);
		//console.log(i)
		if(isNaN(input.get())===true||input.get()==="")
		{
			numCheck.set("no");
			console.log(numCheck.get());
			
		}
		else if(isNaN(input.get())===false)
		{
			numCheck.set("yes");
			check.set(true);
			counter.set(counter.get()+1);
			
			if (input.get()==d2.get())
			{
				corCounter.set(corCounter.get()+1);
				correct.set("Correct!");
				//console.log("correct!")
			}
			else
			{
				correct.set("Incorrect! The answer is "+d2.get()+".");
				//console.log("wrong!");
			}
		}
	},
	
'click #next':function()
	{
		picker();		
	},
/*'click #roll':function()
	{
		picker();
	},*/
});

Template.Division.onRendered(function()
{
	picker();
	counter.set(0);
	corCounter.set(0);
	console.log("RENDERED!");
	document.getElementById("ans").focus();
});
var s1 = new ReactiveVar();
var s2 = new ReactiveVar();
var s3 = new ReactiveVar();
var check = new ReactiveVar();
var correct = new ReactiveVar();
var counter = new ReactiveVar();
var corCounter = new ReactiveVar();
var input= new ReactiveVar();
var numCheck = new ReactiveVar();

function picker()
{
	numCheck.set("yes");
	check.set(false);
	s1.set(Math.floor(Math.random()*30)+4);
	//This next line will ensure a2 is less that a1 and >=2
	s2.set(Math.floor(Math.random()*(s1.get()-3))+2);
	s3.set(s1.get()-s2.get());
};

Template.Subtraction.helpers(
{
	check: function()
	{
		return check.get();
	},
	correct: function()
	{
		return correct.get();
	},
	S1:function()
	{
		return s1.get();
	},
	S2:function()
	{
		return s2.get()	;
	},
	S3:function()
	{
		return s3.get()	;
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
	
}
);

Template.Subtraction.events({
//When clicking element with id Submit (i.e. the button Check!)
'submit #answer':function()
	{
		event.preventDefault();
		// grabs the value of the element ans(i.e. the text box)
		input.set(document.getElementById("ans").value);
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
			
			if (input.get()==s3.get())
				{
					corCounter.set(corCounter.get()+1);
					correct.set("Correct!");
					//console.log("correct!")
				}
			else
				{
				correct.set("Incorrect! The answer is "+s3.get()+".");
				//console.log("wrong!")
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
		console.log("HI");
	},*/
});

Template.Subtraction.onRendered(function()
{
	picker();
	counter.set(0);
	corCounter.set(0);
	document.getElementById("ans").focus();
});
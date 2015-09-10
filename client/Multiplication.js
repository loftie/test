var m1 = new ReactiveVar();
var m2 = new ReactiveVar();
var m3 = new ReactiveVar();
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
	m1.set(Math.floor(Math.random()*11)+2);
	m2.set(Math.floor(Math.random()*11)+2);
	m3.set(m1.get()*m2.get());
};

picker();
	
Template.Multiplication.helpers(
{
	check: function()
	{
		return check.get();
	},
	correct: function()
	{
		return correct.get();
	},
	M1:function()
	{
		return m1.get();
	},
	M2:function()
	{
		return m2.get()	;
	},
	M3:function()
	{
		return m3.get()	;
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

Template.Multiplication.events({
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
			
			if (input.get()==m3.get())
				{
					corCounter.set(corCounter.get()+1);
					correct.set("Correct!");
				}
				
			else
				{
					correct.set("Incorrect! The answer is "+m3.get()+".");
				};
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

Template.Multiplication.onRendered(function()
{
	picker();
	counter.set(0);
	corCounter.set(0);
	document.getElementById("ans").focus();
});
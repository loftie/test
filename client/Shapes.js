var a = new ReactiveVar();
var b = new ReactiveVar();
var c = new ReactiveVar();
var d = new ReactiveVar();
var check = new ReactiveVar();
var correct = new ReactiveVar();
var question = new ReactiveVar();
var numCheck = new ReactiveVar();
var input= new ReactiveVar();
var counter = new ReactiveVar();
var corCounter = new ReactiveVar();


function picker(){
numCheck.set("yes");
//Creates a random number to decide question type
question.set(Math.floor(Math.random()*3+1));
//console.log("NEW");
check.set(false);
//If statement creating question based on random number
if(question.get()==1)
	{
		//Creates random numbers and calculates area of a triangle
		b.set(Math.floor(Math.random()*5+4));
		c.set(Math.floor(Math.random()*6+5));
		d.set("triangle");
		a.set((b.get()*c.get())/2);
		
	}
	
else if(question.get()==2)
	{
		//Creates random numbers and calculates area of a square
		b.set(Math.floor(Math.random()*5+4));
		c.set(Math.floor(Math.random()*6+5));
		//Chooses text depending if the shape is a rectangle or square
		if(b.get()==c.get())
		{
			d.set("square");
		}
		else
		{
			d.set("rectangle");
		};
		a.set(b.get()*c.get());
			
	}
	
else if(question.get()==3)
	
	{
		//Creates random numbers and calculates area of a circle
		b.set(Math.floor(Math.random()*5+4));
		d.set("circle");
		c.set(Math.PI*Math.pow(b.get(),2));
		a.set(c.get().toFixed(2));

	};	
};

Template.shapes.helpers
({
	shape:function()
		{
			if(question.get()==3)
				{
					return d.get()+" with radius "+b.get()+", to two decimal places";
				}
			else
				{	
					return d.get()+" with width "+b.get()+" and height "+c.get();
				}
		},
		
		
	check: function()	
		{
			return check.get();
		},
	correct: function()
		{
			return correct.get();
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
})

Template.shapes.events
({

'click #sRoll':function()
{
	picker();
},	

'click #next':function()
{
	picker();
},

'submit #answer':function(event)
	{
		event.preventDefault();
		input.set(document.getElementById("sAns").value);
		
		if(isNaN(input.get())===true||input.get()==="")
		{
			numCheck.set("no");
			console.log(numCheck.get());
			
		}
		else if(isNaN(input.get())===false)
		{
			counter.set(counter.get()+1);
			console.log(counter.get());
			numCheck.set("yes");
			check.set(true);
			if(input.get()==a.get())
				{
					corCounter.set(corCounter.get()+1);
					correct.set("Correct!");
				}
			else
				{
					correct.set("Incorrect! The answer is "+a.get()+".");
				};
		}
	}
});

Template.shapes.onRendered(function()
{
	
	picker();
	counter.set(0);
	corCounter.set(0);
	document.getElementById("sAns").focus();
});
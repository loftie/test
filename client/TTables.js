var t = new ReactiveVar();

Template.tTables.events({
//On submit, checks to see if the input is between 1-12 inclusive and also a whole number.  
//If yes sets t to the number, if not sets it to "no"
'submit #answer':function()
	{
		var i = Number(document.getElementById("tChoice").value);
		event.preventDefault();
		if(i>0 && i<13 && Math.floor(i)==i)
		{
			
			t.set(i);
		}
		else
		{
			t.set("no");
		}
	},
	
	
});

//creates variables t1-t12 to fill in the table of multiples
var t1 = function(){return t.get()*1};
var t2 = function(){return t.get()*2};
var t3 = function(){return t.get()*3};
var t4 = function(){return t.get()*4};
var t5 = function(){return t.get()*5};
var t6 = function(){return t.get()*6};
var t7 = function(){return t.get()*7};
var t8 = function(){return t.get()*8};
var t9 = function(){return t.get()*9};
var t10 = function(){return t.get()*10};
var t11 = function(){return t.get()*11};
var t12 = function(){return t.get()*12};

Template.tTables.helpers
({
//creates an object(?) with tNumber and tA
	tSelected: 
		[
			{tNumber: 1, tA:t1},
			{tNumber: 2, tA:t2},
			{tNumber: 3, tA:t3},
			{tNumber: 2, tA:t4},
			{tNumber: 5, tA:t5},
			{tNumber: 6, tA:t6},
			{tNumber: 7, tA:t7},
			{tNumber: 8, tA:t8},
			{tNumber: 9, tA:t9},
			{tNumber: 10, tA:t10},
			{tNumber: 11, tA:t11},
			{tNumber: 12, tA:t12},
	],
tMult : t1,

//sets nSelect to true if t is not a number, and false if it is.  Used to show/hide the table
nSelect : function()
{
	return (isNaN(t.get()))
},

});

Template.tTables.onRendered(function(){
	t.set("no");
	document.getElementById("tChoice").focus();
})


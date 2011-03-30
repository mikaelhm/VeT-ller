// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#fff');

// create tab group
var tabGroup = Titanium.UI.createTabGroup({
});


//
// create base UI tab and root window
//
var TimerStarted = 0;
var UpdateTimer;
var Timer = 0;

var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var lblTimer = Titanium.UI.createLabel({
	color:'#999',
	text: '',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

var btnStartStopTimer = Titanium.UI.createButton({
	backgroundColor: '#ddd',
	width:'auto',
	bottom: 'auto',
	title: 'Ny ve starter',
	font:{fontSize:20,fontFamily:'Helvetica Neue',color:'#000'}
});



function updateTimerLbl () {
        now = (new Date()).getTime();
	timer = now - TimerStarted ;
	millisec = timer % 1000;
	sec = ((timer - millisec) / 1000) % 60;
	minutes = ((timer - sec - millisec) / (1000*60) ) % 60;
	timer = String.format("%02.0f:%02.0f:%03.0f",minutes,sec,millisec)
	lblTimer.text = timer;
	//Titanium.API.info("StartTime: " + TimerStarted + " Now: "+ now + " Timer: " + timer );
}

function startStopTimer() {
	if (TimerStarted==0) {
		
		TimerStarted = (new Date()).getTime();
		Titanium.API.info("Start Timer: " + Timer );
		updateTimerLbl();
		UpdateTimer = setInterval(updateTimerLbl,30);

	} else 	{
		var now = (new Date()).getTime();
		Timer = now - TimerStarted ;
		TimerStarted = 0;
		Titanium.API.info("Stop Timer" + Timer );
		clearInterval(UpdateTimer);
	}
}







btnStartStopTimer.addEventListener('click',function(e)
{
   	Titanium.API.info("You clicked the start btn");
//	startStopTimer();
//	clearInterval(UpdateTimer);
	
});
btnStartStopTimer.addEventListener('doubletap',function(e)
{
   	Titanium.API.info("You doubletap the start btn");
//	startStopTimer();
	
});
btnStartStopTimer.addEventListener('singletap',function(e)
{
   	Titanium.API.info("You singletap the start btn");
	startStopTimer();	
});

win1.add(lblTimer);
win1.add(btnStartStopTimer);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();

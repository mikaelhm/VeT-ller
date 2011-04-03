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
	font:{fontSize:40,fontFamily:'Helvetica Neue'},
	textAlign:'center',
    bottom: 'auto',
	width:'auto'
});

var btnStartStopTimer = Titanium.UI.createButton({
	backgroundColor: '#ddd',
	width:'auto',
	bottom: 50,
	title: 'Start',
	font:{fontSize:30,fontFamily:'Helvetica Neue',color:'#000'},
   	borderWidth: 2,
	borderRadius: 10,
	borderColor: '#222'
});

var contractionViewData = [];
var contractionView = Titanium.UI.createTableView({
    data: contractionViewData,
	top: 30,
	left: 20,
	right: 20,
	height: 178,
	borderWidth: 2,
	borderRadius: 10,
	borderColor: '#222'
});

win1.add(contractionView);
win1.add(btnStartStopTimer);
win1.add(lblTimer);

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





Ti.include('pregnancy.js');
Ti.include('timer.js');


var pregnancy1 = new Pregnancy();
var timer = new Timer();
var intervalUpdateTimer;

function startStopTimer() {
	if (timer.running == 0) {
        timer.reset();
   		timer.start();
		intervalUpdateTimer = setInterval(function (){
            lblTimer.text = timer.getDurationString();
            },100);
        btnStartStopTimer.title = "Stop";
	} else {
	    timer.stop();
    	addNewContraction();
        
        btnStartStopTimer.title = "Start";
        clearInterval(intervalUpdateTimer);
    }
}

function addNewContraction() {
    var contraction = new Contraction(timer.startTime,timer.endTime);
    var length = contraction.getLengthString();
    var distance = "";
    var text = "";
    var newID = pregnancy1.addContraction(contraction);
    
    text = "L:" + length;
     
    if(pregnancy1.contractions.length > 1) {
        distance = pregnancy1.contractionDistanceString(newID-1, newID);
        text += " D:" + distance;
    }

    var rowData = {title: text};
    contractionView.appendRow(rowData);
    contractionView.scrollToIndex(pregnancy1.contractions.length*2)

}





btnStartStopTimer.addEventListener('click',function(e)
{
   	Titanium.API.info("You clicked the start btn");
	
});
btnStartStopTimer.addEventListener('doubletap',function(e)
{
   	Titanium.API.info("You doubletap the start btn");	
});
btnStartStopTimer.addEventListener('singletap',function(e)
{
   	Titanium.API.info("You singletap the start btn");
	startStopTimer();
    	
});

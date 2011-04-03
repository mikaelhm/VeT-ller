//////////
// Global Functions
//////////

function msToTimeString(time){
    var millisec = time % 1000;
	var sec = ((time - millisec) / 1000) % 60;
	var minutes = ((time - sec - millisec) / (1000*60) ) % 60;
	var timeString = String.format("%02.0f:%02.0f:%03.0f",minutes,sec,millisec)

    return timeString;
}


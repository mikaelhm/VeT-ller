Ti.include('includes.js');

//////////
// Timer Class
//////////

//
function timerGetDuration(){
    var duration = 0;
    if (this.running == 0)
        duration = this.endTime - this.startTime;
    else {
        var now = (new Date()).getTime();
        duration = now - this.startTime;
    }

    return duration;
}

function timerGetDurationString() {
    return msToTimeString( this.getDuration());
}

function timerStart() {
    this.running = 1;
    if (this.startTime == 0) {
        this.startTime = (new Date()).getTime();
    }
}

function timerStop() {
    this.running = 0;
    this.endTime = (new Date()).getTime();
}

function timerToggle() {
    if (this.running == 0)
        this.start();
    else
        this.stop();
}

function timerReset() {
    this.running = 0;
    this.startTime = 0;
    this.endTime = 0;
}

function Timer(){
    this.running = 0;
    this.startTime = 0;
    this.endTime = 0;

    //object methods
    this.getDuration = timerGetDuration;
    this.getDurationString = timerGetDurationString;
    this.start = timerStart;
    this.stop = timerStop;
    this.toggle = timerToggle;
    this.reset = timerReset;
}


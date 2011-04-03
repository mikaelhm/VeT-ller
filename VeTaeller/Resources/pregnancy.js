Ti.include('includes.js');

//////////
// Contraction object, with start- and end-timestamp in ms since 1970
//////////

// Function to calculate the lenght of a contraction in ms.
function contractionGetLength(){
    return this.endTime - this.startTime;
}
// Function to calculate the lenght of a contraction in ms.
function contractionGetLengthString(){
    return msToTimeString(this.getLength());
}
// Contraction object constructor function
function Contraction(startTime, endTime){
    this.startTime = startTime;
    this.endTime = endTime;
    this.getLength = contractionGetLength;
    this.getLengthString = contractionGetLengthString;
}

//////////
// Pregnancy object
//////////

// function to calculate the distance between two contractions in the 
// list of contractions of the birth. Note that the
// distance is measured between start and start of the two contractions.
function pregnancyContractionDistance(contID1,contID2){    
    return this.contractions[contID2].startTime - 
            this.contractions[contID1].startTime;
}

// Return contration distance as time formated string.
function pregnancyContractionDistanceString(contID1,contID2){    
    return msToTimeString(this.contractions[contID2].startTime - 
                               this.contractions[contID1].startTime);
}

// This function adds a contraction to the birth, and check that is is legal.
function pregnancyAddContraction(contract){
    if (contract.startTime == null)
        throw "Contraction cannot be added, as the startTime is null.";
    if (contract.endTime == null)
        throw "Contraction cannot be added, as the endTime is null.";
    this.contractions.push(contract)

    return this.contractions.length - 1;
}

// The pregnancy object constructor.
function Pregnancy(){
    this.contractions = new Array();
    this.addContraction = pregnancyAddContraction;
    this.contractionDistance = pregnancyContractionDistance;
    this.contractionDistanceString = pregnancyContractionDistanceString;
}

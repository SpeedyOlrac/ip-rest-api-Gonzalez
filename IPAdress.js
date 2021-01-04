/*
    IP Address Manager
    Fuction: takes in a CIDR block (e.g. 10.0.0.1/24) and
        add all IP addresses within that block to the data store with status “available”
    

    Author: Carlo Gonzalez
*/



var Netmask = require('netmask').Netmask;

var block = new Netmask('0.0.0.0/0');
var IPlist = [];


 // Main Fuction
 function createIPAdress (ip){

    block = new Netmask(ip);block;
    block.forEach(function(item, index, array){
        IPlist.push({IPadress: item, avalable: true});
 
    })
    
    return [IPlist, block];
 }
 
 //* **List IP addresses** - return all IP addresses in the system with their current status

function listIP(){
    IPlist.forEach( function(item, index, array){
        var message = item.IPadress +": " + item.avalable;
        console.log(message);

    })
}


 // * **Acquire an IP** - set the status of a certain IP to “acquired”
function acuquireIP(ip){
    var num = _isInBlock(ip);

    if(num == -1){
        console.log(ip + " is not in the block.")
    }
    else if(IPlist[num].avalable){
        IPlist[num].avalable = false;
        console.log(IPlist[num]);
    }
    else{
        console.log(ip + " is already taken.")
    }
    
}

 // * **Release an IP** - set the status of a certain IP to “available”

 function resleaseIP(ip){
    var num = _isInBlock(ip);
    if(num == -1){
        console.log(ip + " is not in the block.")
    }
    else if(IPlist[num].avalable){
        console.log(ip + " is already available.")
    }
    else{
        IPlist[num].avalable = true;
        console.log(IPlist[num]);
    }

 }

// Private Function to find the Index of the Ip address in block.
function _isInBlock(ip){
    var count = 0;

    var answer = -1;
    if (block.contains(ip)){
       
        block.forEach( function(item, index, array){
            if( ip == item){
                console.log(count);
                answer = count;
            }
            count++;
       })
    }
    
    return answer;

}

createIPAdress('10.0.0.0/24');
 console.log(IPlist[0]);
//listIP();
acuquireIP("10.0.0.216");
resleaseIP("10.15.220.216");
resleaseIP("10.0.0.216");
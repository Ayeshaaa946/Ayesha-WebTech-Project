function calculateTrafficLightDensity(density,isemergency){
    let duration;
    
    if(isemergency=="Yes"){
        duration=90;
    }
    else if(density=="High"){
        duration=60;
    }
    else if(density=="Medium"){
        duration=40;
    }
    else if(density=="Low"){
        duration=20;
    }
    else{
        duration="Invalid Input"
    }
    return duration;
    }
    
    let currentdensity="High";
    let emergencymode="yes";;
    
    let result=calculateTrafficLightDensity(currentdensity,emergencymode);
    console.log("Green light duration:"+result+" seconds");
var prediction1="";
var prediction2="";

Webcam.set({
    height:300,
    width:350,
    img_format:'png',
    png_quality:90    
});

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="my_image" src="'+data_uri+'"></img>';
    });
}
console.log("Ml5 Version", ml5.version);

classify=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ogFmBho-S/model.json",model);

function model(){
    console.log("Model Is Loaded");
}

function check(){
    my_image=document.getElementById("my_image");
    classify.classify(my_image,gotResult);
}
function gotResult(error,result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        prediction1=result[0].label;
        prediction2=result[1].label;
        document.getElementById("emotion_name").innerHTML=prediction1;
        document.getElementById("emotion_name_2").innerHTML=prediction2;
        speak();

        if(prediction1=="Thumbs Down"){
            document.getElementById("emotion_face_1").innerHTML= "&#128078" ;
        }
        else if(prediction1=="Thumbs Up"){
            document.getElementById("emotion_face_1").innerHTML= "&#128077";
        }
        else if(prediction1=="Good"){
            document.getElementById("emotion_face_1").innerHTML="&#128076";
        }
        else if(prediction1=="Peace Sign"){
            document.getElementById("emotion_face_1").innerHTML="&#x270c;";
        }

        if(prediction2=="Thumbs Down"){
            document.getElementById("emotion_face_2").innerHTML= "&#128078" ;
        }
        else if(prediction2=="Thumbs Up"){
            document.getElementById("emotion_face_2").innerHTML= "&#128077";
        }
        else if(prediction2=="Good"){
            document.getElementById("emotion_face_2").innerHTML="&#128076";
        }
        else if(prediction2=="Peace Sign"){
            document.getElementById("emotion_face_2").innerHTML="&#x270c;";
        }
    }
}


function speak(){
    speech=window.speechSynthesis;
    speak1="The First Prediction is "+prediction1;
    speak2="The Second Prediction is"+prediction2;
    utterThis=new SpeechSynthesisUtterance(speak1+speak2);
    speech.speak(utterThis);
}


function analyze(){
    var params = {
            "returnFaceId": "false",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "age,gender",
        };

    var imgElem = $("#outputImg");
    var Link = $("#input").val();
    var URL = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?' + $.param(params);
    var Key = 'f8ade2828fe24445a7eccb70fadaf815';

    var reqBody = {
        "url": Link
    };

    var myHeader =  new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': Key
    });

    var initObject = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: myHeader
    }

    var request = new Request(URL, initObject);

    imgElem.attr("src", Link);
    fetch(request).then(function(response){
        if(response.ok){
            return response.json();
        }
        else{
            return Promise.reject(new Error(response.statusText));
        }
    }).then(function(response){
        $("#outputAttr").html("Age: " + response[0].faceAttributes.age + "</br> Gender: " + response[0].faceAttributes.gender);
    }).catch(function(err){
        alert(err);  
        $("#outputAttr").html("");
    });

}



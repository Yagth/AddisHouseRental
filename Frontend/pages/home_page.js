
img1=document.querySelector("#img1");
img2=document.querySelector("#img2");
img3=document.querySelector("#img3");
forwardButton=document.getElementById("forward-button")

 forwardButton.addEventListener("click",function(){
    console.log("d")
    console.log(style.getPropertyValue("img1"));
    if(img1.style.opacity=="1"){
       img1.style.opacity="0";
        img2.style.opacity="1";
        // console.log( "joh")
       
        


    }
    
    else if(img2.style.opacity=="1") {
        img2.style.opacity="0"
        img3.style.opacity="1";
        


    }
    else if(img3.style.opacity=="1"){
        img3.style.opacity="0"
        img1.style.opacity="1";
        
    }

    
 })
 
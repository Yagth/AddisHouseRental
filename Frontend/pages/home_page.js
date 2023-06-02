img1=document.getElementById("img1")
img2=document.getElementById("img2")
img3=document.getElementById("img3")
forwardButton=document.getElementsById("forward-button")
 forwardButton.addEventListener("click",()=>{
    if(img1.style.opacity=="1"){
       img1.style.opacity="0";
        img2.style.opacity="1";
        


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
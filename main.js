var selectModelo = document.getElementById("modelo");
var c1 = document.getElementById("c1");
var c2 = document.getElementById("c2");
var c3 = document.getElementById("c3");
var txtColor = document.getElementById("txtColor");
var canvas = document.getElementById("cv");
var ctx = canvas.getContext("2d");

function cambiarColor(){
    var v1 = c1.value;
    var v2 = c2.value;
    var v3 = c3.value;
    var color = "";

    if(selectModelo.value === "RGB"){
        color = "rgb(" + v1 + "," + v2 + "," + v3 + ")";
    } else if(selectModelo.value === "CMY"){
        color = "rgb(" + (255 - v1) + "," + (255 - v2) + "," + (255 - v3) + ")";
    } else if(selectModelo.value === "HSL"){
        color = "hsl(" + v1 + "," + v2 + "%," + v3 + "%)";
    }

    txtColor.innerText = color;

    // Se corrige canvas.width
    ctx.clearRect(0, 0, canvas.width, canvas.height);

   //triangulo
   ctx.fillStyle = "skyblue";
   ctx.beginPath();
   ctx.moveTo(50, 10);
   ctx.lineTo(90, 90 );
   ctx.lineTo(10,90)
   ctx.closePath();
   ctx.fill();

    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();


}

selectModelo.onchange = function(){
    c1.max = (selectModelo.value === "HSL") ? 360 : 255;
    c2.max = (selectModelo.value === "HSL") ? 100 : 255;
    c3.max = (selectModelo.value === "HSL") ? 100 : 255;
    cambiarColor();
};

c1.oninput = cambiarColor;
c2.oninput = cambiarColor;
c3.oninput = cambiarColor;

cambiarColor();

//funcion para exportar a imagen PNG y JPEG

function exportar(formato){
    var canvasTemporal = document.createElement("canvas");
    var ctxTemporal = canvasTemporal.getContext("2d");
    
    canvasTemporal.width = canvas.width;
    canvasTemporal.height = canvas.height;

    if(formato==="jpeg"){
        ctxTemporal.fillStyle="#ffffff";
        ctxTemporal.fillRect(0,0, canvasTemporal.width, canvasTemporal.height);
    }
    ctxTemporal.drawImage(canvas,0,0);
    var enlace = document.createElement("a");
    enlace.download = "poligono." +(formato ==="png" ? "png" : "jpg") //jpg si no funciona
    enlace.href=canvasTemporal.toDataURL("image/" + formato, 0.9);
    enlace.click();

}
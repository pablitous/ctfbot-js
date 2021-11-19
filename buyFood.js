async function buyFood(){
    //https://cointofish.io/market
    // 154 = seaweed
    // 158 = apple
    // 155 = bread
    /*
    comidas = ["seaweed", "apple", "bread"];
    comidasIds = [154, 158, 155];
    */
    valorCompra = 5;
    comidaAComprar = "bread";
    switch(comidaAComprar){
        case "seaweed":
            comidaCompra = 154
            break;
        case "apple":  //apple
            comidaCompra = 158
            break;
        case "bread":  //bread
            comidaCompra = 155
            break;
    }
    document.getElementById("itemsmarkets").click();
    element = document.getElementById("marketitems");
    element.value = comidaCompra;
    var event = new Event("change");
    element.dispatchEvent(event);
    element.click();
    await sleep(getRandomInt(500, 1200));
    elementFilter = document.getElementById("marketorders");
    elementFilter.value = 3;
    var eventFilter = new Event("change");
    elementFilter.dispatchEvent(eventFilter);
    elementFilter.click();

    if(cerrarModal = document.getElementsByClassName("closeactmodalp")){
        cerrarModal[0].click();
    }

    await sleep(getRandomInt(1000, 2000));
    document.getElementById("searchmarket").click();
    await sleep(getRandomInt(500, 900));
    elementsPrices = document.getElementsByClassName("pricefish");
    if (elementsPrices.length > 0) {
        precioDeComida = parseInt(elementsPrices[0].innerText);
        console.log("Precio de la comida: " + precioDeComida);
        if (precioDeComida <= valorCompra) {
            elementsPrices[0].click();
            console.log("Comprando comida");
            await sleep(getRandomInt(300, 600));
            if(buyButton = document.getElementsByClassName("buyitemshopm")[0]){
                var box = buyButton.getBoundingClientRect(),
                coordX = box.left + (box.right - box.left) / 2 + getRandomInt(-10,10),
                coordY = box.top + (box.bottom - box.top) / 2 + getRandomInt(-10,10);
                simulateMouseEvent(buyButton, "mousedown", coordX, coordY);
                simulateMouseEvent(buyButton, "mouseup", coordX, coordY);
                simulateMouseEvent(buyButton, "click", coordX, coordY);
                console.log("Comida Comprada");
            }else{
                console.log("No se pudo comprar la comida");
            }
            
        }
    }
    await sleep(getRandomInt(2000, 4000));
    buyFood();

}


function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

//get random number between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dateNow() {
    var date = new Date();
    var date = toJSONLocal(date);
    return date;
}

function toJSONLocal(date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 19);
}

var simulateMouseEvent = function (element, eventName, coordX, coordY) {
    element.dispatchEvent(
        new MouseEvent(eventName, {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: coordX,
            clientY: coordY,
            button: 0,
        })
    );
};

buyFood();
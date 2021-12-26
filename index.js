    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    //get random number between min and max
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //var timerMainLogic = getRandomInt(120000, 320000);
    //var timerMainLogic = getRandomInt(2000, 4000);
    async function mainLogic() {
        while (true) {
            //alert('do whatever');
            await sleep(getRandomInt(2000, 4000));
            
            document.getElementById("metalog1").getElementsByTagName("a")[0].click();
            await sleep(getRandomInt(3000, 6000));
            await getDailyReward();
            await doFishes();
            var timerMainLogic = getRandomInt(300000, 1080000);
            timerMainLogicNum = timerMainLogic / 1000 / 60;
            console.log(
                dateNow()+" Waiting " + timerMainLogicNum.toFixed(2) + " minutes for next check"
            );
            await sleep(timerMainLogic);
        }
    }
    async function getDailyReward() {
        if (
            document
            .getElementsByClassName("dailyrew")[0]
            .getElementsByTagName("button")[0].disabled == true
        ) {
            console.log(dateNow() + " Daily Reward already claimed");
        } else {
            document
                .getElementsByClassName("dailyrew")[0]
                .getElementsByTagName("button")[0]
                .click();
            await sleep(getRandomInt(2000, 5000));
            document.getElementById("claimrwrd").click();
        }
    }

    async function doFishes() {
        var fishes = document
            .getElementsByClassName("cardn1")[0]
            .getElementsByClassName("card-body")[0]
            .getElementsByClassName("list-group");
        var fishCount = fishes.length;
        console.log(dateNow()+" You have " + fishCount + " fishes");
        for (var i = 0; i < fishCount; i++) {
            //console.log(fishes[i].getElementsByClassName("progress-bar")[0].getAttribute("style").split(":")[1].split("%")[0].split(".")[0].replace(" ", ""));
            feedPercentage = fishes[i]
                .getElementsByClassName("progress-bar")[0]
                .getAttribute("style")
                .split(":")[1]
                .split("%")[0]
                .split(".")[0]
                .replace(" ", "");
            if (feedPercentage < 50) {
                console.log(dateNow()+" Need to fucking fed the fishes");
                fishes[i].getElementsByClassName("feedfish")[0].click();
                await sleep(getRandomInt(300, 1200));
                var foodAvailable = new Array();
                var foodExists = new Array();
                foodExists[0] = [1025, "Pumpkin soup"];
                foodExists[1] = [1003, "Bread"];
                foodExists[2] = [1002, "Apple"];
                foodExists[3] = [1004, "Seaweed"];
                Array.from(document.querySelector("#avfoods").options).forEach(async function (
                    option_element
                ) {
                    let option_text = option_element.text;
                    let option_value = option_element.value;
                    if (option_value != "0") {
                        foodAvailable[option_value] = option_text.split("[")[1].split("]")[0];
                    }
                });
                //console.log(foodExists);
                await sleep(getRandomInt(200, 1200));
                var fed = false;
                neededFood = document.getElementsByClassName("nobb")[1].innerHTML;
                neededFood = parseInt(neededFood);
            
                for(j=0;j<foodExists.length;j++){
                    //console.log(dateNow() + 'recorro Cada Comida');
                    await sleep(getRandomInt(200, 800));
                    //console.log(dateNow() + fed + " " + foodExists[j][1]);
                    //console.log(dateNow() + 'recorro Cada Comida');
                    foodAvailableInt = parseInt(foodAvailable[foodExists[j][0]]);
                    if (foodAvailableInt >= neededFood && fed == false) {
                        console.log(
                            dateNow()+" Found food " + foodExists[j][1] + " with " + foodAvailable[foodExists[j][0]] + " units"
                        );
                        element = document.getElementById("avfoods");
                        element.value = foodExists[j][0];
                        var event = new Event("change");
                        element.dispatchEvent(event);
                        //document.getElementById("avfoods").val(foodExists[j][0]).trigger('change');
                        document.getElementsByClassName("feednowfish")[0].disabled = false;
                        await sleep(getRandomInt(200, 1000));
                        var theButton = document.getElementsByClassName("feednowfish")[0];
                        var box = theButton.getBoundingClientRect(),
                        coordX = box.left + (box.right - box.left) / 2 + getRandomInt(-10,10),
                        coordY = box.top + (box.bottom - box.top) / 2 + getRandomInt(-10,10);
                        simulateMouseEvent(theButton, "mousedown", coordX, coordY);
                        simulateMouseEvent(theButton, "mouseup", coordX, coordY);
                        simulateMouseEvent(theButton, "click", coordX, coordY);
                        //document.getElementsByClassName("feednowfish")[0].click();
                        fed = true;
                        await sleep(getRandomInt(200, 1000));
                        console.log(
                            dateNow()+" The fish number " +
                            i +
                            " with id " +
                            document.getElementsByClassName("feednowfish")[0].id +
                            " has been fed with " + foodExists[j][1]
                        );
                        break;
                    }else{
                        console.log(dateNow()+" No "+foodExists[j][1]+" available");
                    }    
                    
                };
                await sleep(getRandomInt(200, 1200));
            } else {
                console.log(
                    dateNow()+" Fish " +
                    fishes[i].getElementsByClassName("feedfish")[0].id +
                    " don`t need to be fed"
                );
                await sleep(getRandomInt(200, 1200));
            }
        }
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

    mainLogic();

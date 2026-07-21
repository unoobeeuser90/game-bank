// ===== ОДНОРУКИЙ БАНДИТ =====
// Общий баланс с банком через localStorage

const reels = [
    document.getElementById("r1"),
    document.getElementById("r2"),
    document.getElementById("r3")
];

const balanceText = document.getElementById("balance");
const message = document.getElementById("message");
const betInput = document.getElementById("bet");

const knob = document.getElementById("knob");

const spinSound = document.getElementById("spinSound");
const stopSound = document.getElementById("stopSound");
const winSound = document.getElementById("winSound");
const jackpotSound = document.getElementById("jackpotSound");


// Символы автомата

const symbols = [
    "🍒",
    "🍋",
    "🍇",
    "⭐",
    "🔔",
    "7️⃣"
];


// ===== БАЛАНС =====

function getBalance(){

    let balance = localStorage.getItem("balance");

    if(balance === null){

        balance = 10000;

        localStorage.setItem(
            "balance",
            balance
        );

    }

    return Number(balance);

}


function setBalance(value){

    localStorage.setItem(
        "balance",
        value
    );

}


function showBalance(){

    if(balanceText){

        balanceText.innerHTML = getBalance();

    }

}


showBalance();


window.addEventListener(
    "focus",
    showBalance
);


// ===== СОСТОЯНИЕ ИГРЫ =====

let spinning = false;



// ===== СЛУЧАЙНЫЙ СИМВОЛ =====

function randomSymbol(){

    return symbols[
        Math.floor(
            Math.random() * symbols.length
        )
    ];

}



// ===== ЗАПУСК ИГРЫ =====

function spin(){


    if(spinning){
        return;
    }


    let bet = Number(
        betInput.value
    );


    if(bet <= 0){

        message.innerHTML =
        "Введите ставку";

        return;

    }



    let balance = getBalance();



    if(balance < bet){

        message.innerHTML =
        "❌ Недостаточно денег";

        return;

    }



    // списываем ставку

    balance -= bet;

    setBalance(balance);

    showBalance();



    spinning = true;


    message.innerHTML =
    "🎰 Крутится...";



    reels.forEach(function(reel){

        reel.classList.add("spin");

    });



    if(spinSound){

        spinSound.currentTime = 0;

        spinSound.play();

    }



    setTimeout(
        stopSpin,
        2500
    );


}
// ===== ОСТАНОВКА БАРАБАНОВ =====

function stopSpin(){


    reels.forEach(function(reel){

        reel.classList.remove("spin");

    });



    let a = randomSymbol();
    let b = randomSymbol();
    let c = randomSymbol();



    reels[0].innerHTML = a;
    reels[1].innerHTML = b;
    reels[2].innerHTML = c;



    if(stopSound){

        stopSound.currentTime = 0;

        stopSound.play();

    }



    let bet = Number(
        betInput.value
    );


    let balance = getBalance();



    // ===== ДЖЕКПОТ =====

    if(
        a === "7️⃣" &&
        b === "7️⃣" &&
        c === "7️⃣"
    ){


        let win = bet * 20;


        balance += win;


        message.innerHTML =
        "💎 ДЖЕКПОТ! +" + win + " ₽";



        if(jackpotSound){

            jackpotSound.play();

        }



        if(navigator.vibrate){

            navigator.vibrate(
                [200,100,200,100,200]
            );

        }


    }



    // ===== ТРИ ОДИНАКОВЫХ =====

    else if(
        a === b &&
        b === c
    ){


        let win = bet * 5;


        balance += win;


        message.innerHTML =
        "🎉 Победа! +" + win + " ₽";



        if(winSound){

            winSound.play();

        }


    }



    // ===== ДВА ОДИНАКОВЫХ =====

    else if(
        a === b ||
        a === c ||
        b === c
    ){


        let win = bet * 2;


        balance += win;


        message.innerHTML =
        "😊 Выигрыш +" + win + " ₽";



        if(winSound){

            winSound.play();

        }


    }



    // ===== ПРОИГРЫШ =====

    else{


        message.innerHTML =
        "😢 Не повезло";


    }



    setBalance(balance);

    showBalance();


    spinning = false;


}
// ===== РУЧКА АВТОМАТА =====

let dragging = false;
let startY = 0;


// нажали на ручку

knob.addEventListener(
    "pointerdown",
    function(e){

        if(spinning){
            return;
        }


        dragging = true;

        startY = e.clientY;


        knob.setPointerCapture(
            e.pointerId
        );


    }
);



// двигаем ручку

knob.addEventListener(
    "pointermove",
    function(e){


        if(!dragging){
            return;
        }


        let move =
        e.clientY - startY;



        if(move < 0){
            move = 0;
        }


        if(move > 120){
            move = 120;
        }



        knob.style.top =
        move + "px";


    }
);



// отпустили ручку

knob.addEventListener(
    "pointerup",
    function(){


        if(
            Number(
                knob.style.top.replace("px","")
            ) > 80
        ){


            spin();


        }



        dragging = false;



        knob.style.transition =
        "0.3s";



        knob.style.top =
        "0px";



        setTimeout(
            function(){

                knob.style.transition =
                "";

            },
            300
        );


    }
);

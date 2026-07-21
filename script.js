// 🎰 ОДНОРУКИЙ БАНДИТ
// Общий баланс с банком

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


const symbols = [
    "🍒",
    "🍋",
    "🍇",
    "⭐",
    "🔔",
    "7️⃣"
];


let spinning = false;


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

        balanceText.innerHTML =
        getBalance();

    }

}


showBalance();


window.addEventListener(
    "focus",
    showBalance
);



// ===== СЛУЧАЙНЫЙ СИМВОЛ =====

function randomSymbol(){

    return symbols[
        Math.floor(
            Math.random()*symbols.length
        )
    ];

}



// ===== ЗАПУСК =====

function spin(){

    if(spinning) return;


    let bet =
    Number(betInput.value);



    let balance =
    getBalance();



    if(balance < bet){

        message.innerHTML =
        "❌ Нет денег";

        return;

    }



    balance -= bet;

    setBalance(balance);

    showBalance();



    spinning=true;


    message.innerHTML =
    "🎰 Крутим...";


    reels.forEach(function(r){

        r.classList.add("spin");

    });



    if(spinSound){

        spinSound.play();

    }



    setTimeout(
        stopSpin,
        2500
    );

}



// ===== ОСТАНОВКА =====

function stopSpin(){


    reels.forEach(function(r){

        r.classList.remove("spin");

    });



    let a=randomSymbol();
    let b=randomSymbol();
    let c=randomSymbol();



    reels[0].innerHTML=a;
    reels[1].innerHTML=b;
    reels[2].innerHTML=c;



    if(stopSound){

        stopSound.play();

    }



    let bet =
    Number(betInput.value);


    let balance =
    getBalance();



    let win=0;



    if(
        a==="7️⃣" &&
        b==="7️⃣" &&
        c==="7️⃣"
    ){

        win=bet*20;

        message.innerHTML=
        "💎 ДЖЕКПОТ +"+win+" ₽";


        if(jackpotSound){

            jackpotSound.play();

        }

    }


    else if(
        a===b &&
        b===c
    ){

        win=bet*5;

        message.innerHTML=
        "🎉 Победа +"+win+" ₽";


    }


    else if(
        a===b ||
        a===c ||
        b===c
    ){

        win=bet*2;

        message.innerHTML=
        "😊 Выигрыш +"+win+" ₽";

    }


    else{

        message.innerHTML=
        "😢 Проигрыш";

    }



    if(win>0){

        balance+=win;


        if(winSound){

            winSound.play();

        }

    }



    setBalance(balance);

    showBalance();


    spinning=false;

}



// ===== РУЧКА =====

let dragging=false;

let startY=0;



knob.addEventListener(
"pointerdown",
function(e){

    if(spinning) return;


    dragging=true;

    startY=e.clientY;


    knob.setPointerCapture(
        e.pointerId
    );

});



knob.addEventListener(
"pointermove",
function(e){


    if(!dragging) return;


    let y =
    e.clientY-startY;



    if(y<0)y=0;

    if(y>120)y=120;



    knob.style.transform =
    "translateY("+y+"px)";


});



knob.addEventListener(
"pointerup",
function(){


    let y =
    knob.style.transform;



    if(
        y.includes("120") ||
        y.includes("100") ||
        y.includes("90")
    ){

        spin();

    }



    dragging=false;



    knob.style.transition=
    "0.3s";


    knob.style.transform=
    "translateY(0px)";



    setTimeout(function(){

        knob.style.transition="";

    },300);


});

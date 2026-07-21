updateBalance();
buy();
// ===== Баланс =====

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

function getBalance(){
    return Number(localStorage.getItem("balance") || 10000);
}

function setBalance(value){
    localStorage.setItem("balance", value);
}

function showBalance(){
    balanceText.innerHTML = getBalance();
}

showBalance();

let spinning = false;

// ===== Запуск автомата =====

function spin(){

    if(spinning) return;

    let bet = Number(betInput.value);

    if(bet <= 0){
        alert("Введите ставку");
        return;
    }

    let balance = getBalance();

    if(balance < bet){
        alert("Недостаточно денег");
        return;
    }

    balance -= bet;
    setBalance(balance);
    showBalance();

    spinning = true;

    message.innerHTML = "🎰 Крутится...";

    reels.forEach(r => r.classList.add("spin"));

    spinSound.currentTime = 0;
    spinSound.play();

    setTimeout(stopSpin, 2500);

}

// ===== Остановка =====

function stopSpin(){

    reels.forEach(r => r.classList.remove("spin"));

    let a = random();
    let b = random();
    let c = random();

    reels[0].innerHTML = a;
    reels[1].innerHTML = b;
    reels[2].innerHTML = c;

    stopSound.play();

    let bet = Number(betInput.value);
    let balance = getBalance();

    if(a===b && b===c){

        let win = bet * 5;

        if(a==="7️⃣"){

            win = bet * 20;

            jackpotSound.play();

            message.innerHTML = "💎 ДЖЕКПОТ! +" + win + " ₽";

            if(navigator.vibrate){
                navigator.vibrate([200,100,200]);
            }

        }else{

            winSound.play();

            message.innerHTML = "🎉 Победа! +" + win + " ₽";

        }

        balance += win;

    }

    else if(a===b || a===c || b===c){

        let win = bet * 2;

        balance += win;

        winSound.play();

        message.innerHTML = "😊 Выигрыш +" + win + " ₽";

    }

    else{

        message.innerHTML = "😢 Проигрыш";

    }

    setBalance(balance);

    showBalance();

    spinning = false;

}

// ===== Символ =====

function random(){

    return symbols[
        Math.floor(
            Math.random()*symbols.length
        )
    ];

}

// ===== Ручка =====

let startY = 0;

knob.addEventListener("pointerdown",(e)=>{

    startY = e.clientY;

});

knob.addEventListener("pointermove",(e)=>{

    if(spinning) return;

    let dy = e.clientY - startY;

    if(dy<0) dy=0;

    if(dy>120) dy=120;

    knob.style.top = dy+"px";

});

knob.addEventListener("pointerup",()=>{

    if(parseInt(knob.style.top)>=100){

        spin();

    }

    knob.style.transition=".3s";

    knob.style.top="0px";

    setTimeout(()=>{

        knob.style.transition="";

    },300);

});

import { createClient } 
from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";


const supabase = createClient(
"ТВОЙ_SUPABASE_URL",
"ТВОЙ_ANON_KEY"
);


window.buyFood = async function(food, price){

await supabase
.from("orders")
.insert({
    food: food,
    price: price,
    status:"new"
});


alert("Заказ отправлен на кухню!");

}

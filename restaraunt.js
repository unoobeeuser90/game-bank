import { createClient } 
from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";


const supabase = createClient(
"https://kvfytzxnlqxytqcsxkzq.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2Znl0enhubHF4eXRxY3N4a3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzNzE3NTgsImV4cCI6MjA5OTk0Nzc1OH0.dlVGtE359MBEL-P53p6XD7u1js3Bq1FcFQI6-ifBZsk"
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

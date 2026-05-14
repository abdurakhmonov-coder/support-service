const TelegramBot =
require("node-telegram-bot-api");

const { createClient } =
require("@supabase/supabase-js");

const token =
"8111036039:AAETnIcI4P45jEpD9FDwg6fx1_Jj3j1Ak3E";

const channelId =
"@zazsupports";

const supabaseUrl =
"https://fooboseeshzwpzcbscmr.supabase.co";

const supabaseKey =
"sb_publishable_RdAZnIiRo3HauHpRHKOrkg_cztpn551";

const supabase =
createClient(
  supabaseUrl,
  supabaseKey
);

const bot =
new TelegramBot(token);

console.log("Bot ishga tushdi");

async function checkMessages(){

  console.log("Tekshirilyapti...");

  const { data, error } =
  await supabase
    .from("messages")
    .select("*")
    .eq("sent", false);

  console.log("DATA:");
  console.log(data);

  console.log("ERROR:");
  console.log(error);

  if(error){
    return;
  }

  for(const msg of data){

    const text =
`📩 Yangi xabar

👤 ${msg.name}

📧 ${msg.email}

💬 ${msg.message}`;

    try{

      await bot.sendMessage(
        channelId,
        text
      );

      console.log("Yuborildi");

      await supabase
        .from("messages")
        .update({
          sent:true
        })
        .eq("id", msg.id);

    }catch(err){

      console.log(err);

    }

  }

}

setInterval(
  checkMessages,
  5000
);
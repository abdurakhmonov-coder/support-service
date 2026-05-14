const supabaseUrl =
"https://fooboseeshzwpzcbscmr.supabase.co";

const supabaseKey =
"sb_publishable_RdAZnIiRo3HauHpRHKOrkg_cztpn551";

const client =
window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

async function sendMessage(){

  const name =
  document.getElementById("name").value;

  const email =
  document.getElementById("email").value;

  const message =
  document.getElementById("message").value;

  const { error } =
  await client
    .from("messages")
    .insert([
      {
        name,
        email,
        message,
        sent:false
      }
    ]);

  if(error){

    console.log(error);

    alert("Xatolik");

  }else{

    alert("Yuborildi");

  }

}
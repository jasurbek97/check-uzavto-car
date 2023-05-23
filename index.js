import * as dotenv from 'dotenv' 
dotenv.config()

async function sendMessageToTelegram(message) {
  const telegramBotToken = process.env.TG_TOKEN;
  const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

  try {
    await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: message,
      }),
    });
    console.log('Message sent to Telegram');
  } catch (error) {
    console.error('Failed to send message to Telegram:', error);
  }
}

async function apiCheck() {
    const car  = process.env.CAR
    console.debug('Run.........')
  try {
    const response = await fetch("http://savdo.uzavtosanoat.uz/b/ap/stock_list&models_all_post", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,fr;q=0.8,ru;q=0.7",
          "content-type": "application/json;charset=UTF-8",
          "lang_code": "ru"
        },
        "referrer": "http://savdo.uzavtosanoat.uz/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"filial_id\":100}",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      });
    const data = await response.json();
    if(data && Array.isArray(data)){
        for(const d of data){
            console.log(d?.name)
            if(d?.name.includes(car) || d.name.includes(car.toLowerCase())){
                sendMessageToTelegram(`${car} sale started`);
            }
        }
    }
  } catch (error) {
    console.error('Failed to fetch:', error);
  }
}

setInterval(apiCheck, 10000);



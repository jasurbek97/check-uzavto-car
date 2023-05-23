import * as dotenv from 'dotenv' 
import axios from 'axios' 

dotenv.config()

async function sendMessageToTelegram(message) {
  const telegramBotToken = process.env.TG_TOKEN;
  const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    return axios.post(telegramApiUrl, 
        { 
          chat_id: process.env.CHAT_ID,
          text: message,
        }, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
        console.log('Message sent to Telegram');
    });
  
}

async function apiCheck() {
    const car  = process.env.CAR
    console.debug('Run.........')
   return axios.post("http://savdo.uzavtosanoat.uz/b/ap/stock_list&models_all_post", { "referrer": "http://savdo.uzavtosanoat.uz/",
    "filial_id": 100
    }, {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,fr;q=0.8,ru;q=0.7",
          "content-type": "application/json;charset=UTF-8",
          "lang_code": "ru"
        },
      })
      .then(response => {
        const {data} = response
        if(data && Array.isArray(data)){
            for(const d of data){
                console.log(d?.name)
                if(d?.name.includes(car) || d.name.includes(car.toLowerCase())){
                    sendMessageToTelegram(`${car} sale started`);
                }
            }
        }
      })
      .catch(error => {
        console.error('Failed to fetch: ', error);
      });

}

setInterval(apiCheck, 10000);
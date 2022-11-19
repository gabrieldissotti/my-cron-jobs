require('dotenv').config();
const axios = require('axios')
const cron = require('node-cron')

const chatbotManimartsAPI_URL = process.env.CHATBOT_MANIMARTS_API_URL
const chatbotManimartsToken = process.env.CHATBOT_MANIMARTS_API_TOKEN

console.log('env', {
  chatbotManimartsAPI_URL,
  chatbotManimartsToken
})

const chatbotManimartsAPIClient = axios.create({
  baseURL: chatbotManimartsAPI_URL
})

console.log('CRON: READY');

console.log('CRON: RUN SEND_QUEUED_MESSAGES EVERY 8 SECONDS');
cron.schedule('*/8 * * * * *', async () => {
  console.log('SEND_QUEUED_MESSAGES: RUNNING');

  try {
    const result = await chatbotManimartsAPIClient.post('/send-queued-messages', {
      token: chatbotManimartsToken
    }) 
    console.log('SEND_QUEUED_MESSAGES: FINISHED WITH SUCCESS', result.data)
  } catch (error) {
    console.log('SEND_QUEUED_MESSAGES: FINISHED WITH ERROR', error)
  }
});
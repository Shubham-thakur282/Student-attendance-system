require("dotenv").config({ path: "../../.env" });
const axios = require("axios");

const sendMessage = async (to, message) => {
  try {
    const data = {
      Text: message,
      Number: to,
      SenderId: `${process.env.SENDER_ID}`,
      DRNotifyUrl: "https://www.domainname.com/notifyurl",
      DRNotifyHttpMethod: "POST",
      Tool: "API"
    };
    console.log(to);
    const username = process.env.API_KEY_SMS;
    const password = process.env.SMS_BEARER;
    const api_key = process.env.API_KEY_SMS;
    const response = await axios.post(`https://restapi.smscountry.com/v0.1/Accounts/${api_key}/SMSes/`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: username,
        password: password
      }
    })
    // console.log(response);
    if(response.status === 202){
      console.log("Message sent");
    }else{
      console.log("Message not sent");
    }

  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
    // console.log(error);
  }
};



module.exports = sendMessage;
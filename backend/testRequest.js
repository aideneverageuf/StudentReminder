// testRequest.js
import axios from 'axios';

async function test() {
  const inputText = "Complete lab report 7 for CHM2049 by Friday at 12:00pm";
  console.log("🟢 Sending input:", inputText);

  try {
    const response = await axios.post('http://localhost:5000/api/nlp/parse-task', {
      text: inputText
    });

    console.log("✅ Parsed Response:");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("❌ Error making request:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Message:", error.message);
    }
  }
}

test();

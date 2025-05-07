// testRequest.js
import axios from 'axios';

async function test() {
  const inputText = "I have an exam on monday for MAS3114.... chat I might be cooked";
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

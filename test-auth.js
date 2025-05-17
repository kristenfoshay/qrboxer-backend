const axios = require('axios');

async function testSignup() {
  try {
    const response = await axios.post('http://localhost:3001/auth/register', {
      username: "testuser2",
      password: "password",
      email: "test2@test.com", 
      firstName: "Test",
      lastName: "User"
    });
    console.log("SUCCESS:", response.data);
    return response.data;
  } catch (error) {
    console.error("ERROR:", error.response ? error.response.data : error.message);
    if (error.response && error.response.data) {
      console.error("ERROR DETAILS:", JSON.stringify(error.response.data, null, 2));
    }
  }
}

testSignup();
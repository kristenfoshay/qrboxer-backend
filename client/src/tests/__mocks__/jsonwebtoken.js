// Mock implementation of jsonwebtoken
const jwt = {
  decode: jest.fn(token => {
    // This implementation allows us to customize the response based on the token
    if (token === "fake-token") {
      return { username: 'testuser' };
    }
    
    // Handle the specific JWT token from the test
    if (token === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.mPwnQiJRNFYFTOyYnQcXZxLixbVzScGFnvCQTrSvc8w") {
      return { username: 'testuser' };
    }
    
    // For any other tokens created in tests
    return { username: 'testuser' };
  })
};

export default jwt;
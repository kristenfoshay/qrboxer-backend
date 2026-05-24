const jwt = {
  decode: jest.fn(token => {
    if (token === "fake-token") {
      return { username: 'testuser' };
    }

    if (token === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.mPwnQiJRNFYFTOyYnQcXZxLixbVzScGFnvCQTrSvc8w") {
      return { username: 'testuser' };
    }

    return { username: 'testuser' };
  })
};

export default jwt;

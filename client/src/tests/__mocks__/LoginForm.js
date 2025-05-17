import React from 'react';

const LoginForm = ({ login }) => (
  <div>
    <h2>Login</h2>
    <label htmlFor="username">Username</label>
    <input id="username" />
    <label htmlFor="password">Password</label>
    <input id="password" />
    <button>Login</button>
  </div>
);

export default LoginForm;
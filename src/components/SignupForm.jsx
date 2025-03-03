import React, { useState } from "react";

const SignupForm = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // Perform signup logic (you can call an API here)
    alert(`Signed up with Email: ${email}`);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSignup} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupForm;

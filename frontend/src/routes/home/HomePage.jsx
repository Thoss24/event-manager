import { useState } from "react";

const HomePage = () => {
  const [test, setTest] = useState("");

  const testHandler = async () => {
    try {
      const response = await fetch("http://localhost:3001/");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      console.log(data)

      setTest(data);

      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <section>
        <button onClick={testHandler}>TEST</button>
      </section>
      <h2>{test}</h2>
    </div>
  );
};

export default HomePage;

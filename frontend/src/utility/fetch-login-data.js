const fetchLoginData = async () => {
  try {
    const response = await fetch(
      "https://react-http-6cb96-default-rtdb.europe-west1.firebasedatabase.app/login.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export default fetchLoginData

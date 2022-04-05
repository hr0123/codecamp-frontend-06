import { useEffect, useState } from "react";
import axios from "axios";

export default function OpenApiPage() {
  const [dogUrl, setDogUrl] = useState("");

  useEffect(() => {
    const quiz = async () => {
      const result = await axios.get("https://dog.ceo/api/breeds/image/random");
      setDogUrl(result.data.message);
    };
    quiz();
  }, []);

  return <img src={dogUrl} />;
}

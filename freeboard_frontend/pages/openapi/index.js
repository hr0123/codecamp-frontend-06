import { useState, useEffect } from "react";
import axios from "axios";

export default function OpenApiMenu() {
  const [apiUrl, setApiUrl] = useState("");

  useEffect(() => {
    const bike = async () => {
      const result = await axios.get(
        "https://api-football-standings.azharimm.site/leagues"
      );
      let token = Math.floor(Math.random() * result.data.data.length);
      console.log(result.data.data[token].logos.light);
      setApiUrl(result.data.data[token].logos.light);
    };
    bike();
  }, []);

  return <img src={apiUrl} />;
}

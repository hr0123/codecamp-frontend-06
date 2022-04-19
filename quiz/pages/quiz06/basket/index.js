import { useEffect, useState } from "react";

export default function Quiz06BasketPage() {
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");
    setBasketItems(baskets);
  }, []);

  return (
    <div>
      {basketItems.map((el) => (
        <div key={el._id}>
          <div>{el.writer}</div>
          <div>{el.title}</div>
        </div>
      ))}
    </div>
  );
}

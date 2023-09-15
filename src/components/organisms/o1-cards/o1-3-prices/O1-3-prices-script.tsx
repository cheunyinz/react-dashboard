import React, { useState, useEffect } from "react";

const PriceLogic: React.FC = () => {
  const [productPrice, setProductPrice] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: "https://www.manfield.com/heren/witte-leren-sneakers-1168040.html",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setProductPrice(data.price);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="price">
      {productPrice !== null ? (
        <p>Manfield Schoenen: {productPrice}</p>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default PriceLogic;

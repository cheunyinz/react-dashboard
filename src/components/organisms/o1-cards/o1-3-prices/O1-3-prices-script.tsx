import React, { useState, useEffect } from "react";
import A2Text from "../../../atoms/a2-text/A2-text";
import A5Link from "../../../atoms/a5-link/A5-link";

const PriceLogic: React.FC = () => {
  const [productPrice, setProductPrice] = useState<string | null>(null);
  const manfieldUrl: string =
    "https://www.manfield.com/heren/witte-leren-sneakers-1168040.html";

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://cyz-react-dashboard.netlify.app/price",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: `${manfieldUrl}`,
          }),
        }
      );

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
        <A5Link
          text={`Manfield Schoenen: €${productPrice}`}
          link={`${manfieldUrl}`}
        />
      ) : (
        <A2Text
          text={"Loading... "}
          color={"blue"}
          size="medium"
          alignment="center"
        />
      )}
    </section>
  );
};

export default PriceLogic;

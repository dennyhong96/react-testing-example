import axios from "axios";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";

import ScoopOption from "./scoopOption";
import ToppingOption from "./toppingOption";
import AlertBanner from "../common/alertBanner";

interface IOptionsProps {
  optionType: "scoops" | "toppings";
}

export interface Item {
  name: string;
  imagePath: string;
}

const Options = ({ optionType }: IOptionsProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch(setError);
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  return (
    <Row>
      {!error ? (
        items.map((item) => <ItemComponent key={item.name} item={item} />)
      ) : (
        <AlertBanner />
      )}
    </Row>
  );
};

export default Options;

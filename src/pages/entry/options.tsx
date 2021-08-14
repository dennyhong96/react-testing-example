import axios from "axios";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";

import ScoopOption from "./scoopOption";

interface IOptionsProps {
  optionType: "scoops";
}

export interface Item {
  name: string;
  imagePath: string;
}

const Options = ({ optionType }: IOptionsProps) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch(console.error);
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : ScoopOption;

  return (
    <Row>
      {items.map((item) => (
        <ItemComponent key={item.name} item={item} />
      ))}
    </Row>
  );
};

export default Options;

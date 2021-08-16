import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import Row from "react-bootstrap/Row";

import ScoopOption from "./scoopOption";
import ToppingOption from "./toppingOption";
import AlertBanner from "../common/alertBanner";
import { unitPrices } from "../../constants";
import { useOrderDetails } from "../../contexts/orderDetails";
import { formatCurrency } from "../../utils";

export interface IOptionsProps {
  optionType: "scoops" | "toppings";
}

export interface Item {
  name: string;
  imagePath: string;
}

const Options = ({ optionType }: IOptionsProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const [orderDetails, updateOptionsCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch(setError);
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const title = `${optionType[0].toUpperCase()}${optionType
    .slice(1)
    .toLowerCase()}`;

  return (
    <Fragment>
      <h2>{title}</h2>
      <p>{formatCurrency(unitPrices[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(orderDetails.totals[optionType])}
      </p>
      <Row>
        {!error ? (
          items.map((item) => (
            <ItemComponent
              key={item.name}
              item={item}
              updateItemCount={(newItemCount: string) =>
                updateOptionsCount(item.name, newItemCount, optionType)
              }
            />
          ))
        ) : (
          <AlertBanner />
        )}
      </Row>
    </Fragment>
  );
};

export default Options;

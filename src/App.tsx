import { ChangeEvent, FC, useState } from "react";

import "./App.css";

export const replaceCamelWithSpaces = (colorName: string): string => {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
};

const App: FC = () => {
  const [color, setColor] = useState("MediumVioletRed");
  const [checked, setChecked] = useState(false);

  const handleClick = () =>
    setColor((prev) => {
      if (prev === "MediumVioletRed") return "MidnightBlue";
      return "MediumVioletRed";
    });

  const handleCheck = (evt: ChangeEvent<HTMLInputElement>) =>
    setChecked(evt.target.checked);

  return (
    <div>
      <button
        style={{ backgroundColor: checked ? "gray" : color }}
        onClick={handleClick}
        disabled={checked}
      >
        Change to{" "}
        {color === "MediumVioletRed"
          ? replaceCamelWithSpaces("MidnightBlue")
          : replaceCamelWithSpaces("MediumVioletRed")}
      </button>

      <div>
        <label htmlFor="checkbox">Disabled</label>
        <input
          id="checkbox"
          type="checkbox"
          checked={checked}
          aria-checked={checked}
          onChange={handleCheck}
        />
      </div>
    </div>
  );
};

export default App;

import { rest } from "msw";

export const scoops = [
  { name: "Chocolate", imagePath: "/images/chocolate.png" },
  { name: "Vanilla", imagePath: "/images/vanilla.png" },
];

export const toppings = [
  { name: "Cherries", imagePath: "/images/cherries.png" },
  { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
  { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
];

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(ctx.json(scoops));
  }),

  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(ctx.json(toppings));
  }),
];

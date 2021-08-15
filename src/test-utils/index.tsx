import { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";

import { OrderDetailsProvider } from "../contexts/orderDetails";

const Providers: FC = ({ children }) => {
  return <OrderDetailsProvider>{children}</OrderDetailsProvider>;
};

const customRender = (
  ui: ReactElement,
  {
    route = "/",
    ...restOptions
  }: Partial<RenderOptions & { route: string }> = {}
) => {
  window.history.pushState({}, `${route} route`, route);
  return render(ui, { wrapper: Providers, ...restOptions });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };

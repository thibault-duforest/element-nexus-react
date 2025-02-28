import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/atoms/component3": {};
  "/atoms/component4": {};
  "/component1": {};
  "/component2": {};
};
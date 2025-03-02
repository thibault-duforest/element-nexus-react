import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/atoms/component4": {};
  "/atoms/buttons": {};
  "/atoms/tags": {};
  "/component1": {};
  "/component2": {};
};
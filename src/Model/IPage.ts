export interface Page {
  path: string;
  exact: boolean;
  component: React.ComponentType;
}
export interface Props {
  children: JSX.Element;
}
export interface RouteComponent extends Page {
  key: number;
  Component:React.Component;
}
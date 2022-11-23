export interface Route {
  path: string;
  name?: string;
  icon?: string;
  tabFix?: boolean;
  component?: any;
  redirect?: string;
  meta?: {
    title: string;
  };
  children?: Route[];
}

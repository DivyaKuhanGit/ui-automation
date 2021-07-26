export type RestContext = {
  route: string;
  method: string;
  expectedResponseCode: number;
  headers: ContextHeader[];
  body: object;
};

export type ContextHeader = {
  key: string;
  value: string;
};

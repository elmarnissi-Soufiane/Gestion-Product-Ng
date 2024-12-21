// Enumerateur pour le buttons des products
export enum ProductActionsTypes {
  GET_ALL_PRODUCTS = '[Product] Get All products',
  GET_SELECTED_PRODUCTS = '[Product] Get Selected products',
  GET_AVALIABLE_PRODUCTS = '[Product] Get Available products',
  SEARCH_PRODUCTS = '[Product] Serearch Products',
  NEW_PRODUCT = '[Product] New Product',
}

// interface qui enviyer un evenement
export interface ActionEvent {
  type: ProductActionsTypes;
  // type de event int string....
  payload?: any;
}

////
export enum DataStateEnum {
  LOADIN,
  LOADED,
  ERROR,
}

export interface AppDataState<T> {
  dataState?: DataStateEnum;
  data?: T;
  errorMessage?: string;
}

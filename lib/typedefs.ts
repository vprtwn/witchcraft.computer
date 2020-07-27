import Stripe from "stripe";

export interface OrderItem {
  i: string;
}

export interface StyleData {
  colorMode: string;
}

export interface StripeAccountData {
  id: string;
  name: string;
  email: string;
}

export interface ErrorResponse {
  errorCode: string;
  errorMessage: string;
  httpStatus: number;
}

export interface CustomerOpResponse {
  errored: boolean;
  data: Stripe.Customer | ErrorResponse;
}

export enum Direction {
  Up,
  Down,
}

import Stripe from 'stripe';

export type OrderItem = Record<string, string>;

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
  createdCustomer: boolean;
  data: Stripe.Customer | ErrorResponse;
}

export interface AnyResponse {
  errored: boolean;
  data: object | ErrorResponse;
}

export enum Direction {
  Up,
  Down,
}

export enum BlockType {
  Text = 'text',
  Link = 'link',
  Unknown = 'unknown',
}

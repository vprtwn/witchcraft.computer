import Stripe from "stripe";

export type Metadata = Record<string, Record<string, string> | string | null>;
export type MetadataValue = Record<string, string>[] | Record<string, string> | string | null;

export interface CardMeta {
  // tipjar visible ("1" or null)
  tj_v: string | null;
  // tipjar text
  tj_t: string | null;
}

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
  data: Stripe.Customer | ErrorResponse;
}

export enum Direction {
  Up,
  Down,
}

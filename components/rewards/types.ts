export interface Offer {
  id: string;
  type: "CASHBACK" | "OFF";
  code: string;
  brandLogo: string;
  title: string;
  description: string;
  terms: string;
  additionalInfo?: string;
}

export interface CartDetails {
  total: number;
  currency: string;
}

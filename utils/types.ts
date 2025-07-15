import { PaymentMode } from "./enums";

type ExpenseAddType = {
  category: string;
  amount: number;
  sub_category: string;
  icon: string;
  mode: PaymentMode;
};

type InvestmentAddType = {
  category: string;
  amount: number;
  sub_category: string;
  icon: string;
  mode: PaymentMode;
};

export { ExpenseAddType, InvestmentAddType };

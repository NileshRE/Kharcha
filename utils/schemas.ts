import { z } from "zod";
import {
  Category,
  CategoryIcon,
  InvestmentCategory,
  OutstandingCategory,
  OutstandingIcon,
  OutstandingStatus,
  PaymentMode,
  SubCategory,
} from "./enums";
import { CategorySubCategoryMap } from "./utlis";

const expenseSchema = z
  .object({
    amount: z
      .string()
      .min(1, "Amount is required")
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Amount must be a positive number",
      }),
    mode: z.enum(PaymentMode, {
      error: "Payment mode is required",
    }),
    category: z.enum(Category),
    sub_category: z.enum(SubCategory),
    icon: z.enum(CategoryIcon),
    comment: z.string().optional(),
  })
  .refine(
    (data) => {
      const validSubcategories = CategorySubCategoryMap[data.category];
      return validSubcategories?.includes(data.sub_category);
    },
    {
      message: "Invalid sub-category for selected category",
      path: ["sub_category"],
    }
  );

type ExpenseFormData = z.infer<typeof expenseSchema>;

const investmentSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  mode: z.enum(PaymentMode, {
    error: "Payment mode is required",
  }),
  category: z.enum(InvestmentCategory),
  icon: z.enum(CategoryIcon),
  comment: z.string().optional(),
});

type InvestmentFormData = z.infer<typeof investmentSchema>;

const outstandingsSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  payment_mode: z.enum(PaymentMode, {
    error: "Payment mode is required",
  }),
  category: z.enum(OutstandingCategory),
  status: z.enum(OutstandingStatus, {
    error: "Please select the status of payment",
  }),
  name: z
    .string()
    .min(3, "Name must be 3 characters")
    .max(20, "Name can be maximum 20 characters"),
  icon: z.enum(OutstandingIcon),
  comment: z.string().optional(),
});

type OutstandingsFormData = z.infer<typeof outstandingsSchema>;

export {
  ExpenseFormData,
  expenseSchema,
  InvestmentFormData,
  investmentSchema,
  OutstandingsFormData,
  outstandingsSchema,
};

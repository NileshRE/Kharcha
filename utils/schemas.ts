import { z } from "zod";
import {
  Category,
  CategoryIcon,
  InvestmentCategory,
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

export { ExpenseFormData, expenseSchema, InvestmentFormData, investmentSchema };

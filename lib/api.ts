import { supabase } from "@/utils/supabase";
import { ExpenseAddType, InvestmentAddType } from "@/utils/types";

class Expenses {
  async fetchExpense(category: string) {
    const query = supabase
      .from("expenses")
      .select("*")
      .order("created_at", { ascending: false });
    if (category) {
      query.eq("category", category);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
  async addExpense(expenseObject: ExpenseAddType) {
    const { data, error } = await supabase
      .from("expenses")
      .insert(expenseObject);
    if (error) throw error;
    return data;
  }
  async fetchExpCategories() {
    const { data, error } = await supabase
      .from("expenses")
      .select("category")
      .neq("category", null);

    if (error) throw error;

    const uniqueCategories = [...new Set(data.map((item) => item.category))];
    return uniqueCategories;
  }
}

class Investments {
  async fetchInvestment(category: string) {
    const query = supabase
      .from("investments")
      .select("*")
      .order("created_at", { ascending: false });
    if (category) {
      query.eq("category", category);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
  async addInvestment(expenseObject: InvestmentAddType) {
    const { data, error } = await supabase
      .from("investments")
      .insert(expenseObject);
    if (error) throw error;
    return data;
  }
  async fetchInvCategories() {
    const { data, error } = await supabase
      .from("investments")
      .select("category")
      .neq("category", null);

    if (error) throw error;

    const uniqueCategories = [...new Set(data.map((item) => item.category))];
    return uniqueCategories;
  }
}

export { Expenses, Investments };

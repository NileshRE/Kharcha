import { OutstandingsFormData } from "@/utils/schemas";
import { supabase } from "@/utils/supabase";
import { ExpenseAddType, InvestmentAddType } from "@/utils/types";

class Expenses {
  async fetchExpense(category?: string) {
    let query = supabase
      .from("expenses")
      .select("*")
      .order("created_at", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    const { data: expenseData, error: expenseError } = await query;

    if (expenseError) throw expenseError;

    // Server-side total sum
    const { data: sumData, error: sumError } = await supabase.rpc(
      "get_total_expenses",
      { p_category: category || null }
    );

    if (sumError) throw sumError;

    return {
      expenses: expenseData,
      totalAmount: sumData,
    };
  }
  async addExpense(object: ExpenseAddType) {
    const { data, error } = await supabase.from("expenses").insert(object);
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
  async fetchInvestment(category?: string) {
    let query = supabase
      .from("investments")
      .select("*")
      .order("created_at", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    const { data: investmentsData, error: investmentError } = await query;

    if (investmentError) throw investmentError;

    // Server-side total sum
    const { data: sumData, error: sumError } = await supabase.rpc(
      "get_total_investments",
      { p_category: category || null }
    );

    if (sumError) throw sumError;

    return {
      investments: investmentsData,
      totalAmount: sumData,
    };
  }

  async addInvestment(object: InvestmentAddType) {
    const { data, error } = await supabase.from("investments").insert(object);
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

class Outstandings {
  async fetchOutstandings(category?: string) {
    let query = supabase
      .from("outstandings")
      .select("*")
      .order("created_at", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    const { data: outstandingsData, error: outstandingsError } = await query;

    if (outstandingsError) throw outstandingsError;

    // Server-side total sum
    const { data: sumData, error: sumError } = await supabase.rpc(
      "get_total_outstandings",
      { p_category: category || null }
    );

    if (sumError) throw sumError;

    return {
      outstandings: outstandingsData,
      totalAmount: sumData,
    };
  }
  async addOutstanding(object: OutstandingsFormData) {
    const { data, error } = await supabase.from("outstandings").insert(object);
    if (error) throw error;
    return data;
  }
  async fetchOutstandingCategories() {
    const { data, error } = await supabase
      .from("outstandings")
      .select("category")
      .neq("category", null);

    if (error) throw error;

    const uniqueCategories = [...new Set(data.map((item) => item.category))];
    return uniqueCategories;
  }
}
export { Expenses, Investments, Outstandings };

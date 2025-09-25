import { supabase } from "@/utils/supabase";

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
  async fetchExpCategories() {
    const { data, error } = await supabase
      .from("expenses")
      .select("category")
      .neq("category", null);

    if (error) throw error;

    const uniqueCategories = [...new Set(data.map((item) => item.category))];
    return uniqueCategories;
  }
  async addExpenseToDB(expense) {
    const { data, error } = await supabase.from("expenses").insert({
      amount: expense.amount,
      mode: expense.mode_of_payment,
      category: expense.category,
      sub_category: expense.sub_category,
      recurring: expense.recurring,
      recurring_type: expense.recurring_type,
    });

    if (error) {
      console.error("DB Insert Error:", error);
      throw error;
    }

    return data;
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

class ChatService {
  async addChatsToDB(chat: string, aiResponse: string) {
    const { data, error } = await supabase.from("chats").insert({
      chat: chat,
      ai_response: aiResponse,
    });

    if (error) {
      console.error("DB Insert Error:", error);
      throw error;
    }

    return data;
  }

  async fetchChats() {
    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("DB Fetch Error:", error);
      throw error;
    }

    return data;
  }
}
export { ChatService, Expenses, Outstandings };

import { supabase } from "@/utils/supabase";

class AuthService {
  async signUp(
    email: string,
    password: string,
    userDetail: { fullName: string; age: number; gender: string }
  ) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userDetail,
      },
    });
    if (error) {
      console.error(error.message);
      throw error;
    } else {
      return data;
    }
  }

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error.message);
      throw error;
    } else {
      return data;
    }
  }
  async signOut() {
    await supabase.auth.signOut();
  }
}

export { AuthService };

import { AuthService } from "@/lib/auth";
import { supabase } from "@/utils/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormData, LoginSchema } from "../utils/schemas";

export const useLogin = () => {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const auth = new AuthService();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });
  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };
  const onFormSubmit = handleSubmit(onSubmit);

  const handleDashboard = () => router.push("/dashboard");
  const handleSignUp = () => router.push("/signup");
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => auth.signIn(data.email, data.password),
    mutationKey: ["login"],
    onSuccess: () => handleDashboard(),
    onError: (error) => setError("password", { message: error.message }),
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return {
    session,
    control,
    errors,
    loginMutation,
    onFormSubmit,
    handleSignUp,
  };
};

import { AuthService } from "@/lib/auth";
import { supabase } from "@/utils/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SignupFormData, SignupSchema } from "../utils/schemas";

export const useSignup = () => {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const auth = new AuthService();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });
  const onSubmit = (data: SignupFormData) => {
    signupMutation.mutate(data);
  };
  const onFormSubmit = handleSubmit(onSubmit);
  const handleLogin = () => router.push("/login");

  const signupMutation = useMutation({
    mutationFn: (data: SignupFormData) =>
      auth.signUp(data.email, data.password, {
        fullName: data.fullName,
        age: Number(data.age),
        gender: data.gender,
      }),
    mutationKey: ["signup"],
    onSuccess: () => router.push("/dashboard"),
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
    signupMutation,
    onFormSubmit,
    handleLogin,
  };
};

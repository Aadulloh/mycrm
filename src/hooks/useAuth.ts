import { type SignIn } from "@types";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@service";

export const useAuth = () => {
  return useMutation({
    mutationFn: async ({ data, role }: { data: SignIn; role: string }) =>
      authService.signIn(data, role),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: any) => authService.forgotPassword(data),
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async (data: any) => authService.verifyOpt(data),
  });
};

export const useNewPassword = () => {
  return useMutation({
    mutationFn: async (data: any) => authService.setNewPassword(data),
  });
};

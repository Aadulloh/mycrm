import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import type { SignIn } from "@types";
export const authService = {
  async signIn(model: SignIn, role: string): Promise<any> {
    const res = await apiConfig().postRequest(
      `/${role}-auth${ApiUrls.AUTH}`,
      model
    );
    return res;
  },
  async forgotPassword(model: any) {
    const res = await apiConfig().postRequest(ApiUrls.FORGOT_PASSWORD, model);
    return res;
  },
  async verifyOpt(model: any) {
    const res = await apiConfig().postRequest(ApiUrls.VERIFY_OTP, model);
    return res;
  },

  async setNewPassword(model: any) {
    const res = await apiConfig().postRequest(ApiUrls.SET_NEW_PASSWORD, model);
    return res;
  },
};

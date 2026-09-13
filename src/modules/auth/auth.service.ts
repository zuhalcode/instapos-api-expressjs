import authRepository from "./auth.repository";

export default {
  async login(email: string, password: string) {
    const data = await authRepository.signIn(email, password);

    if (!data.user || !data.session) {
      throw new Error("Invalid authentication response");
    }

    const user = await authRepository.findUserById(data.user.id);

    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresIn: data.session.expires_in,
      user,
    };
  },

  async logout() {
    await authRepository.signOut();
  },
};

const externalUrl = process.env.EXTERNAL_URL || "https://localhost:8443";
const baseUrl = `${externalUrl}/api`;
const userUrl = `${baseUrl}/user`;
const adminUrl = `${baseUrl}/admin`;

const apiUrls = {
    user: () => userUrl,
    userId: (userId: number | string) => `${userUrl}/${userId}`,
    signIn: () => `${baseUrl}/auth`,
    refreshToken: () => `${baseUrl}/auth/refresh`,
    register: () => `${userUrl}/register`,
    resetPassword: () => `${userUrl}/reset-password`
};

export default apiUrls;

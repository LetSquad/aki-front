const externalUrl = process.env.EXTERNAL_URL || "https://localhost:8443";
const baseUrl = `${externalUrl}/api`;
const userUrl = `${baseUrl}/user`;
const adminUrl = `${baseUrl}/admin`;
const areasUrl = `${baseUrl}/areas`;

const apiUrls = {
    user: () => userUrl,
    admin: () => adminUrl,
    userId: (userId: number | string) => `${userUrl}/${userId}`,
    area: () => areasUrl,
    areaId: (areaId: number | string) => `${areasUrl}/${areaId}`,
    signIn: () => `${baseUrl}/auth`,
    refreshToken: () => `${baseUrl}/auth/refresh`,
    register: () => `${userUrl}/register`,
    resetPassword: () => `${userUrl}/reset-password`
};

export default apiUrls;

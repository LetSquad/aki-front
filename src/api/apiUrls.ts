const externalUrl = process.env.EXTERNAL_URL || "https://localhost:8443";
const baseUrl = `${externalUrl}/api`;
const userUrl = `${baseUrl}/user`;
const adminUrl = `${baseUrl}/admin`;
const placesUrl = `${baseUrl}/places`;

const apiUrls = {
    user: () => userUrl,
    admin: () => adminUrl,
    userId: (userId: number | string) => `${userUrl}/${userId}`,
    place: () => placesUrl,
    myPlace: () => `${placesUrl}/my`,
    placeId: (placeId: number | string) => `${placesUrl}/${placeId}`,
    signIn: () => `${baseUrl}/auth`,
    refreshToken: () => `${baseUrl}/auth/refresh`,
    register: () => `${userUrl}/register`,
    resetPassword: () => `${userUrl}/reset-password`
};

export default apiUrls;

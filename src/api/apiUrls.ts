const externalUrl = process.env.EXTERNAL_URL || "https://localhost:8443";
const baseUrl = `${externalUrl}/api`;
const userUrl = `${baseUrl}/user`;
const adminUrl = `${baseUrl}/admin`;
const placesUrl = `${baseUrl}/places`;
const rentSlotsUrl = `${baseUrl}/rentSlots`;
const rentsUrl = `${baseUrl}/rents`;
const agreementUrl = `${baseUrl}/agreement`;

const apiUrls = {
    agreement: () => agreementUrl,
    user: () => userUrl,
    admin: () => adminUrl,
    userId: (userId: number | string) => `${userUrl}/${userId}`,
    userBan: () => `${userUrl}/ban`,
    place: () => placesUrl,
    myPlace: () => `${placesUrl}/my`,
    placeId: (placeId: number | string) => `${placesUrl}/${placeId}`,
    placeBan: () => `${placesUrl}/ban`,
    placeApprove: (placeId: number | string) => `${placesUrl}/${placeId}/approve`,
    placeFavorite: (placeId: number | string) => `${placesUrl}/${placeId}/favorite`,
    rents: () => rentsUrl,
    rentId: (rentId: number | string) => `${rentsUrl}/${rentId}`,
    rentRate: () => `${rentsUrl}/rate`,
    signIn: () => `${baseUrl}/auth`,
    refreshToken: () => `${baseUrl}/auth/refresh`,
    register: () => `${userUrl}/register`,
    resetPassword: () => `${userUrl}/reset-password`,
    rentSlots: () => `${rentSlotsUrl}`
};

export default apiUrls;

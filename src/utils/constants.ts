export const MOBILE_MAX_WIDTH = 767;
export const TABLET_MIN_WIDTH = 768;
export const TABLET_MAX_WIDTH = 990;
export const DESKTOP_MIN_WIDTH = 991;
export const DESKTOP_MAX_WIDTH = 1024;
export const WIDE_MIN_WIDTH = 1025;

export const IMAGE_MAX_SIZE = 1024 * 1024;
export const BASENAME = process.env.PUBLIC_URL;

export const PHONE_REG_EXP = /^(\+?7|8)[\s-]?\(?[89]\d{2}\)?[\s-]?\d{3}(?:[\s-]?\d{2}){2}$/;

export const URL_REG_EXP =
    /^((http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[\w-]+(\.[A-Za-z]+)+((\/)[\w#]+)*(\/\w+\?\w+=\w+(&\w+=\w+)*)?$/;
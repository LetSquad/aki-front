import tgLogo from "@static/images/tg.svg";
import vkLogo from "@static/images/vk.svg";

import styles from "./styles/FooterSocials.module.scss";

export default function FooterSocials() {
    return (
        <div className={styles.socials}>
            <a
                href="https://t.me/akimoscow"
                target="_blank"
                rel="noreferrer"
                className={styles.social}
            >
                <img
                    className={styles.socialLink}
                    src={tgLogo}
                    alt="telegram"
                />
            </a>
            <a
                href="https://vk.com/akimoscow"
                target="_blank"
                rel="noreferrer"
                className={styles.social}
            >
                <img
                    className={styles.socialLink}
                    src={vkLogo}
                    alt="vk"
                />
            </a>
        </div>
    );
}

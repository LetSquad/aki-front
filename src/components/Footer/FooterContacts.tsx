import styles from "./styles/FooterContacts.module.scss";

export default function FooterContacts() {
    return (
        <div className={styles.contacts}>
            <a
                className={styles.contact}
                href="tel:+7 495 988-30-80"
            >
                +7 495 988-30-80
            </a>
            <a
                className={styles.contact}
                href="mailto:info@moscow-creative.ru"
            >
                info@moscow-creative.ru
            </a>
        </div>
    );
}

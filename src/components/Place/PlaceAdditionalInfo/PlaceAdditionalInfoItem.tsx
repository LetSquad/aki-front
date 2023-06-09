import styles from "./styles/PlaceAdditionalInfoItem.module.scss";

interface AdditionalInfoItemProps {
    icon: string;
    alt: string;
    data: string;
}

export default function PlaceAdditionalInfoItem({ icon, alt, data }: AdditionalInfoItemProps) {
    return (
        <div className={styles.item}>
            <img
                className={styles.icon}
                src={icon}
                alt={alt}
            />
            <span className={styles.content}>{data}</span>
        </div>
    );
}

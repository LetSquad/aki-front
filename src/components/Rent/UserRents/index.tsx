import {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

import { Loader } from "semantic-ui-react";

import RentCard from "@components/Rent/RentCard";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getRentsRequest } from "@store/rent/reducer";
import {
    selectIsRentsLoading,
    selectIsRentsLoadingFailed,
    selectRents,
    selectRentsTotalPages
} from "@store/rent/selectors";

import styles from "./styles/UserRents.module.scss";

export default function UserRents() {
    const dispatch = useAppDispatch();

    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const observer = useRef<IntersectionObserver>(null);

    const rents = useAppSelector(selectRents);
    const rentsTotalPages = useAppSelector(selectRentsTotalPages);
    const isRentsLoading = useAppSelector(selectIsRentsLoading);
    const isRentsLoadingFailed = useAppSelector(selectIsRentsLoadingFailed);

    const getRents = useCallback((pageNumber: number) => {
        dispatch(getRentsRequest({ pageNumber, limit: 5 }));
    }, [dispatch]);

    const onNextPage = useCallback(() => {
        setCurrentPageNumber(currentPageNumber + 1);
        getRents(currentPageNumber + 1);
    }, [currentPageNumber, getRents]);

    const onErrorReload = useCallback(() => {
        getRents(currentPageNumber);
    }, [currentPageNumber, getRents]);

    const lastPlaceElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (isRentsLoading) {
                return;
            }
            if (observer.current) {
                observer.current.disconnect();
            }
            // @ts-ignore
            observer.current = new IntersectionObserver((entries) => {
                const target = entries[0];
                if (target.isIntersecting && rentsTotalPages && currentPageNumber < rentsTotalPages) {
                    onNextPage();
                }
            });
            if (node) {
                observer.current.observe(node);
            }
        },
        [isRentsLoading, rentsTotalPages, currentPageNumber, onNextPage]
    );

    useEffect(() => {
        getRents(currentPageNumber);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.rentsContainer}>
                {rents?.map((rent, index) => {
                    let refElement;
                    if (index === rents.length - 1) {
                        refElement = <div ref={lastPlaceElementRef} />;
                    }

                    return (
                        <RentCard
                            key={rent.id}
                            rent={rent}
                        >
                            {refElement}
                        </RentCard>
                    );
                })}
                {isRentsLoadingFailed && (
                    <LoadingErrorBlock
                        isLoadingErrorObjectText="бронирований"
                        reload={onErrorReload}
                    />
                )}
                {isRentsLoading && <div className={styles.loader}><Loader active /></div>}
                {!isRentsLoading && !isRentsLoadingFailed && rents.length === 0 && (
                    <span className={styles.empty}>Вы не забронировали еще ни одной площадки</span>
                )}
            </div>
        </div>
    );
}

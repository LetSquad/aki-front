import { useCurrentPlace } from "@components/Place/PlaceInfoDetails/PlaceInfoContext";

import PlaceGalleryView from "./PlaceGalleryView";

export default function PlaceGallery() {
    const { placeImages } = useCurrentPlace();

    if (!placeImages || placeImages.length === 0) {
        return null;
    }

    return (
        <PlaceGalleryView placeImages={placeImages as string[]} />
    );
}

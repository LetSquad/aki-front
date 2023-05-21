import { useCurrentArea } from "@components/Area/AreaInfoDetails/AreaInfoContext";

import AreaGalleryView from "./AreaGalleryView";

export default function AreaGallery() {
    const { areaImages } = useCurrentArea();

    if (areaImages === undefined || areaImages.length === 0) {
        return null;
    }

    return (
        <AreaGalleryView areaImages={areaImages as string[]} />
    );
}

import merge from "lodash.merge";

import { Page as PageType } from "@models/pages/types";

import { RenterPagesComponents } from "./RenterPagesComponents";
import { RenterPagesData } from "./RenterPagesData";

export const RenterPages: PageType = merge(RenterPagesComponents, RenterPagesData);

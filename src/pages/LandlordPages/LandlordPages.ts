import merge from "lodash.merge";

import { Page as PageType } from "@models/pages/types";

import { LandlordPagesComponents } from "./LandlordPagesComponents";
import { LandlordPagesData } from "./LandlordPagesData";

export const LandlordPages: PageType = merge(LandlordPagesComponents, LandlordPagesData);

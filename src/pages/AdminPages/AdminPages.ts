import merge from "lodash.merge";

import { Page as PageType } from "@models/pages/types";

import { AdminPagesComponents } from "./AdminPagesComponents";
import { AdminPagesData } from "./AdminPagesData";

export const AdminPages: PageType = merge(AdminPagesComponents, AdminPagesData);

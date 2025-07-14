import * as t from "drizzle-orm/pg-core";

import { ReportReasonsArray, RequestStateArray } from "@/types/request/shared";

export const RequestStateEnum = t.pgEnum("request_state", RequestStateArray);
export const ReportReasonsEnum = t.pgEnum("report_reasons", ReportReasonsArray);

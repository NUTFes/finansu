/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * NUTFes FinanSu API
 * FinanSu APIドキュメント
 * OpenAPI spec version: 2.0.0
 */
import type { Total } from './total';
import type { FestivalItemWithReport } from './festivalItemWithReport';

export interface FestivalItemsForMyPage {
  divisionName?: string;
  divisionTotal?: Total;
  festivalItems?: FestivalItemWithReport[];
  financialRecordName?: string;
}

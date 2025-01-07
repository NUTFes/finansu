/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * NUTFes FinanSu API
 * FinanSu APIドキュメント
 * OpenAPI spec version: 2.0.0
 */
import type { GetActivitiesFilteredDetailsIsDone } from './getActivitiesFilteredDetailsIsDone';

export type GetActivitiesFilteredDetailsParams = {
  /**
   * 完了状態を表すフラグ
   */
  is_done?: GetActivitiesFilteredDetailsIsDone;
  /**
   * スポンサースタイルIDの配列
   */
  sponsor_style_id?: number[];
  /**
   * キーワード検索用の文字列
   */
  keyword?: string;
};

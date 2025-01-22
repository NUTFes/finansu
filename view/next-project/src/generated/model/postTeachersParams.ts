/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * NUTFes FinanSu API
 * FinanSu APIドキュメント
 * OpenAPI spec version: 2.0.0
 */

export type PostTeachersParams = {
/**
 * 名前
 */
name: string;
/**
 * 役職
 */
position: string;
/**
 * 学科ID
 */
department_id?: number;
/**
 * 部屋番号
 */
room?: string;
/**
 * ブラックリストの真偽
 */
is_black?: boolean;
/**
 * 備考
 */
remark?: string;
};

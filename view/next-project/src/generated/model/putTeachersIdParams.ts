/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * NUTFes FinanSu API
 * FinanSu APIドキュメント
 * OpenAPI spec version: 2.0.0
 */

export type PutTeachersIdParams = {
/**
 * 教員の名前
 */
name: string;
/**
 * 教員の役職
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
 * ブラックリストに入っているか
 */
is_black?: boolean;
/**
 * 備考欄
 */
remark?: string;
};

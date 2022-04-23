package main

import (
	"fmt"
	"github.com/NUTFes/FinanSu/api/drivers/db"
	"github.com/NUTFes/FinanSu/api/internals/domain"
)

func seedData() []domain.Teacher {
	teachers := []domain.Teacher{
		{
			Name:         "小野 浩司",
			Position:     "教授",
			DepartmentID: 1,
			Room:         "電気棟-602",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "安井 寛治",
			Position:     "教授",
			DepartmentID: 1,
			Room:         "電気棟-302",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "中川 健治",
			Position:     "教授",
			DepartmentID: 1,
			Room:         "電気棟-507",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "岩橋 政宏",
			Position:     "教授",
			DepartmentID: 1,
			Room:         "電気棟-510",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "河合 晃",
			Position:     "教授",
			DepartmentID: 1,
			Room:         "電気棟-404",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "木村 宗弘",
			Position:     "教授",
			DepartmentID: 1,
			Room:         "電気棟-607",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "三浦 友史",
			Position:     "教授",
			DepartmentID: 1,
			Room:         "電気棟-403",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "岡元 智一郎",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "電気棟-401",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "加藤 有行",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "電気棟-303",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "坪根 正",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "電気棟-306",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "宮崎 敏昌",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "電気2号棟-374",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "圓道 知博",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "電気棟-610",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "田中 久仁彦",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "電気2号棟-452",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "佐々木 徹",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "電気棟-304",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "杉田 泰則",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "電気棟-503",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "鵜沼 毅也",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "電気棟-502",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "佐々木 友之",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "電気棟-604",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "玉山 泰宏",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "電気棟-402",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "南部 功夫",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "電気棟-606",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "和田森 直",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "電気2号棟-233",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "横倉 勇希",
			Position:     "助教授",
			DepartmentID: 1,
			Room:         "実験実習2号棟-115",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "高橋 一匡",
			Position:     "助教授",
			DepartmentID: 1,
			Room:         "原子力棟-401",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "白清 学",
			Position:     "助教授",
			DepartmentID: 1,
			Room:         "情報処理センター102",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "渡部 康平",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "電気棟-316",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "坂本 盛嗣",
			Position:     "助教授",
			DepartmentID: 1,
			Room:         "電気2号棟-669",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "日下 桂祐",
			Position:     "助教授",
			DepartmentID: 1,
			Room:         "",
			IsBlack:      false,
			Remark:       "総合研究棟2階",
		},
		{
			Name:         "原川 良介",
			Position:     "助教授",
			DepartmentID: 1,
			Room:         "電気2号棟-554",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "勝部 大樹",
			Position:     "助教授",
			DepartmentID: 1,
			Room:         "電気2号棟-266",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "金崎 権",
			Position:     "助教授",
			DepartmentID: 1,
			Room:         "",
			IsBlack:      false,
			Remark:       "居室不明",
		},
		{
			Name:         "下村 雅人",
			Position:     "教授",
			DepartmentID: 1,
			Room:         "生物棟-256",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "滝本 浩一",
			Position:     "教授",
			DepartmentID: 1,
			Room:         "生物棟-656",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "政井 英司",
			Position:     "教授",
			DepartmentID: 1,
			Room:         "生物棟-353",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "城所 俊一",
			Position:     "教授",
			DepartmentID: 1,
			Room:         "生物棟-756",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "解良 芳夫",
			Position:     "教授",
			DepartmentID: 1,
			Room:         "生物棟-667",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "本多 元",
			Position:     "教授",
			DepartmentID: 1,
			Room:         "生物棟-657",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "高橋 祥司",
			Position:     "教授",
			DepartmentID: 1,
			Room:         "生物棟-668",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "木村 悟隆",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "生物棟-554",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "高原 美規",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "生物棟-557",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "霜田 靖",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "生物棟-753",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "佐藤 武史",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "生物棟-556",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "山本 麻希",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "生物棟-255",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "西村 泰介",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "生物棟-755",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "笠井 大輔",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "生物棟-351",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "桑原 敬司",
			Position:     "准教授",
			DepartmentID: 1,
			Room:         "生物棟-257",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "田辺 郁男",
			Position:     "教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-510",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "明田川 正人",
			Position:     "教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-508",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "井原 郁夫",
			Position:     "教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-503",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "高橋 勉",
			Position:     "教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-601",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "太田 浩之",
			Position:     "教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-506",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "永澤 茂",
			Position:     "教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-301",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "武田 雅敏",
			Position:     "教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-509",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "上村 靖司",
			Position:     "教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-407",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "南口 誠",
			Position:     "教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-302",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "小林 泰秀",
			Position:     "准教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-405",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "宮下 幸雄",
			Position:     "准教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-304",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "本間 智之",
			Position:     "准教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-501",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "倉橋 貴彦",
			Position:     "准教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-608",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "勝身 俊之",
			Position:     "准教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-602",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "會田 英雄",
			Position:     "准教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-607",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "鈴木 正太郎",
			Position:     "准教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-604",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "田浦 裕生",
			Position:     "准教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-606",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "山下 健",
			Position:     "助教授",
			DepartmentID: 2,
			Room:         "機械・建設棟‐2号568",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "中田 大貴",
			Position:     "助教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-2号457",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "梅本 和希",
			Position:     "助教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-2号568‐B",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "馬場 将亮",
			Position:     "助教授",
			DepartmentID: 2,
			Room:         "機械・建設棟-2号574",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "杉原 幸信",
			Position:     "助教授",
			DepartmentID: 2,
			Room:         "",
			IsBlack:      false,
			Remark:       "居室不明",
		},
		{
			Name:         "斎藤 秀俊",
			Position:     "教授",
			DepartmentID: 2,
			Room:         "物材経情棟-428",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "竹中 克彦",
			Position:     "教授",
			DepartmentID: 2,
			Room:         "物材経情棟-326",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "前川 博史",
			Position:     "教授",
			DepartmentID: 2,
			Room:         "物材経情棟-329",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "石橋 隆幸",
			Position:     "教授",
			DepartmentID: 2,
			Room:         "物材経情棟-423",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "伊藤 治彦",
			Position:     "准教授",
			DepartmentID: 2,
			Room:         "物材経情棟-530",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "内田 希",
			Position:     "准教授",
			DepartmentID: 2,
			Room:         "物材経情2号棟-430",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "齊藤 信雄",
			Position:     "准教授",
			DepartmentID: 2,
			Room:         "分析計測センター209",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "田中 諭",
			Position:     "准教授",
			DepartmentID: 2,
			Room:         "物材経情棟-2号429",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "本間 剛",
			Position:     "准教授",
			DepartmentID: 2,
			Room:         "物材経情棟-424",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "高橋 由紀子",
			Position:     "准教授",
			DepartmentID: 2,
			Room:         "環境棟-464",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "多賀谷 基博",
			Position:     "准教授",
			DepartmentID: 2,
			Room:         "物材経情棟-525",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "白仁田 沙代子",
			Position:     "准教授",
			DepartmentID: 2,
			Room:         "物材経情棟-215",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "西川 雅美",
			Position:     "助教授",
			DepartmentID: 2,
			Room:         "分析計測センター207",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "小松 啓志",
			Position:     "助教授",
			DepartmentID: 2,
			Room:         "物材経情棟-522",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "戸田 智之",
			Position:     "助教授",
			DepartmentID: 2,
			Room:         "物材経情棟-522",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "シリポーン タオガァオ",
			Position:     "助教授",
			DepartmentID: 2,
			Room:         "物材経情棟-522",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "松田 翔風",
			Position:     "助教授",
			DepartmentID: 2,
			Room:         "物材経情棟-522",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "張 田原",
			Position:     "助教授",
			DepartmentID: 2,
			Room:         "",
			IsBlack:      false,
			Remark:       "居室不明",
		},
		{
			Name:         "山本 和広",
			Position:     "助教授",
			DepartmentID: 2,
			Room:         "物材経情棟-427",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "柴田 公彦",
			Position:     "准教授",
			DepartmentID: 2,
			Room:         "",
			IsBlack:      false,
			Remark:       "居室不明",
		},
		{
			Name:         "今井 栄一",
			Position:     "助教授",
			DepartmentID: 2,
			Room:         "生物棟-451",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "上村 直史",
			Position:     "助教授",
			DepartmentID: 2,
			Room:         "生物棟-367",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "阿部 勝正",
			Position:     "助教授",
			DepartmentID: 2,
			Room:         "生物棟-669",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "志田 洋介",
			Position:     "助教授",
			DepartmentID: 2,
			Room:         "生物棟-371",
			IsBlack:      false,
			Remark:       "小笠原先生と同室",
		},
		{
			Name:         "杉本 光隆",
			Position:     "教授",
			DepartmentID: 4,
			Room:         "機械・建設棟-808",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "中出 文平",
			Position:     "教授",
			DepartmentID: 4,
			Room:         "環境棟-353",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "大塚 悟",
			Position:     "教授",
			DepartmentID: 4,
			Room:         "機械・建設棟-802",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "陸 旻皎",
			Position:     "教授",
			DepartmentID: 4,
			Room:         "環境棟-653",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "細山田 得三",
			Position:     "教授",
			DepartmentID: 4,
			Room:         "機械・建設棟-807",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "高橋 修",
			Position:     "教授",
			DepartmentID: 4,
			Room:         "機械・建設棟-704",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "下村 匠",
			Position:     "教授",
			DepartmentID: 4,
			Room:         "機械・建設棟-703",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "岩崎 英治",
			Position:     "教授",
			DepartmentID: 4,
			Room:         "機械・建設棟-803",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "佐野 可寸志",
			Position:     "教授",
			DepartmentID: 4,
			Room:         "環境棟-366/原子力棟411",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "宮木 康幸",
			Position:     "准教授",
			DepartmentID: 4,
			Room:         "機械・建設棟-709",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "小松 俊哉",
			Position:     "准教授",
			DepartmentID: 4,
			Room:         "環境棟-554",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "豊田 浩史",
			Position:     "准教授",
			DepartmentID: 4,
			Room:         "機械・建設棟-705",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "熊倉 俊郎",
			Position:     "准教授",
			DepartmentID: 4,
			Room:         "環境棟-652",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "高橋 一義",
			Position:     "准教授",
			DepartmentID: 4,
			Room:         "環境棟-654",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "宮下 剛",
			Position:     "准教授",
			DepartmentID: 4,
			Room:         "機械・建設棟-706",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "松田 曜子",
			Position:     "准教授",
			DepartmentID: 4,
			Room:         "環境棟-651",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "犬飼 直之",
			Position:     "准教授",
			DepartmentID: 4,
			Room:         "機械・建設棟-801",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "松川 寿也",
			Position:     "助教授",
			DepartmentID: 4,
			Room:         "環境棟-364",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "楊 宏選",
			Position:     "助教授",
			DepartmentID: 4,
			Room:         "環境棟-651",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "福元 豊",
			Position:     "助教授",
			DepartmentID: 4,
			Room:         "機械・建設棟-804",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "李 志東",
			Position:     "教授",
			DepartmentID: 5,
			Room:         "物材経情棟-302",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "塩野谷 明",
			Position:     "教授",
			DepartmentID: 5,
			Room:         "体育保健センター-108",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "野村 収作",
			Position:     "教授",
			DepartmentID: 5,
			Room:         "機械・建設3号棟-534",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "鈴木 信貴",
			Position:     "准教授",
			DepartmentID: 5,
			Room:         "物材経情棟-402",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "羽山 徹彩",
			Position:     "准教授",
			DepartmentID: 5,
			Room:         "総合研究棟‐406",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "西山 雄大",
			Position:     "准教授",
			DepartmentID: 5,
			Room:         "総合研究棟-603",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "吉田 富美男",
			Position:     "助教授",
			DepartmentID: 5,
			Room:         "機械・建設3号棟-539",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "鈴木 泉",
			Position:     "助教授",
			DepartmentID: 5,
			Room:         "総合研究棟-407",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "畦原 宗之",
			Position:     "助教授",
			DepartmentID: 5,
			Room:         "総合研究棟-406",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "中平 勝子",
			Position:     "准教授",
			DepartmentID: 5,
			Room:         "語学センター棟‐212",
			IsBlack:      false,
			Remark:       "居室不明",
		},
		{
			Name:         "永森 正仁",
			Position:     "助教授",
			DepartmentID: 5,
			Room:         "総合研究棟-506",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "安藤 雅洋",
			Position:     "助教授",
			DepartmentID: 5,
			Room:         "マルチメディアセンター-201",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "秋元 頼孝",
			Position:     "准教授",
			DepartmentID: 5,
			Room:         "物材経情棟-304",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "中村 文則",
			Position:     "准教授",
			DepartmentID: 5,
			Room:         "機械・建設棟-708",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "伊藤 潤",
			Position:     "助教授",
			DepartmentID: 5,
			Room:         "環境棟-367",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "渡利 高大",
			Position:     "助教授",
			DepartmentID: 5,
			Room:         "環境棟-571",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "高橋 貴生",
			Position:     "助教授",
			DepartmentID: 5,
			Room:         "環境棟-367",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "坂田 健太",
			Position:     "助教授",
			DepartmentID: 5,
			Room:         "環境棟-755",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "陳 剣",
			Position:     "特任助教",
			DepartmentID: 5,
			Room:         "",
			IsBlack:      false,
			Remark:       "居室不明",
		},
		{
			Name:         "柴崎 秀子",
			Position:     "教授",
			DepartmentID: 3,
			Room:         "物材経情棟-309",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "原 信一郎",
			Position:     "教授",
			DepartmentID: 3,
			Room:         "環境棟-267",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "北谷 英嗣",
			Position:     "教授",
			DepartmentID: 3,
			Room:         "物材経情棟-509",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "伴 浩美",
			Position:     "教授",
			DepartmentID: 3,
			Room:         "物材経情棟-504",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "松原 浩",
			Position:     "教授",
			DepartmentID: 3,
			Room:         "物材経情棟-308",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "市坪 誠",
			Position:     "教授",
			DepartmentID: 3,
			Room:         "物材経情棟-403",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "若林 敦",
			Position:     "教授",
			DepartmentID: 3,
			Room:         "物質材開棟-503",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "加納 満",
			Position:     "准教授",
			DepartmentID: 3,
			Room:         "物材経情棟-307",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "高橋 綾子",
			Position:     "准教授",
			DepartmentID: 3,
			Room:         "物材経情棟-506",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "リー 飯塚 尚子",
			Position:     "准教授",
			DepartmentID: 3,
			Room:         "物質材開棟-306",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "伊藤 敦美",
			Position:     "准教授",
			DepartmentID: 3,
			Room:         "物材経情棟-509",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "藤井 数馬",
			Position:     "准教授",
			DepartmentID: 3,
			Room:         "物材経情棟-507",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "山本 謙一郎",
			Position:     "准教授",
			DepartmentID: 3,
			Room:         "環境棟-268",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "永野 建二郎",
			Position:     "准教授",
			DepartmentID: 3,
			Room:         "物材経情棟-310",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "ドライアー ブライアン",
			Position:     "准教授",
			DepartmentID: 3,
			Room:         "物材経情棟-508",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "イリーカル インドゥシェカル",
			Position:     "特任講師",
			DepartmentID: 3,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "江 偉華",
			Position:     "教授",
			DepartmentID: 6,
			Room:         "極限-粒子棟201",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "末松 久幸",
			Position:     "教授",
			DepartmentID: 6,
			Room:         "極限-粒子棟203",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "鈴木 達也",
			Position:     "教授",
			DepartmentID: 6,
			Room:         "原子力安全・シス安棟-412",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "高瀬 和之",
			Position:     "教授",
			DepartmentID: 6,
			Room:         "原子力安全・シス安棟-308",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "池田 隆明",
			Position:     "教授",
			DepartmentID: 6,
			Room:         "機械・建設棟-805",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "菊池 崇志",
			Position:     "准教授",
			DepartmentID: 6,
			Room:         "原子力安全・シス安棟-409",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "鈴木 常生",
			Position:     "准教授",
			DepartmentID: 6,
			Room:         "原子力安全・シス安棟-410",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "村上 健太",
			Position:     "准教授",
			DepartmentID: 6,
			Room:         "原子力安全・シス安棟-310",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "松本 義伸",
			Position:     "助教授",
			DepartmentID: 6,
			Room:         "ラジオアイソトープセンター 101",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "須貝 太一",
			Position:     "助教授",
			DepartmentID: 6,
			Room:         "極限棟-201",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "立花 優",
			Position:     "助教授",
			DepartmentID: 6,
			Room:         "原子力安全・シス安棟-405",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "ドウ テイ マイ ズン",
			Position:     "助教授",
			DepartmentID: 6,
			Room:         "原子力安全・シス安棟-414",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "鈴木 雅秀",
			Position:     "特任教授",
			DepartmentID: 6,
			Room:         "原子力安全・シス安棟－413",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "ズゥン タン トゥン",
			Position:     "特任助教",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "居室不明",
		},
		{
			Name:         "中川 匡弘",
			Position:     "教授",
			DepartmentID: 6,
			Room:         "電気棟-609/3号棟外プレハブ カオス・フラクタル研究室",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "小林 高臣",
			Position:     "教授",
			DepartmentID: 6,
			Room:         "物材経情棟-526",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "山口 隆司",
			Position:     "教授",
			DepartmentID: 6,
			Room:         "環境棟-570",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "湯川 高志",
			Position:     "教授",
			DepartmentID: 6,
			Room:         "総合研究棟‐510",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "改田 哲也",
			Position:     "教授",
			DepartmentID: 6,
			Room:         "博士棟-358",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "小笠原 渉",
			Position:     "教授",
			DepartmentID: 6,
			Room:         "生物棟-371",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "山田 昇",
			Position:     "教授",
			DepartmentID: 6,
			Room:         "機械・建設棟-507",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "中山 忠親",
			Position:     "教授",
			DepartmentID: 6,
			Room:         "極限-粒子棟-202",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "伊東 淳一",
			Position:     "教授",
			DepartmentID: 6,
			Room:         "電気棟-407",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "山崎 渉",
			Position:     "准教授",
			DepartmentID: 6,
			Room:         "機械・建設棟-603",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "姫野 修司",
			Position:     "准教授",
			DepartmentID: 6,
			Room:         "環境棟-553",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "大沼 清",
			Position:     "准教授",
			DepartmentID: 6,
			Room:         "生物棟-560",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "ヌル ハイダ モハメド カウス",
			Position:     "准教授",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "牧 慎也",
			Position:     "准教授",
			DepartmentID: 6,
			Room:         "機械・建設1号棟-807",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "後藤 孝",
			Position:     "特任教授",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "ウイフ ファンバウロ",
			Position:     "特任准教授",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "岡崎 正和",
			Position:     "教授",
			DepartmentID: 6,
			Room:         "機械・建設棟-505,2号棟576D",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "門脇 敏",
			Position:     "教授",
			DepartmentID: 6,
			Room:         "機械・建設棟-502",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "福田 隆文",
			Position:     "教授",
			DepartmentID: 6,
			Room:         "博士棟‐653",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "三好 孝典",
			Position:     "教授",
			DepartmentID: 6,
			Room:         "原子力安全・シス安棟-614",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "大塚 雄市",
			Position:     "准教授",
			DepartmentID: 6,
			Room:         "原子力安全・シス安棟-562",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "芳司 俊郎",
			Position:     "准教授",
			DepartmentID: 6,
			Room:         "原子力安全・シス安棟-609",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "張 坤",
			Position:     "准教授",
			DepartmentID: 6,
			Room:         "原子力安全・シス安棟-613",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "吉田 昌弘",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "機械・建設棟-314",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "安部 真",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "機械・建設2号棟-370",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "山田 修一",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "原子力安全・シス安棟-511",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "吉井 一夫",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "工作センター103",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "山本 浩",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "機械・建設3号棟-240",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "高田 晋",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "建設大型実験棟-205",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "高橋 智",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "機械・建設2号棟-663",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "渡邉 高子",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "環境棟-569",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "中村 健",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "居室不明",
		},
		{
			Name:         "豊田 英之",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "電気2号棟-471",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "山口 貴幸",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "大型実験棟-203",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "田中 徹",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "居室不明",
		},
		{
			Name:         "志田 暁雄",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "極限-極限棟201W",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "佐藤 賢太",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "工作センター103",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "小池 孝侑",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "工作センター103",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "星野 英夫",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "工作センター103",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "河原 夏江",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "物材経情棟-2号562",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "高橋 美幸",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "環境棟-465",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "小杉 健一郎",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "分析計測センター-118",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "程内 和範",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "分析計測センター-118",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "大塩 茂夫",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "物材経情2号棟-359",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "宮 正光",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "物材経情棟-325",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "高柳 充寛",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "生物棟-565",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "野田 浩平",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "電気2号棟-666",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "山浦 賢太郎",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "電気2号棟-569",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "内田 翔",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "電気-2号棟675",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "近藤 みずき",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "生物棟-258",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "三間 達也",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "生物1号棟-353",
			IsBlack:      false,
			Remark:       "女子が行く",
		},
		{
			Name:         "帳本 将史",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "環境棟-569",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "鳩山 紀一郎",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "環境棟-365",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "溝尻 瑞枝",
			Position:     "技術職員",
			DepartmentID: 6,
			Room:         "機械・建設棟-401",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "東 信彦",
			Position:     "",
			DepartmentID: 6,
			Room:         "機械・建設棟-406",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "鎌土 重晴",
			Position:     "学長",
			DepartmentID: 6,
			Room:         "学長室/機械・建設棟-306",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "大石 潔",
			Position:     "理事・副学長",
			DepartmentID: 6,
			Room:         "実験実習2号棟-情報システム実験室",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "秋山 和男",
			Position:     "理事・事務局長",
			DepartmentID: 6,
			Room:         "理事室",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "和田 安弘",
			Position:     "副学長",
			DepartmentID: 6,
			Room:         "電気棟-608",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "学生支援課",
			Position:     "事務",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "学務課",
			Position:     "事務",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "国際課",
			Position:     "事務",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "総務課",
			Position:     "事務",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "財務課",
			Position:     "事務",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "研究・地域連携課",
			Position:     "事務",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "入試課",
			Position:     "事務",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "総合情報課",
			Position:     "事務",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "施設課",
			Position:     "事務",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "大学戦略課(3F)",
			Position:     "事務",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "大学戦略課(2F)",
			Position:     "事務",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "電気系",
			Position:     "系事務室",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "物質・材料・経営情報系",
			Position:     "系事務室",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "機械・建設事務室",
			Position:     "系事務室",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "生物系",
			Position:     "系事務室",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "環境事務室",
			Position:     "系事務室",
			DepartmentID: 6,
			Room:         "",
			IsBlack:      false,
			Remark:       "",
		},
		{
			Name:         "芳賀 仁",
			Position:     "助教",
			DepartmentID: 6,
			Room:         "電気2号棟‐364",
			IsBlack:      false,
			Remark:       "同窓会代表。局長が挨拶へ。学内募金は毎回断っている。",
		},
	}
	return teachers
}

func main() {
	c, err := db.ConnectMySQLFromGorm()
	if err != nil {
		fmt.Println(err)
	}
	teachers := seedData()
	result := c.DB().Create(&teachers)
	if result.Error != nil {
		fmt.Println("Failed")
	} else {
		fmt.Println("Success Insert Seed Datas")
	}
}

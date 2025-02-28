package domain

import (
	"time"
)

type FestivalItem struct {
	ID         int       `json:"id"`
	Name       string    `json:"name"`
	Memo       string    `json:"memo"`
	DivisionID int       `json:"divisionId"`
	CreatedAt  time.Time `json:"createdAt"`
	UpdatedAt  time.Time `json:"updatedAt"`
}

type FestivalItemForMyPageColumn struct {
	UserName            string
	FinancialRecordName string
	DivisionId          int
	DivisionName        string
	FestivalItemId      int
	FestivalItemName    string
	Year                int
	BudgetAmount        int
	BuyReportId         int
	PaidBy              string
	ReportAmount        int
	ReportDate          string
	IsPacked            bool
	IsSettled           bool
}

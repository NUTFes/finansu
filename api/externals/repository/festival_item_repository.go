package repository

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/NUTFes/FinanSu/api/drivers/db"
	"github.com/NUTFes/FinanSu/api/externals/repository/abstract"
	"github.com/NUTFes/FinanSu/api/generated"
	goqu "github.com/doug-martin/goqu/v9"
)

type festivalItemRepository struct {
	client db.Client
	crud   abstract.Crud
}

type FestivalItemRepository interface {
	All(context.Context) (*sql.Rows, error)
	AllByPeriod(context.Context, string) (*sql.Rows, error)
	AllByPeriodAndDivision(context.Context, string, string) (*sql.Rows, error)
	GetById(context.Context, string) (*sql.Row, error)
	CreateFestivalItem(context.Context, *sql.Tx, generated.FestivalItem) error
	CreateItemBudget(context.Context, *sql.Tx, generated.FestivalItem) error
	UpdateFestivalItem(context.Context, *sql.Tx, string, generated.FestivalItem) error
	UpdateItemBudget(context.Context, *sql.Tx, string, generated.FestivalItem) error
	DeleteFestivalItem(context.Context, *sql.Tx, string) error
	DeleteItemBudget(context.Context, *sql.Tx, string) error
	FindLatestRecord(context.Context) (*sql.Row, error)
	StartTransaction(context.Context) (*sql.Tx, error)
	RollBack(context.Context, *sql.Tx)
	Commit(context.Context, *sql.Tx) error
}

func NewFestivalItemRepository(c db.Client, ac abstract.Crud) FestivalItemRepository {
	return &festivalItemRepository{c, ac}
}

// 年度別に取得
func (fir *festivalItemRepository) All(
	c context.Context,
) (*sql.Rows, error) {
	query, _, err := dialect.Select(
		"festival_items.id",
		"festival_items.name",
		"festival_items.memo",
		"financial_records.name",
		"divisions.name",
		goqu.L("COALESCE(`item_budgets`.`amount`, 0)").As("budget"),
		goqu.COALESCE(goqu.SUM("buy_reports.amount"), 0).As("expense"),
		goqu.COALESCE(goqu.L("item_budgets.amount - COALESCE(SUM(`buy_reports`.`amount`), 0)"), 0).As("balance")).
		From("festival_items").
		InnerJoin(goqu.I("divisions"), goqu.On(goqu.I("festival_items.division_id").Eq(goqu.I("divisions.id")))).
		InnerJoin(goqu.I("financial_records"), goqu.On(goqu.I("divisions.financial_record_id").Eq(goqu.I("financial_records.id")))).
		InnerJoin(goqu.I("years"), goqu.On(goqu.I("financial_records.year_id").Eq(goqu.I("years.id")))).
		LeftJoin(goqu.I("item_budgets"), goqu.On(goqu.I("festival_items.id").Eq(goqu.I("item_budgets.festival_item_id")))).
		LeftJoin(goqu.I("buy_reports"), goqu.On(goqu.I("festival_items.id").Eq(goqu.I("buy_reports.festival_item_id")))).
		GroupBy("festival_items.id", "item_budgets.amount").
		Order(goqu.I("festival_items.id").Desc()).
		ToSQL()
	if err != nil {
		return nil, err
	}
	return fir.crud.Read(c, query)
}

// 年度別に取得
func (fir *festivalItemRepository) AllByPeriod(
	c context.Context,
	year string,
) (*sql.Rows, error) {
	query, _, err := dialect.Select(
		"festival_items.id",
		"festival_items.name",
		"festival_items.memo",
		"financial_records.name",
		"divisions.name",
		goqu.L("COALESCE(`item_budgets`.`amount`, 0)").As("budget"),
		goqu.COALESCE(goqu.SUM("buy_reports.amount"), 0).As("expense"),
		goqu.COALESCE(goqu.L("item_budgets.amount - COALESCE(SUM(`buy_reports`.`amount`), 0)"), 0).As("balance")).
		From("festival_items").
		InnerJoin(goqu.I("divisions"), goqu.On(goqu.I("festival_items.division_id").Eq(goqu.I("divisions.id")))).
		InnerJoin(goqu.I("financial_records"), goqu.On(goqu.I("divisions.financial_record_id").Eq(goqu.I("financial_records.id")))).
		InnerJoin(goqu.I("years"), goqu.On(goqu.I("financial_records.year_id").Eq(goqu.I("years.id")))).
		LeftJoin(goqu.I("item_budgets"), goqu.On(goqu.I("festival_items.id").Eq(goqu.I("item_budgets.festival_item_id")))).
		LeftJoin(goqu.I("buy_reports"), goqu.On(goqu.I("festival_items.id").Eq(goqu.I("buy_reports.festival_item_id")))).
		GroupBy("festival_items.id", "item_budgets.amount").
		Order(goqu.I("festival_items.id").Desc()).
		Where(goqu.Ex{"years.year": year}).
		ToSQL()
	if err != nil {
		return nil, err
	}
	return fir.crud.Read(c, query)
}

// 年度別と部門で取得
func (fir *festivalItemRepository) AllByPeriodAndDivision(
	c context.Context,
	year string,
	divisionId string,
) (*sql.Rows, error) {
	query, _, err := dialect.Select(
		"festival_items.id",
		"festival_items.name",
		"festival_items.memo",
		"financial_records.name",
		"divisions.name",
		goqu.L("COALESCE(`item_budgets`.`amount`, 0)").As("budget"),
		goqu.COALESCE(goqu.SUM("buy_reports.amount"), 0).As("expense"),
		goqu.COALESCE(goqu.L("item_budgets.amount - COALESCE(SUM(`buy_reports`.`amount`), 0)"), 0).As("balance")).
		From("festival_items").
		InnerJoin(goqu.I("divisions"), goqu.On(goqu.I("festival_items.division_id").Eq(goqu.I("divisions.id")))).
		InnerJoin(goqu.I("financial_records"), goqu.On(goqu.I("divisions.financial_record_id").Eq(goqu.I("financial_records.id")))).
		InnerJoin(goqu.I("years"), goqu.On(goqu.I("financial_records.year_id").Eq(goqu.I("years.id")))).
		LeftJoin(goqu.I("item_budgets"), goqu.On(goqu.I("festival_items.id").Eq(goqu.I("item_budgets.festival_item_id")))).
		LeftJoin(goqu.I("buy_reports"), goqu.On(goqu.I("festival_items.id").Eq(goqu.I("buy_reports.festival_item_id")))).
		GroupBy("festival_items.id", "item_budgets.amount").
		Order(goqu.I("festival_items.id").Desc()).
		Where(goqu.Ex{"divisions.id": divisionId}).
		Where(goqu.Ex{"years.year": year}).
		ToSQL()

	if err != nil {
		return nil, err
	}
	return fir.crud.Read(c, query)
}

// IDで取得
func (fir *festivalItemRepository) GetById(
	c context.Context,
	id string,
) (*sql.Row, error) {
	query, _, err := dialect.Select(
		"festival_items.id",
		"festival_items.name",
		"festival_items.memo",
		"financial_records.name",
		"divisions.name",
		"item_budgets.amount",
		goqu.COALESCE(goqu.SUM("buy_reports.amount"), 0).As("expense"),
		goqu.COALESCE(goqu.L("item_budgets.amount - COALESCE(SUM(`buy_reports`.`amount`), 0)"), 0).As("balance")).
		From("festival_items").
		InnerJoin(goqu.I("divisions"), goqu.On(goqu.I("festival_items.division_id").Eq(goqu.I("divisions.id")))).
		InnerJoin(goqu.I("financial_records"), goqu.On(goqu.I("divisions.financial_record_id").Eq(goqu.I("financial_records.id")))).
		InnerJoin(goqu.I("years"), goqu.On(goqu.I("financial_records.year_id").Eq(goqu.I("years.id")))).
		LeftJoin(goqu.I("item_budgets"), goqu.On(goqu.I("festival_items.id").Eq(goqu.I("item_budgets.festival_item_id")))).
		LeftJoin(goqu.I("buy_reports"), goqu.On(goqu.I("festival_items.id").Eq(goqu.I("buy_reports.festival_item_id")))).
		GroupBy("festival_items.id", "item_budgets.amount").
		Where(goqu.Ex{"festival_items.id": id}).
		ToSQL()

	if err != nil {
		return nil, err
	}
	return fir.crud.ReadByID(c, query)
}

// 購入物品作成
func (fir *festivalItemRepository) CreateFestivalItem(
	c context.Context,
	tx *sql.Tx,
	festivalItem generated.FestivalItem,
) error {
	ds := dialect.Insert("festival_items").
		Rows(goqu.Record{"name": festivalItem.Name, "memo": festivalItem.Memo, "division_id": festivalItem.DivisionId})
	query, _, err := ds.ToSQL()
	if err != nil {
		return err
	}
	_, err = tx.Exec(query)

	return err
}

func (fir *festivalItemRepository) CreateItemBudget(
	c context.Context,
	tx *sql.Tx,
	festivalItem generated.FestivalItem,
) error {
	ds := dialect.Insert("item_budgets").
		Rows(goqu.Record{"amount": festivalItem.Amount, "festival_item_id": goqu.L("LAST_INSERT_ID()")})
	query, _, err := ds.ToSQL()
	if err != nil {
		return err
	}
	_, err = tx.Exec(query)

	return err
}

// festivalItem編集
func (fir *festivalItemRepository) UpdateFestivalItem(
	c context.Context,
	tx *sql.Tx,
	id string,
	festivalItem generated.FestivalItem,
) error {
	ds := dialect.Update("festival_items").
		Set(goqu.Record{"name": festivalItem.Name, "memo": festivalItem.Memo, "division_id": festivalItem.DivisionId}).
		Where(goqu.Ex{"id": id})
	query, _, err := ds.ToSQL()
	if err != nil {
		return err
	}
	_, err = tx.Exec(query)
	return err
}

// itemBudget編集
func (fir *festivalItemRepository) UpdateItemBudget(
	c context.Context,
	tx *sql.Tx,
	id string,
	festivalItem generated.FestivalItem,
) error {
	ds := dialect.Update("item_budgets").
		Set(goqu.Record{"amount": festivalItem.Amount}).
		Where(goqu.Ex{"festival_item_id": id})
	query, _, err := ds.ToSQL()
	fmt.Println(query)
	if err != nil {
		return err
	}
	_, err = tx.Exec(query)
	return err
}

// 購入物品削除
func (fir *festivalItemRepository) DeleteFestivalItem(
	c context.Context,
	tx *sql.Tx,
	id string,
) error {
	ds := dialect.Delete("festival_items").Where(goqu.Ex{"id": id})
	query, _, err := ds.ToSQL()
	if err != nil {
		return err
	}
	fmt.Println(query)
	_, err = tx.Exec(query)
	return err
}

// 予算削除
func (fir *festivalItemRepository) DeleteItemBudget(
	c context.Context,
	tx *sql.Tx,
	id string,
) error {
	ds := dialect.Delete("item_budgets").Where(goqu.Ex{"festival_item_id": id})
	query, _, err := ds.ToSQL()
	if err != nil {
		return err
	}
	_, err = tx.Exec(query)
	return err
}

// 最新のfestivalItemを取得する
func (fir *festivalItemRepository) FindLatestRecord(c context.Context) (*sql.Row, error) {
	query, _, err := dialect.Select(
		"festival_items.id",
		"festival_items.name",
		"festival_items.memo",
		"financial_records.name",
		"divisions.name",
		"item_budgets.amount",
		goqu.COALESCE(goqu.SUM("buy_reports.amount"), 0).As("expense"),
		goqu.COALESCE(goqu.L("item_budgets.amount - COALESCE(SUM(`buy_reports`.`amount`), 0)"), 0).As("balance")).
		From("festival_items").
		InnerJoin(goqu.I("divisions"), goqu.On(goqu.I("festival_items.division_id").Eq(goqu.I("divisions.id")))).
		InnerJoin(goqu.I("financial_records"), goqu.On(goqu.I("divisions.financial_record_id").Eq(goqu.I("financial_records.id")))).
		InnerJoin(goqu.I("years"), goqu.On(goqu.I("financial_records.year_id").Eq(goqu.I("years.id")))).
		LeftJoin(goqu.I("item_budgets"), goqu.On(goqu.I("festival_items.id").Eq(goqu.I("item_budgets.festival_item_id")))).
		LeftJoin(goqu.I("buy_reports"), goqu.On(goqu.I("festival_items.id").Eq(goqu.I("buy_reports.festival_item_id")))).
		GroupBy("festival_items.id", "item_budgets.amount").
		Order(goqu.I("festival_items.id").Desc()).
		Limit(1).
		ToSQL()

	if err != nil {
		return nil, err
	}
	return fir.crud.ReadByID(c, query)
}

func (fir *festivalItemRepository) StartTransaction(c context.Context) (*sql.Tx, error) {
	return fir.crud.StartTransaction(c)
}

func (fir *festivalItemRepository) RollBack(c context.Context, tx *sql.Tx) {
	tx.Rollback()
}

func (fir *festivalItemRepository) Commit(c context.Context, tx *sql.Tx) error {
	return tx.Commit()
}

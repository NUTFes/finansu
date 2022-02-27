package main

import (
	"database/sql"
	"fmt"
	"github.com/NUTFes/FinanSu/api/internals/di"
	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo/v4"
	"github.com/pkg/errors"
	"log"
	"net/http"
	"time"
)

var DB *sql.DB

func connect() {
	// データベース接続部分
	dbconf := "finansu:password@tcp(nutfes-finansu-db:3306)/finansu_db?charset=utf8mb4&parseTime=true"
	var err error
	DB, err = sql.Open("mysql", dbconf)

	if err != nil {
		log.Println(err.Error())
	}

	err = DB.Ping()

	if err != nil {
		fmt.Println("[Failed] Not Connect to MySQL") // 失敗
		log.Println(err.Error())
	} else {
		fmt.Println("[Success] Connect to MySQL") // 成功
	}
}

//PurchaseOrdersの取得
func GetPurchaseOrders() echo.HandlerFunc {
	return func(c echo.Context) error {
		purchaseorder := PurchaseOrder{}
		var purchaseorders []PurchaseOrder
		//クエリ実行
		rows, err := DB.Query("select* from purchase_orders")

		if err != nil {
			return errors.Wrapf(err, "can not connect SQL")
		}
		defer rows.Close()

		for rows.Next() {
			err := rows.Scan(
				&purchaseorder.ID,
				&purchaseorder.Item,
				&purchaseorder.Price,
				&purchaseorder.DepartmentID,
				&purchaseorder.Detail,
				&purchaseorder.Url,
				&purchaseorder.CreatedAt,
				&purchaseorder.UpdatedAt)
			if err != nil {
				return errors.Wrapf(err, "cannot connect SQL")
			}
			purchaseorders = append(purchaseorders, purchaseorder)
		}
		return c.JSON(http.StatusOK, purchaseorders)
	}
}

//PurchaseOrderの取得(Get)
func GetPurchaseOrder() echo.HandlerFunc {
	return func(c echo.Context) error {
		purchaseorder := PurchaseOrder{}
		id := c.Param("id")
		err := DB.QueryRow("select * from purchase_orders where id = "+id).Scan(
			&purchaseorder.ID,
			&purchaseorder.Item,
			&purchaseorder.Price,
			&purchaseorder.DepartmentID,
			&purchaseorder.Detail,
			&purchaseorder.Url,
			&purchaseorder.CreatedAt,
			&purchaseorder.UpdatedAt,
		)
		if err != nil {
			fmt.Println(err)
			return err
		}
		return c.JSON(http.StatusOK, purchaseorder)
	}
}

//PurchaseOrderの作成(Create)
func CreatePurchaseOrder() echo.HandlerFunc {
	return func(c echo.Context) error {
		item := c.QueryParam("item")
		price := c.QueryParam("price")
		departmentID := c.QueryParam("department_id")
		detail := c.QueryParam("detail")
		url := c.QueryParam("url")
		_, err := DB.Exec("insert into purchase_orders (item, price, department_id, detail, url) values (" + item + "," + price + "," + departmentID + "," + detail + "," + url + ")")
		if err != nil {
			return err
		}
		return c.String(http.StatusCreated, "Created PurchaseOrders")
	}
}

//PurchaseOrderの修正(Update)
func UpdatePurchaseOrder() echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		item := c.QueryParam("item")
		price := c.QueryParam("price")
		departmentID := c.QueryParam("department_id")
		detail := c.QueryParam("detail")
		url := c.QueryParam("url")
		_, err := DB.Exec("update purchase_orders set item = " + item + ", price = " + price + ", department_id = " + departmentID + " , detail = " + detail + " , url = " + url + " where id = " + string(id))
		if err != nil {
			return err
		}
		return c.String(http.StatusCreated, "Update PurchaseOrder")
	}
}

//PurchaseOrderの消去(Delete)
func DeletePurchaseOrder() echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		_, err := DB.Exec("delete from purchase_orders where id = " + id)
		if err != nil {
			return err
		}
		return c.String(http.StatusOK, "Delete PurchaseOrder")
	}
}

//PurchaseReportsの取得(Get)
func GetPurchaseReports() echo.HandlerFunc {
	return func(c echo.Context) error {
		purchasereport := PurchaseReport{}
		var purchasereports []PurchaseReport

		rows, err := DB.Query("select * from purchase_reports")
		if err != nil {
			return errors.Wrapf(err, "can not connect SQL")
		}
		defer rows.Close()

		for rows.Next() {
			err := rows.Scan(
				&purchasereport.ID,
				&purchasereport.Item,
				&purchasereport.Price,
				&purchasereport.DepartmentID,
				&purchasereport.PurchaseOrderID,
				&purchasereport.CreatedAt,
				&purchasereport.UpdatedAt,
			)
			if err != nil {
				return errors.Wrapf(err, "can not connect SQL")
			}
			purchasereports = append(purchasereports, purchasereport)
		}
		return c.JSON(http.StatusOK, purchasereports)
	}
}

//PurchaseReportの取得(Get)
func GetPurchaseReport() echo.HandlerFunc {
	return func(c echo.Context) error {
		purchasereport := PurchaseReport{}
		id := c.Param("id")
		err := DB.QueryRow("select * from purchase_reports where id ="+id).Scan(
			&purchasereport.ID,
			&purchasereport.Item,
			&purchasereport.Price,
			&purchasereport.DepartmentID,
			&purchasereport.PurchaseOrderID,
			&purchasereport.CreatedAt,
			&purchasereport.UpdatedAt,
		)
		if err != nil {
			fmt.Println("error")
			return err
		}
		return c.JSON(http.StatusOK, purchasereport)
	}
}

//PurchaseReportの作成(Create)
func CreatePurchaseReport() echo.HandlerFunc {
	return func(c echo.Context) error {
		item := c.QueryParam("item")
		price := c.QueryParam("price")
		DepartmentID := c.QueryParam("department_id")
		PurchaseOrderID := c.QueryParam("purchase_order_id")
		_, err := DB.Exec("insert into purchase_reports (item, price, department_id, purchase_order_id ) values (" + item + "," + price + "," + DepartmentID + "," + PurchaseOrderID + ")")
		if err != nil {
			return err
		}
		return c.String(http.StatusCreated, "Create PurchaseReport")
	}
}

//PurchaseReportの修正(Update)
func UpdatePurchaseReport() echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		item := c.QueryParam("item")
		price := c.QueryParam("price")
		DepartmentID := c.QueryParam("department_id")
		PurchaseOrderID := c.QueryParam("purchase_order_id")
		_, err := DB.Exec("update purchase_reports set item =" + item + ", price = " + price + " , department_id = " + DepartmentID + ", purchase_order_id = " + PurchaseOrderID + " where id = " + string(id))
		if err != nil {
			return err
		}
		return c.String(http.StatusCreated, "Update PurchaseReport")
	}
}

//PurchaseReportの削除(delete)
func DeletePurchaseReport() echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		_, err := DB.Exec("delete from purchase_reports where id =" + id)
		if err != nil {
			return err
		}
		return c.String(http.StatusCreated, "Delete PurchaseReport")
	}
}

//FundInformationsの取得(Get)
func GetFundInformations() echo.HandlerFunc {
	return func(c echo.Context) error {
		fundinformation := FundInformation{}
		var fundinformations []FundInformation
		rows, err := DB.Query("select * from fund_informations")
		if err != nil {
			return errors.Wrapf(err, "can not connect SQL")
		}
		defer rows.Close()
		for rows.Next() {
			err := rows.Scan(
				&fundinformation.ID,
				&fundinformation.ContactPerson,
				&fundinformation.FundDate,
				&fundinformation.FundTime,
				&fundinformation.Price,
				&fundinformation.Detail,
				&fundinformation.ReportPerson,
				&fundinformation.ReportPrice,
				&fundinformation.CreatedAt,
				&fundinformation.UpdatedAt,
			)
			if err != nil {
				fmt.Println("error")
				return err
			}
			fundinformations = append(fundinformations, fundinformation)
		}
		return c.JSON(http.StatusOK, fundinformations)
	}
}

//FundInfomationの取得(Get)
func GetFundInformation() echo.HandlerFunc {
	return func(c echo.Context) error {
		fundinformation := FundInformation{}
		id := c.Param("id")
		err := DB.QueryRow("select * from fund_informations where id = "+id).Scan(
			&fundinformation.ID,
			&fundinformation.ContactPerson,
			&fundinformation.FundDate,
			&fundinformation.FundTime,
			&fundinformation.Price,
			&fundinformation.Detail,
			&fundinformation.ReportPerson,
			&fundinformation.ReportPrice,
			&fundinformation.CreatedAt,
			&fundinformation.UpdatedAt,
		)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, fundinformation)
	}
}

//FundInfomationの作成(Create)
func CreateFundInformations() echo.HandlerFunc {
	return func(c echo.Context) error {
		ContactPerson := c.QueryParam("contact_person")
		FundDate := c.QueryParam("fund_date")
		FundTime := c.QueryParam("fund_time")
		price := c.QueryParam("price")
		detail := c.QueryParam("detail")
		ReportPerson := c.QueryParam("report_person")
		ReportPrice := c.QueryParam("report_price")
		_, err := DB.Exec("Insert into fund_informations (contact_person, fund_date, fund_time, price, detail, report_person, report_price) values ( " + ContactPerson + "," + FundDate + "," + FundTime + "," + price + "," + detail + "," + ReportPerson + "," + ReportPrice + ")")
		if err != nil {
			return err
		}
		return c.String(http.StatusCreated, "Create FundInformation")
	}
}

//FundInformationの修正(Update)
func UpdateFundInformation() echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		ContactPerson := c.QueryParam("contact_person")
		FundDate := c.QueryParam("fund_date")
		FundTime := c.QueryParam("fund_time")
		price := c.QueryParam("price")
		detail := c.QueryParam("detail")
		ReportPerson := c.QueryParam("report_person")
		ReportPrice := c.QueryParam("report_price")
		_, err := DB.Exec("Update fund_informations set contact_person = " + ContactPerson + " , fund_date = " + FundDate + ", fund_time = " + FundTime + ", price =" + price + ", detail = " + detail + ", report_person = " + ReportPerson + ", report_price =" + ReportPrice + " where id = " + string(id))
		if err != nil {
			return err
		}
		return c.String(http.StatusCreated, "Update FundInformation")
	}
}

//funcInformationの削除(delete)
func DeleteFundInformation() echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		_, err := DB.Exec("Delete from fund_informations where id = " + id)
		if err != nil {
			return err
		}
		return c.String(http.StatusCreated, "Delete fundInformation")
	}
}

//value Object
type ID int
type Price int
type YearID int
type SourceID int

type Item string
type DepartmentID int
type Detail string
type Url string

type PurchaseOrderID int

type ContactPerson string
type FundDate string
type FundTime string
type ReportPerson string
type ReportPrice int

// //Budget構造体定義
// type Budget struct {
// 	ID        ID        `json:"id"`
// 	Price     Price     `json:"price"`
// 	YearID    YearID    `json:"year_id"`
// 	SourceID  SourceID  `json:"source_id"`
// 	CreatedAt time.Time `json:"created_at"`
// 	UpdatedAt time.Time `json:"updated_at"`
// }

// PurchaseOrder構造体定義
type PurchaseOrder struct {
	ID           ID           `json:"id"`
	Item         Item         `json:"item"`
	Price        Price        `json:"price"`
	DepartmentID DepartmentID `json:"department_id"`
	Detail       Detail       `json:"detail"`
	Url          Url          `json:"url"`
	CreatedAt    time.Time    `json:"created_at"`
	UpdatedAt    time.Time    `json:"updated_at"`
}

// PurchaseRepoer構造体定義
type PurchaseReport struct {
	ID              ID              `json:"id"`
	Item            Item            `json:"item"`
	Price           Price           `json:"price"`
	DepartmentID    DepartmentID    `json:"department_id"`
	PurchaseOrderID PurchaseOrderID `json:"purchase_order_id"`
	CreatedAt       time.Time       `json:"created_at"`
	UpdatedAt       time.Time       `json:"updated_at"`
}

//FundInformationsの構造体定義
type FundInformation struct {
	ID            ID            `json:"id"`
	ContactPerson ContactPerson `json:"contact_person"`
	FundDate      FundDate      `json:"fund_date"`
	FundTime      FundTime      `json:"fund_time"`
	Price         Price         `json:"price"`
	Detail        Detail        `json:"detail"`
	ReportPerson  ReportPerson  `json:"report_person"`
	ReportPrice   ReportPrice   `json:"report_price"`
	CreatedAt     time.Time     `json:"created_at"`
	UpdatedAt     time.Time     `json:"updated_at"`
}

func main() {
	client := di.InitializeServer()
	defer client.CloseDB()
}

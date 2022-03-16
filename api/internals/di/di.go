package di

import (
	"github.com/NUTFes/FinanSu/api/drivers/db"
	"github.com/NUTFes/FinanSu/api/drivers/server"
	"github.com/NUTFes/FinanSu/api/externals/controller"
	"github.com/NUTFes/FinanSu/api/externals/repository"
	"github.com/NUTFes/FinanSu/api/internals/usecase"
	"github.com/NUTFes/FinanSu/api/router"
	"log"
)

func InitializeServer() db.Client {
	// DB接続
	client, err := db.ConnectMySQL()
	if err != nil {
		log.Fatal("db error")
	}

	// ↓

	// Repository
	budgetRepository := repository.NewBudgetRepository(client)
	fundInformationRepository := repository.NewFundInformationRepository(client)
	purchaseOrderRepository := repository.NewPurchaseOrderRepository(client)
	purchaseReportRepository := repository.NewPurchaseReportRepository(client)
	PurchaseItemRepository := repository.NewPurchaseItemRepository(client)
	SponserStyleRepository := repository.NewSponserStyleRepository(client)
	// ↓

	// UseCase
	budgetUseCase := usecase.NewBudgetUsecase(budgetRepository)
	fundInformationUseCase := usecase.NewFundInformationUseCase(fundInformationRepository)
  purchaseOrderUseCase := usecase.NewPurchaseOrderUseCase(purchaseOrderRepository)
	purchaseReportUseCase := usecase.NewPurchaseReportUsecase(purchaseReportRepository)
	purchaseItemUseCase := usecase.NewPurchaseItemUseCase(PurchaseItemRepository)
	sponserStyleUseCase := usecase.NewSponserStyleUseCase(SponserStyleRepository)
	// ↓

	// Controller
	healthcheckController := controller.NewHealthCheckController()
	budgetController := controller.NewBudgetController(budgetUseCase)
	fundInformationController := controller.NewFundInformationController(fundInformationUseCase)
  purchaseOrderController := controller.NewPurchaseOrderController(purchaseOrderUseCase)
	purchaseReportController := controller.NewPurchaseReportController(purchaseReportUseCase)
	purchaseItemController := controller.NewPurchaseItemController(purchaseItemUseCase)
	sponserStyleController := controller.NewSponserStyleController(sponserStyleUseCase)
	// ↓

	// router
	router := router.NewRouter(
		healthcheckController,
		budgetController,
		fundInformationController,
		purchaseOrderController,
		purchaseReportController,
		purchaseItemController,
		sponserStyleController,
	)

	// ↓

	// Server
	server.RunServer(router)

	return client
}

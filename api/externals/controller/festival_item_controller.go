package controller

import (
	"net/http"

	"github.com/NUTFes/FinanSu/api/generated"
	"github.com/NUTFes/FinanSu/api/internals/usecase"
	"github.com/labstack/echo/v4"
)

type festivalItemController struct {
	u usecase.FestivalItemUseCase
}

type FestivalItemController interface {
	IndexFestivalItems(echo.Context) error
	CreateFestivalItem(echo.Context) error
	UpdateFestivalItem(echo.Context) error
	DestroyFestivalItem(echo.Context) error
}

func NewFestivalItemController(u usecase.FestivalItemUseCase) FestivalItemController {
	return &festivalItemController{u}
}

func (f *festivalItemController) IndexFestivalItems(c echo.Context) error {
	ctx := c.Request().Context()
	year := c.QueryParam("year")
	divisionId := c.QueryParam("division_id")
	var festivalItemDetails FestivalItemDetails

	festivalItemDetails, err := f.u.GetFestivalItems(ctx, year, divisionId)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, festivalItemDetails)
}

func (f *festivalItemController) CreateFestivalItem(c echo.Context) error {
	festivalItem := new(FestivalItem)
	if err := c.Bind(festivalItem); err != nil {
		return c.String(http.StatusBadRequest, "Bad Request")
	}
	latastFestivalItem, err := f.u.CreateFestivalItem(c.Request().Context(), *festivalItem)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, latastFestivalItem)
}

func (f *festivalItemController) UpdateFestivalItem(c echo.Context) error {
	id := c.Param("id")
	festivalItem := new(FestivalItem)
	if err := c.Bind(festivalItem); err != nil {
		return c.String(http.StatusBadRequest, "Bad Request")
	}
	updatedFestivalItem, err := f.u.UpdateFestivalItem(
		c.Request().Context(),
		id,
		*festivalItem,
	)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, updatedFestivalItem)
}

func (f *festivalItemController) DestroyFestivalItem(c echo.Context) error {
	id := c.Param("id")
	err := f.u.DestroyFestivalItem(c.Request().Context(), id)
	if err != nil {
		return err
	}
	return c.String(http.StatusOK, "Destroy Festival Item")
}

type FestivalItemDetails = generated.FestivalItemDetails
type FestivalItem = generated.FestivalItem

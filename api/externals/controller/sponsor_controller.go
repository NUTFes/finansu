package controller

import (
	"net/http"
	"strings"

	"github.com/NUTFes/FinanSu/api/internals/domain"
	"github.com/NUTFes/FinanSu/api/internals/usecase"
	"github.com/labstack/echo/v4"
)

type sponsorController struct {
	u usecase.SponsorUseCase
}

type SponsorController interface {
	IndexSponsor(echo.Context) error
	ShowSponsor(echo.Context) error
	CreateSponsor(echo.Context) error
	UpdateSponsor(echo.Context) error
	DestroySponsor(echo.Context) error
	IndexSponsorByPeriod(echo.Context) error
}

func NewSponsorController(u usecase.SponsorUseCase) SponsorController {
	return &sponsorController{u}
}

func (s *sponsorController) IndexSponsor(c echo.Context) error {
	sponsors, err := s.u.GetSponsor(c.Request().Context())
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, sponsors)
}

func (s *sponsorController) ShowSponsor(c echo.Context) error {
	id := c.Param("id")
	sponsor, err := s.u.GetSponsorByID(c.Request().Context(), id)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, sponsor)
}

func (s *sponsorController) CreateSponsor(c echo.Context) error {
	sponsor := new(domain.Sponsor)
	if err := c.Bind(sponsor); err != nil {
		return err
	}
	//エスケープ処理
	Name := strings.ReplaceAll(sponsor.Name, `"`, `\"`)
	Tel := strings.ReplaceAll(sponsor.Tel, `"`, `\"`)
	Email := strings.ReplaceAll(sponsor.Email, `"`, `\"`)
	Address := strings.ReplaceAll(sponsor.Address, `"`, `\"`)
	Representative := strings.ReplaceAll(sponsor.Representative, `"`, `\"`)

	latastSponsor, err := s.u.CreateSponsor(c.Request().Context(), Name, Tel, Email, Address, Representative)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, latastSponsor)
}

func (s *sponsorController) UpdateSponsor(c echo.Context) error {
	id := c.Param("id")
	sponsor := new(domain.Sponsor)
	if err := c.Bind(sponsor); err != nil {
		return err
	}
	//エスケープ処理
	Name := strings.ReplaceAll(sponsor.Name, `"`, `\"`)
	Tel := strings.ReplaceAll(sponsor.Tel, `"`, `\"`)
	Email := strings.ReplaceAll(sponsor.Email, `"`, `\"`)
	Address := strings.ReplaceAll(sponsor.Address, `"`, `\"`)
	Representative := strings.ReplaceAll(sponsor.Representative, `"`, `\"`)

	updatedSponsor, err := s.u.UpdateSponsor(c.Request().Context(), id, Name, Tel, Email, Address, Representative)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, updatedSponsor)
}

func (s *sponsorController) DestroySponsor(c echo.Context) error {
	id := c.Param("id")

	err := s.u.DestroySponsor(c.Request().Context(), id)
	if err != nil {
		return err
	}
	return c.String(http.StatusOK, "Destroy Sponsor")
}

//年度別に取得
func (s *sponsorController) IndexSponsorByPeriod(c echo.Context) error {
	year := c.Param("year")
	sponsors, err := s.u.GetSponsorByPeriod(c.Request().Context(), year)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, sponsors)
}

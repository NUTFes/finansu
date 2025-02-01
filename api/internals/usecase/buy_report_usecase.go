package usecase

import (
	"context"
	"mime/multipart"

	rep "github.com/NUTFes/FinanSu/api/externals/repository"
	"github.com/NUTFes/FinanSu/api/generated"
)

type buyReportUseCase struct {
	rep rep.BuyReportRepository
}

type BuyReportUseCase interface {
	CreateBuyReport(context.Context, PostBuyReport, *multipart.FileHeader) (PostBuyReport, error)
}

func NewBuyReportUseCase(rep rep.BuyReportRepository) BuyReportUseCase {
	return &buyReportUseCase{rep}
}

func (b *buyReportUseCase) CreateBuyReport(c context.Context, buyReportInfo PostBuyReport, file *multipart.FileHeader) (PostBuyReport, error) {
	// トランザクションスタート
	
	return buyReportInfo, nil
}

// func (s *sourceUseCase) GetSourceByID(c context.Context, id string) (domain.Source, error) {
// 	source := domain.Source{}
// 	row, err := s.rep.Find(c, id)
// 	err = row.Scan(
// 		&source.ID,
// 		&source.Name,
// 		&source.CreatedAt,
// 		&source.UpdatedAt,
// 	)
// 	if err != nil {
// 		return source, err
// 	}
// 	return source, nil
// }

// func (s *sourceUseCase) CreateSource(c context.Context, name string) (domain.Source, error) {
// 	latastSource := domain.Source{}
// 	err := s.rep.Create(c, name)
// 	row, err := s.rep.FindLatestRecord(c)
// 	err = row.Scan(
// 		&latastSource.ID,
// 		&latastSource.Name,
// 		&latastSource.CreatedAt,
// 		&latastSource.UpdatedAt,
// 	)
// 	if err != nil {
// 		return latastSource, err
// 	}
// 	return latastSource, err
// }

// func (s *sourceUseCase) UpdateSource(c context.Context, id string, name string) (domain.Source, error) {
// 	updatedSource := domain.Source{}
// 	err := s.rep.Update(c, id, name)
// 	row, err := s.rep.Find(c, id)
// 	err = row.Scan(
// 		&updatedSource.ID,
// 		&updatedSource.Name,
// 		&updatedSource.CreatedAt,
// 		&updatedSource.UpdatedAt,
// 	)
// 	if err != nil {
// 		return updatedSource, err
// 	}
// 	return updatedSource, err
// }

// func (s *sourceUseCase) DestroySource(c context.Context, id string) error {
// 	err := s.rep.Destroy(c, id)
// 	return err
// }

type PostBuyReport = generated.BuyReport

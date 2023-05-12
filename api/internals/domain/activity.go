package domain

import (
	"time"
)

type Activity struct {
	ID				int			`json:"id"`
	UserID			uint		`json:"userID"`
	IsDone			bool		`json:"isDone"`
	SponsorID		uint		`json:"sponsorID"`
	Feature 		string		`json:"feature"`
	Expense			uint		`json:"expense"`
	Remark			string		`json:"remark"`
	CreatedAt		time.Time	`json:"createdAt"`
	UpdatedAt		time.Time	`json:"updatedAt"`
}

type ActivityDetail struct {
	Activity		Activity		`json:"sponsorActivity"`
	Sponsor			Sponsor			`json:"sponsor"`
	SponsorStyle	[]SponsorStyle	`json:"sponsorStyle"`
	User			User			`json:"user"`
}

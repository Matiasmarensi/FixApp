ALTER TABLE "tickets" ALTER COLUMN "tech" SET DATA TYPE varchar(30);--> statement-breakpoint
ALTER TABLE "tickets" ALTER COLUMN "tech" SET DEFAULT 'unassigned';
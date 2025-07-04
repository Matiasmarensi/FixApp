CREATE TABLE "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"firs_name" varchar(15) NOT NULL,
	"last_name" varchar(15) NOT NULL,
	"email" varchar(60) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"address1" varchar(30) NOT NULL,
	"address2" varchar(30),
	"city" varchar(15) NOT NULL,
	"state" varchar(15) NOT NULL,
	"zip" varchar(10) NOT NULL,
	"notes" text,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "customers_email_unique" UNIQUE("email"),
	CONSTRAINT "customers_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"title" varchar(30) NOT NULL,
	"description" text NOT NULL,
	"tech" varchar(15) DEFAULT 'unassigned' NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;
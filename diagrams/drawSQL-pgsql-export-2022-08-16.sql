CREATE TABLE "Order"(
    "order_id" INTEGER NOT NULL,
    "worker_id=user_id" INTEGER NOT NULL,
    "client_id=user_id" INTEGER NOT NULL,
    "order_status" VARCHAR(255) NOT NULL,
    "order_description" TEXT NOT NULL,
    "created_at" DATE NOT NULL,
    "updated_at" DATE NOT NULL
);
ALTER TABLE
    "Order" ADD PRIMARY KEY("order_id");
CREATE TABLE "Detail"(
    "detail_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "detail_title" VARCHAR(255) NOT NULL,
    "detail_part_number" VARCHAR(255) NOT NULL,
    "availability_in_warehouse" BOOLEAN NOT NULL,
    "detail_price" DECIMAL(8, 2) NOT NULL,
    "qty" INTEGER NOT NULL,
    "created_at" DATE NOT NULL,
    "updated_at" DATE NOT NULL
);
ALTER TABLE
    "Detail" ADD PRIMARY KEY("detail_id");
CREATE TABLE "Order_payment"(
    "order_payment_id" INTEGER NOT NULL,
    "client_id=user_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "details_price_sum" DECIMAL(8, 2) NOT NULL,
    "work_price" DECIMAL(8, 2) NOT NULL,
    "payment_confirmation" BOOLEAN NOT NULL,
    "created_at" DATE NOT NULL,
    "updated_at" DATE NOT NULL
);
ALTER TABLE
    "Order_payment" ADD PRIMARY KEY("order_payment_id");
CREATE TABLE "User"(
    "id" INTEGER NOT NULL,
    "login" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "created_at" DATE NOT NULL,
    "updated_at" DATE NOT NULL
);
ALTER TABLE
    "User" ADD PRIMARY KEY("id");
ALTER TABLE
    "Order_payment" ADD CONSTRAINT "order_payment_order_id_foreign" FOREIGN KEY("order_id") REFERENCES "Order"("order_id");
ALTER TABLE
    "Detail" ADD CONSTRAINT "detail_order_id_foreign" FOREIGN KEY("order_id") REFERENCES "Order"("order_id");
ALTER TABLE
    "Order" ADD CONSTRAINT "order_worker_id=user_id_foreign" FOREIGN KEY("worker_id=user_id") REFERENCES "User"("id");
ALTER TABLE
    "Order" ADD CONSTRAINT "order_client_id=user_id_foreign" FOREIGN KEY("client_id=user_id") REFERENCES "User"("id");
ALTER TABLE
    "Order_payment" ADD CONSTRAINT "order_payment_client_id=user_id_foreign" FOREIGN KEY("client_id=user_id") REFERENCES "User"("id");
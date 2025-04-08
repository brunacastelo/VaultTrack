-- CreateTable
CREATE TABLE "InvestmentHistory" (
    "id" SERIAL NOT NULL,
    "investmentId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "InvestmentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InvestmentHistory_investmentId_date_key" ON "InvestmentHistory"("investmentId", "date");

-- AddForeignKey
ALTER TABLE "InvestmentHistory" ADD CONSTRAINT "InvestmentHistory_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "Investment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

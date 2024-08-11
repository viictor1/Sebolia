/*
  Warnings:

  - Added the required column `quantidade` to the `Exemplar` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exemplar" (
    "estado" TEXT NOT NULL,
    "livroId" INTEGER NOT NULL,
    "preco" REAL NOT NULL,
    "quantidade" INTEGER NOT NULL,

    PRIMARY KEY ("livroId", "estado"),
    CONSTRAINT "Exemplar_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Exemplar" ("estado", "livroId", "preco") SELECT "estado", "livroId", "preco" FROM "Exemplar";
DROP TABLE "Exemplar";
ALTER TABLE "new_Exemplar" RENAME TO "Exemplar";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

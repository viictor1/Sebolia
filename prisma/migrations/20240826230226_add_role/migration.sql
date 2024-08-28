-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user'
);
INSERT INTO "new_Cliente" ("celular", "id", "senha", "usuario") SELECT "celular", "id", "senha", "usuario" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_usuario_key" ON "Cliente"("usuario");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

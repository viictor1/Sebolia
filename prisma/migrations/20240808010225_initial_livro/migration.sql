-- CreateTable
CREATE TABLE "Livro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "editora" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "preco" REAL NOT NULL
);

IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [pets] (
    [ID] int NOT NULL IDENTITY,
    [Name] nvarchar(50) NOT NULL,
    [Description] nvarchar(50) NOT NULL,
    [Species] nvarchar(50) NOT NULL,
    [Age] int NOT NULL,
    CONSTRAINT [PK_pets] PRIMARY KEY ([ID])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230312173950_Init', N'7.0.3');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'ID', N'Age', N'Description', N'Name', N'Species') AND [object_id] = OBJECT_ID(N'[pets]'))
    SET IDENTITY_INSERT [pets] ON;
INSERT INTO [pets] ([ID], [Age], [Description], [Name], [Species])
VALUES (1, 7, N'Szép kutya', N'Vakarcs', N'Kutya'),
(2, 6, N'Szép cica', N'Cicó', N'Cica');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'ID', N'Age', N'Description', N'Name', N'Species') AND [object_id] = OBJECT_ID(N'[pets]'))
    SET IDENTITY_INSERT [pets] OFF;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230312190315_SeedData', N'7.0.3');
GO

COMMIT;
GO


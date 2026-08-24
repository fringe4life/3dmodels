/** Set test env before varlock/auto-load resolves `.env.test`. */
process.env.VARLOCK_ENV ??= "test";

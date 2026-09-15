# Local PostgreSQL sandbox

The local cancel-flow fixture uses Postgres.app PostgreSQL 16 on `localhost:5432` and the local `sblc` database. Production continues to use the Neon HTTP driver.

Setup:

```bash
createdb -h localhost -p 5432 -U <macOS-username> sblc
DATABASE_URL='postgres://<macOS-username>@localhost:5432/sblc' npm run db:push
ALLOW_TEST_SEED=true DATABASE_URL='postgres://<macOS-username>@localhost:5432/sblc' npm run seed:test-subscription
```

Never paste production connection strings or credentials into chat. The runtime selects node-postgres only for localhost URLs and Neon for all other URLs.

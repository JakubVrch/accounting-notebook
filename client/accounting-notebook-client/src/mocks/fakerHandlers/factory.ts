import { factory, primaryKey, manyOf, nullable } from "@mswjs/data";
import { faker } from "@faker-js/faker";

export const fakerDB = factory({
  transaction: {
    id: primaryKey(faker.datatype.uuid),
    date: () => faker.date.past(5),
    note: faker.random.words,
    entries: manyOf("entry", { unique: true }),
  },
  entry: {
    id: primaryKey(faker.datatype.uuid),
    account: faker.finance.accountName,
    note: nullable(faker.random.words),
    value: () => faker.finance.amount(10, 100000, 2),
  },
});

export function generateFakerDB(data: typeof fakerDB) {
  faker.setLocale("cz");
  faker.seed(1111);

  const transactionCount = 100;
  const EntryCount = 2;

  for (let t = 0; t < transactionCount; t++) {
    const entries: ReturnType<typeof data.entry.create>[] = [];
    for (let e = 0; e < EntryCount; e++) {
      entries.push(data.entry.create());
    }
    data.transaction.create({ entries });
  }
}

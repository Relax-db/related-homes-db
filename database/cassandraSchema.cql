CREATE TYPE address (
  street text,
  city text,
  state text,
  zip int,
  phones set<text>
);
CREATE TABLE users (
  name text PRIMARY KEY,
  email text,
  address frozen<address>
);

CREATE TABLE if not exists houses (
   houseId uuid,
   photoSrc text,
   location text,
   bedsAndHouse text,
   rating text,
   description text,
   pricePerNight text,
   PRIMARY KEY (houseId)
);


CREATE KEYSPACE if not exists houseKeySpace WITH replication = { class:'housesList', replication_factor: 1 }
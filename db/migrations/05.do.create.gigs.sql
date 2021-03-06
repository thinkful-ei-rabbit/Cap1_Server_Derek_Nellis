DROP TABLE IF EXISTS gigs;

CREATE TABLE gigs (
  id INTEGER GENERATED BY DEFAULT AS IDENTITY,
  venue VARCHAR(50) NOT NULL,
  gig_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);
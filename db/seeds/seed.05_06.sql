BEGIN;

TRUNCATE gigs RESTART IDENTITY CASCADE;

INSERT INTO gigs (
  venue,
  gig_date,
  start_time,
  end_time,
  user_id
)
VALUES
  (
    'Venue 1',
    '2020-03-02',
    '19:00:00',
    '21:00:00',
    1
  ),
  (
    'Venue 2',
    '2020-11-19',
    null,
    null,
    1
  );

INSERT INTO sets_gigs (gig_id, set_id)
VALUES
  (1, 1),
  (1, 2);

COMMIT;
DROP TABLE IF EXISTS songs_sets;

CREATE TABLE songs_sets (
  set_id INTEGER REFERENCES sets(id) ON DELETE CASCADE,
  song_id INTEGER REFERENCES songs(id) ON DELETE CASCADE,
  PRIMARY KEY (set_id, song_id)
);
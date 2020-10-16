const {
  SONGS_TABLE,
  SONGS_SETS_TABLE,
  SETS_TABLE,
  SETS_GIGS_TABLE
} = require('../../src/constants/table.constants');

const QueryService = {
  getSetSongTitles(db, set_id) {
    return db(`${SONGS_TABLE} as s`)
      .select('id', 'song_title')
      .join(`${SONGS_SETS_TABLE} as sst`, 'sst.song_id', 's.id')
      .where({ set_id });
  },

  getGigSetsTitles(db, gig_id) {
    return db(`${SETS_TABLE} as s`)
      .select('id', 'set_name')
      .join(`${SETS_GIGS_TABLE} as sgt`, 'sgt.set_id', 's.id')
      .where({ gig_id });
  }
};

module.exports = QueryService;

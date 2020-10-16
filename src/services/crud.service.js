const CRUDService = {
  getAllData(db, table, user_id) {
    return db(table).select('*').where({ user_id });
  },

  getById(db, table, id, user_id) {
    return db(table).where({ id, user_id }).first();
  },

  createEntry(db, table, newEntry) {
    return db(table).insert(newEntry, '*');
  },

  updateEntry(db, table, id, user_id, newEntry) {
    return db(table).where({ id, user_id }).update(newEntry, '*');
  },

  deleteById(db, table, id) {
    return db(table).where({ id }).del();
  },

  // case for user login
  getByName(db, user_name) {
    return db('users').where({ user_name }).first('*');
  },

  // cases for linkage tables
  deleteSSLink(db, song_id, set_id) {
    return db('songs_sets').where({ song_id, set_id }).del();
  },

  deleteSGLink(db, set_id, gig_id) {
    return db('sets_gigs').where({ set_id, gig_id }).del();
  },

  // for testing linkage tables
  getAllLinks(db, table) {
    return db(table).select('*');
  }
};

module.exports = CRUDService;

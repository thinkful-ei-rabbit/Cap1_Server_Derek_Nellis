const {
  USERS_TABLE,
  SONGS_TABLE,
  SETS_TABLE,
  SONGS_SETS_TABLE,
  GIGS_TABLE,
  SETS_GIGS_TABLE
} = require('../src/constants/table.constants');

/*
|--------------------------------------------------------------------------
| Seed Data
|--------------------------------------------------------------------------
*/
const JWT =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2MDI3MDE4OTAsInN1YiI6ImFkbWluIn0.DYRu7tWbt9rNZStYmLb3LfStI39KUMfY7aLHobTHyu8';

const USER_NAME_PASS = { user_name: 'admin', password: 'admin' };

const users = [
  {
    id: 1,
    user_name: 'admin',
    password: '$2a$05$/Hd9nJoDNJIpvEA9GFbN4eyjRyo3rqmNFR0Z9o5eG7oIq5XCUBOhS'
  },
  {
    id: 2,
    user_name: 'user2',
    password: '$2a$05$hhJ6TRwjQVde7zMNXVTeau.i3ubS/L02i36T2rlWyrO74Nzj9jPky'
  }
];

const songs = [
  {
    id: 1,
    song_title: 'Cool Song',
    composer: 'Bok',
    arranger: 'Some guy',
    description: "It's a song!",
    user_id: 1
  },
  {
    id: 2,
    song_title: 'Cooler Song',
    composer: 'Beatoven',
    arranger: 'Some girl',
    description: "It's another song!",
    user_id: 1
  },
  {
    id: 3,
    song_title: 'Meh Song',
    composer: 'Katy Perry',
    arranger: '',
    description: 'It\'s a "song"!',
    user_id: 1
  }
];

const expectedSongs = [
  {
    id: 1,
    song_title: 'Cool Song',
    composer: 'Bok',
    arranger: 'Some guy',
    description: "It's a song!"
  },
  {
    id: 2,
    song_title: 'Cooler Song',
    composer: 'Beatoven',
    arranger: 'Some girl',
    description: "It's another song!"
  },
  {
    id: 3,
    song_title: 'Meh Song',
    composer: 'Katy Perry',
    arranger: '',
    description: 'It\'s a "song"!'
  }
];

const sets = [
  {
    id: 1,
    set_name: 'Set 1',
    description: "It's a set!",
    user_id: 1
  },
  {
    id: 2,
    set_name: 'Set 2',
    description: "It's another set!",
    user_id: 1
  },
  {
    id: 3,
    set_name: 'Set 3',
    description: 'It\'s a "set"!',
    user_id: 1
  }
];

const expectedSets = [
  {
    id: 1,
    set_name: 'Set 1',
    description: "It's a set!",
    songs: [
      {
        id: 1,
        song_title: 'Cool Song'
      },
      {
        id: 2,
        song_title: 'Cooler Song'
      }
    ]
  },
  {
    id: 2,
    set_name: 'Set 2',
    description: "It's another set!",
    songs: [
      {
        id: 1,
        song_title: 'Cool Song'
      },
      {
        id: 3,
        song_title: 'Meh Song'
      }
    ]
  },
  {
    id: 3,
    set_name: 'Set 3',
    description: 'It\'s a "set"!',
    songs: []
  }
];

const gigs = [
  {
    id: 1,
    venue: 'Venue 1',
    gig_date: '2020-03-02',
    start_time: '19:00:00',
    end_time: '21:00:00',
    user_id: 1
  },
  {
    id: 2,
    venue: 'Venue 2',
    gig_date: '2020-11-19',
    start_time: null,
    end_time: null,
    user_id: 1
  }
];

const expectedGigs = [
  {
    id: 1,
    venue: 'Venue 1',
    gig_date: '2020-03-02T07:00:00.000Z',
    start_time: '19:00:00',
    end_time: '21:00:00',
    sets: [
      {
        id: 1,
        set_name: 'Set 1',
        songs: [
          {
            id: 1,
            song_title: 'Cool Song'
          },
          {
            id: 2,
            song_title: 'Cooler Song'
          }
        ]
      },
      {
        id: 2,
        set_name: 'Set 2',
        songs: [
          {
            id: 1,
            song_title: 'Cool Song'
          },
          {
            id: 3,
            song_title: 'Meh Song'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    venue: 'Venue 2',
    gig_date: '2020-11-19T07:00:00.000Z',
    start_time: null,
    end_time: null,
    sets: []
  }
];

const songs_sets = [
  {
    set_id: 1,
    song_id: 1
  },
  {
    set_id: 1,
    song_id: 2
  },
  {
    set_id: 2,
    song_id: 1
  },
  {
    set_id: 2,
    song_id: 3
  }
];

const sets_gigs = [
  {
    gig_id: 1,
    set_id: 1
  },
  {
    gig_id: 1,
    set_id: 2
  }
];

const maliciousUserSeed = {
  id: 3,
  user_name: 'Naughty <script>alert("xss");</script>',
  password: '$2a$05$/Hd9nJoDNJIpvEA9GFbN4eyjRyo3rqmNFR0Z9o5eG7oIq5XCUBOhS'
};

const maliciousSongSeed = {
  id: 3,
  song_title: 'Naughty <script>alert("xss");</script>',
  composer: 'Naughty <script>alert("xss");</script>',
  arranger: 'Naughty <script>alert("xss");</script>',
  description: 'Naughty <script>alert("xss");</script>',
  user_id: 1
};

const maliciousSetSeed = {
  id: 3,
  set_name: 'Naughty <script>alert("xss");</script>',
  description: 'Naughty <script>alert("xss");</script>',
  user_id: 1
};

const maliciousGigSeed = {
  id: 3,
  set_name: 'Naughty <script>alert("xss");</script>',
  description: 'Naughty <script>alert("xss");</script>',
  user_id: 1
};

/*
|--------------------------------------------------------------------------
| Client-side submission data
|--------------------------------------------------------------------------
*/
const safeUser = {
  request: {
    user_name: 'newUser',
    password: 'admin'
  },

  result: {
    user_name: 'newUser'
  }
};

const maliciousUser = {
  malRequest: {
    user_name: 'Naughty <script>alert("xss");</script>',
    password: 'Naughty <script>alert("xss");</script>'
  },

  malResult: {
    user_name: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;'
  }
};

const safeSong = {
  request: {
    song_title: 'Good Song',
    composer: 'newComp',
    arranger: 'newArr',
    description: 'newDesc'
  },

  postResult: {
    id: 4,
    song_title: 'Good Song',
    composer: 'newComp',
    arranger: 'newArr',
    description: 'newDesc'
  },

  patchResult: {
    id: 1,
    song_title: 'Good Song',
    composer: 'newComp',
    arranger: 'newArr',
    description: 'newDesc'
  }
};

const maliciousSong = {
  malRequest: {
    song_title: 'Naughty <script>alert("xss");</script>',
    composer: 'Naughty <script>alert("xss");</script>',
    arranger: 'Naughty <script>alert("xss");</script>',
    description: 'Naughty <script>alert("xss");</script>'
  },

  malPostResult: {
    id: 4,
    song_title: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    composer: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    arranger: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    description: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;'
  },

  malPatchResult: {
    id: 1,
    song_title: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    composer: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    arranger: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    description: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;'
  }
};

const safeSet = {
  request: {
    set_name: 'Good Set',
    description: 'newDesc'
  },

  postResult: {
    id: 4,
    set_name: 'Good Set',
    description: 'newDesc',
    songs: []
  },

  patchResult: {
    id: 1,
    set_name: 'Good Set',
    description: 'newDesc',
    songs: []
  }
};

const maliciousSet = {
  malRequest: {
    set_name: 'Naughty <script>alert("xss");</script>',
    description: 'Naughty <script>alert("xss");</script>'
  },

  malPostResult: {
    id: 4,
    set_name: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    description: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    songs: []
  },

  malPatchResult: {
    id: 1,
    set_name: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    description: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    songs: []
  }
};

const safeGig = {
  request: {
    id: 3,
    venue: 'Venue 3',
    gig_date: '2020-03-02',
    start_time: '19:00:00',
    end_time: '21:00:00'
  },

  postResult: {
    id: 3,
    venue: 'Venue 3',
    gig_date: '2020-03-02T07:00:00.000Z',
    start_time: '19:00:00',
    end_time: '21:00:00',
    sets: []
  },

  patchResult: {
    id: 1,
    venue: 'Venue 3',
    gig_date: '2020-03-02T07:00:00.000Z',
    start_time: '19:00:00',
    end_time: '21:00:00',
    sets: []
  }
};

const maliciousGig = {
  malRequest: {
    id: 3,
    venue: 'Naughty <script>alert("xss");</script>',
    gig_date: '2020-03-02',
    start_time: '19:00:00',
    end_time: '21:00:00'
  },

  malPostResult: {
    id: 3,
    venue: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    gig_date: '2020-03-02T07:00:00.000Z',
    start_time: '19:00:00',
    end_time: '21:00:00',
    sets: []
  },

  malPatchResult: {
    id: 1,
    venue: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    gig_date: '2020-03-02T07:00:00.000Z',
    start_time: '19:00:00',
    end_time: '21:00:00',
    sets: []
  }
};

const newSongSet = {
  song_id: 1,
  set_id: 3
};

const newSetGig = {
  gig_id: 2,
  set_id: 1
};

/*
|--------------------------------------------------------------------------
| Helper functions
|--------------------------------------------------------------------------
*/
const cleanTables = (db) => {
  return db.raw(
    `TRUNCATE sets_gigs, songs_sets, gigs, sets, songs, users RESTART IDENTITY CASCADE;`
  );
};

const getSeedData = () => ({ users, songs, sets, gigs, songs_sets, sets_gigs });
const getExpectedData = () => ({ expectedSongs, expectedSets, expectedGigs });
const seedTable = (db, table, data) => db(table).insert(data);
const seedUsers = (db) => db(USERS_TABLE).insert(users);
const seedAllTables = async (db) => {
  await db(USERS_TABLE).insert(users);
  await db(SONGS_TABLE).insert(songs);
  await db(SETS_TABLE).insert(sets);
  await db(GIGS_TABLE).insert(gigs);
  await db(SONGS_SETS_TABLE).insert(songs_sets);
  await db(SETS_GIGS_TABLE).insert(sets_gigs);
};

const getMaliciousSeedData = () => ({
  maliciousUserSeed,
  maliciousSongSeed,
  maliciousSetSeed,
  maliciousGigSeed
});
const seedMaliciousTable = (db, table, data) => db(table).insert(data);
const seedAllMaliciousTables = async (db) => {
  await db(USERS_TABLE).insert(users);
  await db(SONGS_TABLE).insert(songs);
  await db(SETS_TABLE).insert(sets);
  await db(SONGS_SETS_TABLE).insert(songs_sets);
};

const getClientSubmissions = () => ({
  safeUser,
  safeSong,
  safeSet,
  safeGig,
  newSongSet,
  newSetGig
});
const getMaliciousSubmissions = () => ({
  maliciousUser,
  maliciousSong,
  maliciousSet,
  maliciousGig
});

const createFetchBody = (table) => {
  let safeReq;
  let maliciousReq;

  switch (table) {
    case USERS_TABLE:
      safeReq = safeUser.request;
      maliciousReq = maliciousUser.request;
      break;

    case SONGS_TABLE:
      safeReq = safeSong.request;
      maliciousReq = maliciousSong.request;
      break;

    case SETS_TABLE:
      safeReq = safeSet.request;
      maliciousReq = maliciousSet.request;
      break;

    case GIGS_TABLE:
      safeReq = safeGig.request;
      maliciousReq = maliciousGig.request;
      break;

    case SONGS_SETS_TABLE:
      safeReq = newSongSet;
      break;

    case SETS_GIGS_TABLE:
      safeReq = newSetGig;
      break;

    default:
      break;
  }

  const body = { safeReq, maliciousReq };
  return body;
};

module.exports = {
  JWT,

  USER_NAME_PASS,

  cleanTables,
  getSeedData,
  getExpectedData,
  seedTable,
  seedUsers,
  seedAllTables,

  getMaliciousSeedData,
  seedMaliciousTable,
  seedAllMaliciousTables,

  getClientSubmissions,
  getMaliciousSubmissions,

  createFetchBody
};

const { CRUDService, SerializeService } = require('../../src/services');
const { SONGS_TABLE } = require('../../src/constants/table.constants');
const {
  auth,
  validate,
  Router,
  jsonBodyParser
} = require('../../src/middlewares');

const songsRouter = Router();

songsRouter.use(jsonBodyParser, auth.requireAuth);

songsRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const songs = await CRUDService.getAllData(
        req.app.get('db'),
        SONGS_TABLE,
        res.user.id
      );

      if (songs.length === 0) {
        res.status(502).json([]);
        return;
      }

      res.status(200).json(SerializeService.serializeData(SONGS_TABLE, songs));
    } catch (error) {
      next(error);
    }
  })

  .post(validate.songBody, async (req, res, next) => {
    try {
      res.newSong.user_id = res.user.id;

      const [song] = await CRUDService.createEntry(
        req.app.get('db'),
        SONGS_TABLE,
        res.newSong
      );

      res.status(201).json(SerializeService.serializeSong(song));
    } catch (error) {
      next(error);
    }
  });

songsRouter
  .route('/:id')
  .all(async (req, res, next) => {
    try {
      const song = await CRUDService.getById(
        req.app.get('db'),
        SONGS_TABLE,
        req.params.id,
        res.user.id
      );

      if (!song) {
        res.status(404).json({ message: 'Data not found' });
        return;
      }

      res.song = song;
      next();
    } catch (error) {
      next(error);
    }
  })

  .get((_req, res) =>
    res.status(200).json(SerializeService.serializeSong(res.song))
  )

  .patch(validate.songBody, async (req, res) => {
    const [song] = await CRUDService.updateEntry(
      req.app.get('db'),
      SONGS_TABLE,
      res.song.id,
      res.user.id,
      res.newSong
    );

    res.status(201).json(SerializeService.serializeSong(song));
  })

  .delete(jsonBodyParser, async (req, res, next) => {
    try {
      await CRUDService.deleteById(req.app.get('db'), SONGS_TABLE, res.song.id);

      res.status(201).json({ message: `Successfully deleted` });
    } catch (error) {
      next(error);
    }
  });

module.exports = songsRouter;

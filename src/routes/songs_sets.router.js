const { CRUDService } = require('../../src/services');
const { SONGS_SETS_TABLE } = require('../../src/constants/table.constants');
const {
  auth,
  validate,
  Router,
  jsonBodyParser
} = require('../../src/middlewares');

const songsSetsRouter = Router();

const parseParams = (req, res, next) => {
  const [song_id, set_id] = req.params.id.split('-');

  if (!set_id)
    return res.status(400).json({
      error: `Missing IDs in request params`
    });

  res.song_id = song_id;
  res.set_id = set_id;
  return next();
};

songsSetsRouter.use(jsonBodyParser, auth.requireAuth);

songsSetsRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const linkages = await CRUDService.getAllLinks(
        req.app.get('db'),
        SONGS_SETS_TABLE
      );
      res.status(200).json(linkages);
    } catch (error) {
      next(error);
    }
  })

  .post(validate.songSetBody, async (req, res, next) => {
    try {
      const [linkage] = await CRUDService.createEntry(
        req.app.get('db'),
        SONGS_SETS_TABLE,
        res.newLinkage
      );
      res.status(201).json({ linkage });
    } catch (error) {
      next(error);
    }
  });

songsSetsRouter.route('/:id').delete(parseParams, async (req, res, next) => {
  try {
    await CRUDService.deleteSSLink(req.app.get('db'), res.song_id, res.set_id);
    res.status(201).json({ message: 'Linkage deleted!' });
  } catch (error) {
    next(error);
  }
});

module.exports = songsSetsRouter;

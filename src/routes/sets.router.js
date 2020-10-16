const { SETS_TABLE } = require('../../src/constants/table.constants');
const {
  auth,
  validate,
  Router,
  jsonBodyParser
} = require('../../src/middlewares');
const {
  CRUDService,
  SerializeService,
  QueryService
} = require('../../src/services');

const setsRouter = Router();

setsRouter.use(jsonBodyParser, auth.requireAuth);

setsRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const emptySets = await CRUDService.getAllData(
        req.app.get('db'),
        SETS_TABLE,
        res.user.id
      );

      if (emptySets.length === 0) {
        res.status(502).json([]);
        return;
      }

      const fullSets = await Promise.all(
        emptySets.map(async (set) => {
          set.songs = await QueryService.getSetSongTitles(
            req.app.get('db'),
            set.id
          );
          return set;
        })
      );

      res.json(SerializeService.serializeData(SETS_TABLE, fullSets));
    } catch (error) {
      next(error);
    }
  })

  .post(validate.setBody, async (req, res, next) => {
    try {
      res.newSet.user_id = res.user.id;

      const set = await CRUDService.createEntry(
        req.app.get('db'),
        SETS_TABLE,
        res.newSet
      );

      res.status(201).json(SerializeService.serializeSet(set));
    } catch (error) {
      next(error);
    }
  });

setsRouter
  .route('/:id')
  .all(async (req, res, next) => {
    try {
      const set = await CRUDService.getById(
        req.app.get('db'),
        SETS_TABLE,
        req.params.id,
        res.user.id
      );
      if (!set) return res.status(404).json({ message: 'Data not found' });

      set.songs = await QueryService.getSetSongTitles(req.app.get('db'), set.id);

      res.setList = set;
    } catch (error) {
      next(error);
    }

    return next();
  })

  .get((_req, res) =>
    res.status(200).json(SerializeService.serializeSet(res.setList))
  )

  .patch(validate.setBody, async (req, res) => {
    const [set] = await CRUDService.updateEntry(
      req.app.get('db'),
      SETS_TABLE,
      res.setList.id,
      res.user.id,
      res.newSet
    );

    res.status(201).json(SerializeService.serializeSet(set));
  })

  .delete(async (req, res) => {
    await CRUDService.deleteById(req.app.get('db'), SETS_TABLE, res.setList.id);

    res.status(201).json({ message: `Successfully deleted` });
  });

module.exports = setsRouter;

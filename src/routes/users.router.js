const { CRUDService } = require('../../src/services');
const { USERS_TABLE } = require('../../src/constants/table.constants');
const {
  auth,
  validate,
  Router,
  jsonBodyParser
} = require('../../src/middlewares');

const userRouter = Router();

const getUserMiddleware = async (req, res, next) => {
  try {
    const dbUser = await CRUDService.getByName(
      req.app.get('db'),
      res.loginUser.user_name
    );

    if (!dbUser) {
      return res.status(400).json({ error: `Incorrect 'User Name'` });
    }

    res.dbUser = dbUser;
  } catch (error) {
    next(error);
  }

  return next();
};

userRouter.use(jsonBodyParser);

userRouter
  .route('/login')
  .get(auth.requireAuth, (_req, res) =>
    res.status(200).json({ username: res.user.user_name })
  )

  .post(validate.loginBody, getUserMiddleware, auth.passwordCheck);

userRouter
  .route('/register')
  .post(validate.loginBody, auth.hashPassword, async (req, res, next) => {
    try {
      const [newUser] = await CRUDService.createEntry(
        req.app.get('db'),
        USERS_TABLE,
        res.loginUser
      );

      const { user_name, id } = newUser;
      const token = auth.createJwtService(user_name, id);

      res.status(201).json({ authToken: token, user_name });
    } catch (error) {
      next(error);
    }
  });

userRouter.route('/delete').delete(auth.requireAuth, async (req, res, next) => {
  try {

    await CRUDService.deleteById(req.app.get('db'), USERS_TABLE, res.user.id);

    res.status(201).json({ message: `Successfully deleted` });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;

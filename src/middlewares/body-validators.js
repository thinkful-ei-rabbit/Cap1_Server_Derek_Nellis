const { SerializeService } = require('../services')

const ValidationMethods = {
  checkFields(object) {
    const fields = Object.entries(object);
    const keyError = fields.find(([key, value]) => value === undefined && key);
    return keyError;
  },

  errorResponse(res, keyError) {
    return res.status(400).json({
      error: `Missing '${keyError}' in request body`
    });
  }
};

const loginBody = (req, res, next) => {
  const { user_name, password } = req.body;
  const rawUser = { user_name, password };

  const keyError = ValidationMethods.checkFields(rawUser);
  if (keyError) return ValidationMethods.errorResponse(res, keyError);

  const loginUser = SerializeService.body.user(rawUser)

  res.loginUser = loginUser;
  return next();
};

const songBody = (req, res, next) => {
  const { song_title, composer, arranger, description, id } = req.body;
  const rawSong = { song_title, composer, arranger, description };

  const keyError = ValidationMethods.checkFields(rawSong);
  if (keyError) return ValidationMethods.errorResponse(res, keyError);

  const newSong = SerializeService.body.song(rawSong)

  if (id) newSong.id = id
  res.newSong = newSong;
  return next();
};

const songSetBody = (req, res, next) => {
  const { song_id, set_id } = req.body;
  const newLinkage = { song_id, set_id };

  const keyError = ValidationMethods.checkFields(newLinkage);
  if (keyError) return ValidationMethods.errorResponse(res, keyError);

  res.newLinkage = newLinkage;
  return next();
};

const setBody = (req, res, next) => {
  const { set_name, description, id } = req.body;
  const rawSet = { set_name, description };

  const keyError = ValidationMethods.checkFields(rawSet);
  if (keyError) return ValidationMethods.errorResponse(res, keyError);

  const newSet = SerializeService.body.set(rawSet)

  if (id) newSet.id = id
  res.newSet = newSet;
  return next();
};

// TODO - Feature request
const gigBody = (req, res, next) => {
  const { song_title, composer, arranger, id } = req.body;
  const rawGig = { song_title, composer, arranger };

  const keyError = ValidationMethods.checkFields(rawGig);
  if (keyError) return ValidationMethods.errorResponse(res, keyError);

  const newGig = SerializeService.body.gig(rawGig)

  if (id) newGig.id = id
  res.newGig = newGig;
  return next();
};

module.exports = {
  loginBody,
  songBody,
  setBody,
  songSetBody,
  gigBody
};

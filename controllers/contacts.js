// const fetch = (...args) =>
//   import('node-fetch').then(({ default: fetch }) => fetch(...args));

const { ctrlWrapper } = require('../helpers');
const deleteManyFiles = require('../utils/deleteManyFiles');
const sendEmail = require('../helpers/sendEmail');

const getAll = async (req, res) => {

  const currentTime = new Date();
  res.json(`Server time: ${currentTime}`);
};

const add = async (req, res) => {
  const { files, body } = req;

  const filePaths = files.map(({ path }) => path);

  const result = { ...body, multiple_files: filePaths };

  await sendEmail(result);

  await deleteManyFiles(filePaths);

  res.status(201).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
};

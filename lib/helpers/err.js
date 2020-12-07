const wrapError = (res, callback) => {
  try {
    callback().catch((e) => res.status(500).json({ message: e.message }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  wrapError,
};

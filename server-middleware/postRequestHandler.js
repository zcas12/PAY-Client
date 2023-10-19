
/*
module.exports = function (req, res, next) {
  let body = {};
  console.log(req)
  req.on('data', (data) => {
    console.log(data)
    body = data;
  });

  req.on('end', () => {
    req.body = body || {};
    next();
  });
};
*/

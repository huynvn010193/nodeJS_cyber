const checkEmpty = (req, res, next) => {
  const { name, price, amount, sale } = req.body;
  if(name && price && amount && sale) {
    next();
  } else {
    res.status(500).send("không được để trống name, price, amount, sale");
  }
}

const checkNumberPriceOrAmount = (req, res, next) => {
  const { price, amount } = req.body;
  const checkPrice = typeof price == 'number';
  const checkAmount = typeof amount == 'number';
  if(checkPrice && checkAmount) {
    next();
  } else {
    res.status(500).send("price hoặc amount phải là số");
  }
}

module.exports = {
  checkEmpty,
  checkNumberPriceOrAmount,
};
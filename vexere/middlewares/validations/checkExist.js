const { Station } = require('../../models');

const checkExist = (Model) => {
  return async (req, res, next) => {
    // Kiểm tra xem station có tồn tại hay ko.
    const { id } = req.params;
    const station = await Model.findOne({ 
      where: {
        id
      }
    });
    if(station) {
      next();
    } else {
      res.status(404).send(`không tìm thấy station có id là: ${id}`);
    }
  }
}

module.exports = {
  checkExist
}
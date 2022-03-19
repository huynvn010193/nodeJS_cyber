// upload file
const multer = require("multer");

const uploadImage = () => {
  const storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, "./public/images/avatars"); // setup chỗ cần lưu file
    },
    filename: function(req, file, cb){
      cb(null, Date.now() + "_" + file.originalname) // đặt lại tên cho file
    }
  });
  const upload = multer({ 
    storage: storage, 
    fileFilter: function(req, file, cb){
      const extensionImageList = [".png",".jpg"];
  
      // cắt 4 ký tự cuối chuỗi js.
      const extension = file.originalname.slice(-4);
  
      // Kiểm tra xem có nằm trong mảng hay không ?
      const check = extensionImageList.includes(extension);
      if(check) {
        cb(null, true);
      } else {
        cb(new Error('extension không hợp lệ'));
      }
  
      // Còn trường hợp kiểm tra dung lượng file up lên
    },
  });

  return upload.single('avatar');
}

module.exports = {
  uploadImage
}


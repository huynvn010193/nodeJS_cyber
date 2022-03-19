function callbackFunction(errors, value) {
  if(errors) {
    console.log(errors);
    return new Error(errors);
  }

  // xử lý value
  console.log(value);
  return value;
}

callbackFunction({message: "Thiếu từ khoá"}, "./public");
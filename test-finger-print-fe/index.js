axios({
  method: "get",
  url: "http://localhost:3000/api/v1/test-finger-print",
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

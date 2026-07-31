const { default: axios } = require("axios");
require("dotenv").config();

const getAddressDetail = async (lat, long) => {
  let result;
  if ((lat, long)) {
    result = await axios
      .get(`${process.env.MAP_IR_URL}?lat=${lat}&lon=${lng}`, {
        headers: {
          "x-api-key": process.env.MAP_API_KEY,
        },
      })
      .then((res) => res.data);
  }
  return {
    province: result?.province,
    city: result?.city,
    district: result?.region ?? result?.district,
    address: result?.address,
  };
};
module.exports = {
  getAddressDetail,
};

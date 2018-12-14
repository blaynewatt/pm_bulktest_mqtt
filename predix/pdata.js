'use strict';

let pDataValue = {};

pDataValue.toPDataValue = (tagname,timestamp,value,quality,datatype,address) => {
  var pDataValueObject = {}; // createIntegerPDataValueObject(pDataValueObject);

  pDataValueObject.category = "REAL";
  pDataValueObject.datatype = datatype;
  pDataValueObject.name = tagname;
  pDataValueObject.timestamp = timestamp;
  pDataValueObject.value = value;
  pDataValueObject.quality = qualityHelper(quality);
  pDataValueObject.address = address;

  return pDataValueObject;
};

var qualityHelper = (quality) => {
  var qualityStr = "GOOD (0) ";

  return qualityStr;
};


module.exports = pDataValue;

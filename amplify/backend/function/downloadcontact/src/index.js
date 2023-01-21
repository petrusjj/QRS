/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

var vCardsJS = require("vcards-js");

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  // create a new vCard
  var vCard = vCardsJS();

  // set properties
  vCard.firstName = "Eric";
  vCard.middleName = "J";
  vCard.lastName = "Nesser";
  vCard.organization = "ACME Corporation";
  vCard.photo.attachFromUrl(
    "https://avatars2.githubusercontent.com/u/5659221?v=3&s=460",
    "JPEG"
  );
  vCard.workPhone = "312-555-1212";
  vCard.birthday = new Date(1985, 0, 1);
  vCard.title = "Software Developer";
  vCard.url = "https://github.com/enesser";
  vCard.note = "Notes on Eric";

  // get as formatted string
  const string = vCard.getFormattedString();

  console.log(string);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": 'text/vcard; name="enesser.vcf"',
      "Content-Disposition": 'inline; filename="enesser.vcf"',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: string,
  };
};

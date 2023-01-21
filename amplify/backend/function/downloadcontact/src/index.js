/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

var vCardsJS = require("vcards-js");

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  // create a new vCard
  var vCard = vCardsJS();

  // set properties
  vCard.firstName = "Petrus";
  vCard.middleName = "van";
  vCard.lastName = "Egeraat";
  vCard.organization = "Pyypl";
  vCard.photo.attachFromUrl(
    "https://avatars2.githubusercontent.com/u/876576?v=3&s=460",
    "JPEG"
  );
  vCard.workPhone = "+971 54 496 5771";
  vCard.birthday = new Date(1992, 11, 4);
  vCard.title = "Software Engineer";
  vCard.url = "https://www.linkedin.com/in/petervanegeraat/";
  vCard.note = "Notes on Petrus";

  // get as formatted string
  const string = vCard.getFormattedString();

  console.log(string);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": 'text/vcard; name="petrus.vcf"',
      "Content-Disposition": 'inline; filename="petrus.vcf"',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: string,
  };
};

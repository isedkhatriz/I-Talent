const { validationResult } = require("express-validator");
const _ = require("lodash");
const prisma = require("../../../database");

async function getLocations(request, response) {
  try {
    validationResult(request).throw();

    const { language } = request.query;

    const locationsQuery = await prisma.opTransOfficeLocation.findMany({
      where: {
        language,
      },
      select: {
        streetName: true,
        province: true,
        opOfficeLocation: {
          select: {
            id: true,
            streetNumber: true,
            city: true,
          },
        },
      },
      orderBy: {
        province: "asc",
      },
    });

    const locations = _.orderBy(
      locationsQuery.map((i) => {
        const { streetName, province } = i;
        const { id, city, streetNumber } = i.opOfficeLocation;

        return {
          id,
          streetNumber,
          streetName,
          city,
          province,
        };
      }),
      ["province", "city", "streetNumber", "streetName"]
    );

    response.status(200).json(locations);
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error fetching location options");
  }
}

module.exports = {
  getLocations,
};

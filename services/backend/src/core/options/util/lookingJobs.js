const { validationResult } = require("express-validator");
const prisma = require("../../../database");

async function getLookingJobs(request, response) {
  try {
    validationResult(request).throw();

    const { language } = request.query;

    const lookingJobsQuery = await prisma.opTransLookingJob.findMany({
      where: {
        language,
      },
      select: {
        opLookingJobId: true,
        description: true,
      },
      orderBy: {
        description: "asc",
      },
    });

    const lookingJobs = lookingJobsQuery.map((i) => ({
      id: i.opLookingJobId,
      description: i.description,
    }));

    response.status(200).json(lookingJobs);
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error fetching lookinJob options");
  }
}

module.exports = {
  getLookingJobs,
};

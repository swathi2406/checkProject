const Project = require("../models/project");
const User = require("../models/user");
const similarity = require("string-cosine-similarity");

exports.createProject = (req, res) => {
  // console.log(req);
  const project = new Project(req.body);
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  project.leader = req.profile;
  project.completion_percentage = 0;
  project.team.push(req.profile._id);
  project.tasks.push({
    id: "1",
    key: "start",
    type: "input",
    taskName: "Lets Start Working",
    taskDescription: "Start working on tasks to complete project on time",
    pessimisticTime: 0,
    mostLikelyTime: 0,
    optimisticTime: 0,
    predecessors: [],
    sourcePosition: "right",
    position: { x: 0, y: 0 },
  });
  project.tasks.push({
    id: "2",
    key: "end",
    type: "output",
    taskName: "Completed!!",
    taskDescription: "Yaaayy you gus have completed the project",
    pessimisticTime: 0,
    mostLikelyTime: 0,
    optimisticTime: 0,
    predecessors: [],
    targetPosition: "left",
    position: { x: 500, y: 0 },
  });
  // project.created = new Date();
  console.log(project.leader._id);
  project.save((err, result) => {
    if (err) return res.status(400).json({ error: err });
    User.findById(project.leader._id).exec(async (err, user) => {
      if (err || !user) return;
      user.projects.push(project._id);
      user.save();
      await updateUserCompletion(user);
    });
  });
  return res.status(200).json({ project });
};

exports.getProject = (req, res) => {
  // console.log(req.projectObject);
  if (req.projectObject !== undefined) {
    return res.status(200).json({ project: req.projectObject });
  } else {
    return res.status(400).json({ error: "Project not found" });
  }
};
function userIsPresent(requestBy, userId) {
  for (let i = 0; i < requestBy.length; i++) {
    if (userId.toString() === requestBy[i].toString()) {
      return true;
    }
  }
  return false;
}

exports.checkIfProjectExists = async (req, res) => {
  final_out = [];
  try {
    var string1 = req.query["X"].toString();
    var string2 = req.query["X1"].toString();
    // console.log(string1, string2);
    // var string1 = "A";
    // var string2 = "A";
    // console.log(req);
    var f = 0,
      sim = 0;
    await Project.find(function (error, result) {
      for (i = 0; i < result.length; i++) {
        out = {};
        var str1 = result[i].title;
        var str2 = result[i].description;

        var sim1 = similarity(string1, str1) * 100;
        var sim2 = similarity(string2, str2) * 100;

        if (isNaN(sim1)) sim1 = 0;
        if (isNaN(sim2)) sim2 = 0;
        sim1 = sim1 * 0.1;
        sim2 = sim2 * 0.9;
        sim = sim1 + sim2;
        if (isNaN(sim)) sim = 0;
        // console.log(
        //   "Similar project found with similarity :",
        //   sim,
        //   " title : ",
        //   str1,
        //   " Description : ",
        //   str2,
        //   "Sim1:",
        //   sim1 / 0.1,
        //   "Sim2:",
        //   sim2 / 0.9
        // );
        if (sim > 40) {
          out["title"] = str1;
          out["description"] = str2;
          out["similarity"] = sim;
          out["title_sim"] = sim1 / 0.1;
          out["desc_sim"] = sim2 / 0.9;
          f = 1;
          final_out.push(out);
        }
      }
    });
    if (f !== 1) {
      // console.log("New Project Can be Added");
      // await Proj.create({ title: string1, description: string2 });
      // console.log("can be added");
      return res.status(200).json({ message: "Can be added!" });
    }
    // console.log("can be added");
    return res
      .status(200)
      .json({ data: final_out, message: "Similar Values Exist" });
  } catch (err) {
    if (err !== undefined) {
      console.log(err);
      return res.status(400).json({ err: err.toString() });
    }
  }
};

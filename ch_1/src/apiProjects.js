export const newProject = (project) => {
  let userId = JSON.parse(localStorage.getItem("jwt")).user._id;
  let token = JSON.parse(localStorage.getItem("jwt")).token;
  let obj = {
    title: project.title,
    description: project.description,
    skills: project.skills,
    roles: project.roleDetails,
  };
  let checkSettings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(
    `http://localhost:8081/project/check/?X=${obj.title}&X1=${obj.description}`,
    checkSettings
  )
    .then((response) => {
      // let val = response.json();
      // console.log(val);
      return response.json();
    })
    .then((val) => {
      // console.log(val);
      if (val.message === "Can be added!") {
        let settings = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(obj),
        };
        // console.log(settings.body);
        return fetch(`http://localhost:8081/project/new/${userId}`, settings)
          .then((response) => {
            // console.log(Promise.resolve(response));
            return response.json();
          })
          .then((val) => {
            console.log(val);
            return val;
          })
          .catch((err) => console.log(err));
      } else {
        return { error: val.message, similar: val.data };
      }
    });
  // console.log(response.json());
  // return response.json();
};

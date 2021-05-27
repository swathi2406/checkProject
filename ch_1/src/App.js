import React, { Component } from "react";
import "./App.css";
import { newProject } from "./apiProjects";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      error: "",
      open: false,
    };
  }

  handleChange = (proj) => (event) => {
    this.setState({ error: "" });
    this.setState({ [proj]: event.target.value });
  };
  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    let { title, description, skills, roleDetails } = this.state;
    let project = {
      title,
      description,
      skills,
      roleDetails,
    };
    // newProject(project);
    try {
      newProject(project).then((data) => {
        if (data === undefined) return;
        if (data.error) {
          if (data.similar) {
            this.setState({ similar: data.similar });
            console.log(this.state.similar);
          }
          this.setState({ error: data.error });
        } else
          this.setState({
            title: "",
            description: "",
            skills: [""],
            roleDetails: [
              {
                index: Math.random(),
                roleName: "",
                roleSkills: [],
              },
            ],
            error: "",
            open: true,
          });
      });
    } catch (err) {
      console.log(err);
    }
    // console.log(project);
  };

  render() {
    let { error, title, description, skills, roleDetails, open } = this.state;
    return (
      <>
        <div className="App">
          <div className=" container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
            <div className="d-flex align-items-center flex-wrap mr-2">
              <h5 className="text-dark font-weight-bold mt-2 mb-2 mr-5">
                Create Project
              </h5>
              <div className="subheader-separator subheader-separator-ver mt-2 mb-2 mr-4 bg-gray-200"></div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <h2>Let's Start a New Project</h2>
                <p className="text-muted">
                  Fill in the form with all the necessary details to register
                  the project.
                </p>
              </div>
            </div>
            <div className="card-body">
              <form className="mt-5">
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-10 offset-1">
                      <label>
                        <big>Title of your Project</big>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={title}
                        onChange={this.handleChange("title")}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-10 offset-1">
                      <label>
                        <big>Description of the Project</big>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={description}
                        onChange={this.handleChange("description")}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <button
                      onClick={this.clickSubmit}
                      className="btn btn-raised btn-primary mx-auto mt-3 mb-2 col-sm-3"
                    >
                      Create Project!
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;

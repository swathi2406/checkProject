import React, { Component } from "react";

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      open: false,
    };
  }

  render() {
    return (
      <div>
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
                  //         value={title}
                  //         onChange={this.handleChange("title")}
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
                  //         value={description}
                  //         onChange={this.handleChange("description")}
                />
              </div>
            </div>
            <div className="row">
              <button
                //     onClick={this.clickSubmit}
                className="btn btn-raised btn-primary mx-auto mt-3 mb-2 col-sm-3"
              >
                Create Project!
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default CreateProject;

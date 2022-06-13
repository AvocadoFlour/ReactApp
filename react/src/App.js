import React, { Component, useState } from 'react';
import { ClientTableRow, CreateClientForm, FetchClients } from './Clients/Clients.js';
import { ProjectTableRow, CreateProjectForm, FetchProjects } from './Projects/Projects.js';

import 'bootstrap/dist/css/bootstrap.min.css';

const CLIENTS_API_URL = 'api/clients'
const PROJECTS_API_URL = 'api/projects'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      clients: [],
      aClientIsEdited: false,
      editedClientId: null,
      projects: [],
      aProjectIsEdited: false,
      editedProjectId: null,
      clientsAreShown: true
    };
  }

  async componentDidMount() {

    this.setState({
      clients: await FetchClients()
    });

    this.setState({
      projects: await FetchProjects(),
      isLoaded: true,
    });

  }

  handleFieldChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  create() {
    fetch(CLIENTS_API_URL, {
      "method": "POST",
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify({
        name: this.state["clientName"],
        country: this.state["clientCountry"],
        city: this.state["clientCity"],
        streetName: this.state["clientStreetName"],
        streetNumber: this.state["clientStreetNumber"],
        zip: this.state["clientZip"],
      })
    });
  }

  async update(client) {
    if (this.state.aClientIsEdited) {
      this.setState(
        {
          aClientIsEdited: false,
          editedClientId: null,
        }
      );

      // updating the array from which clients are rendered
      const newClients = [...this.state.clients]
      const updatedClientIndex = this.state.clients.findIndex((c) => c.id === client.id);
      newClients[updatedClientIndex] = client;
      this.setState({
        clients: newClients,
      });

      // API update
      fetch(CLIENTS_API_URL, {
        "method": "PATCH",
        "headers": {
          "content-type": "application/json"
        },
        "body": JSON.stringify({
          id: client.id,
          name: client.name,
          country: client.country,
          city: client.city,
          streetName: client.streetName,
          streetNumber: client.streetNumber,
          zip: client.zip
        })
      }).then((r) => r.json())
        .then((result) =>
          alert(JSON.stringify(result)));
    } else {
      this.setState(
        {
          aClientIsEdited: true,
          editedClientId: client.id,
        }
      );
    }

  }

  async updateProject(project) {
    if (this.state.aProjectIsEdited) {
      this.setState(
        {
          aProjectIsEdited: false,
          editedProjectId: null,
        }
      );

      // updating the array from which project are rendered
      const newProjects = [...this.state.projects]
      const updatedProjectIndex = this.state.projects.findIndex((c) => c.id === project.id);
      newProjects[updatedProjectIndex] = project;
      this.setState({
        projects: newProjects,
      });

      // API update
      fetch(PROJECTS_API_URL, {
        "method": "PATCH",
        "headers": {
          "content-type": "application/json"
        },
        "body": JSON.stringify({
          id: project.id,
          name: project.name,
          clientId: project.clientId,
          projectManager: project.projectManager,
          email: project.email,
          contactNumber: project.contactNumber,
          billingAddress: project.billingAddress
        })
      }).then((r) => r.json())
        .then((result) =>
          alert(JSON.stringify(result)));
    } else {
      this.setState(
        {
          aProjectIsEdited: true,
          editedProjectId: project.id,
        }
      );
    }

  }

  delete(e) {
    if (e === undefined) {
      this.setState({
        aClientIsEdited: false,
        editedClientId: null
      })
    } else {
      // updating the array from which clients are rendered
      const newClients = [...this.state.clients];
      const deletedClientIndex = this.state.clients.findIndex((c) => c.id === e.id);
      newClients.splice(deletedClientIndex, 1);
      this.setState({
        clients: newClients,
      });

      fetch(CLIENTS_API_URL + "/" + e.id, {
        "method": "DELETE"
      });
    }
  }

  deleteProject(e) {
    if (e === undefined) {
      this.setState({
        aProjectIsEdited: false,
        editedProjectId: null,
      })
    } else {
      // updating the array from which projects are rendered
      const newProjects = [...this.state.projects];
      const deletedProjectIndex = this.state.projects.findIndex((c) => c.id === e.id);
      newProjects.splice(deletedProjectIndex, 1);
      this.setState({
        projects: newProjects,
      });

      fetch(PROJECTS_API_URL + "/" + e.id, {
        "method": "DELETE"
      });
    }
  }

  render() {
    const { isLoaded } = this.state;
    const { aClientIsEdited } = this.state;
    const { editedClientId } = this.state;
    const { aProjectIsEdited } = this.state;
    const { editedProjectId } = this.state;
    const { clientsAreShown } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div class="grid-container">
            <div class="item1">
              Projects and clients management
            </div>
            <div class="item2">
              <div id="container">
                <button className='btn btn-light' style={{ height: "50px", width: "150px", fontSize: "20px" }} onClick={()=> this.setState({clientsAreShown: true})}>
                  Clients
                </button>
                <button className='btn btn-light' style={{ height: "50px", width: "150px", fontSize: "20px" }} onClick={()=> this.setState({clientsAreShown: false})}>
                  Project
                </button>
              </div>
            </div>
            <div class="item3">
              {!isLoaded && <p>Loading...</p>}

              {/* OVO JE UŽAS; POBOLJŠAJ */}
              {clientsAreShown
                ?
                <>
                  <table className="table table-striped table-bordered table-hover table-responsive">
                    <thead>
                      <tr>
                        <th scope="col"> Name </th>
                        <th scope="col"> Country </th>
                        <th scope="col"> City </th>
                        <th scope="col"> Street name </th>
                        <th scope="col"> Street number </th>
                        <th scope="col"> Zip </th>
                        <th colSpan="2"> Actions </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.clients.map((client) => (
                        <ClientTableRow key={client.id} aClientIsEdited={aClientIsEdited} editedClientId={editedClientId} client={client} updateAction={(e) => this.update(e)} deleteAction={(e) => this.delete(e)} />
                      ))}
                    </tbody>
                  </table>
                  <CreateClientForm value={null} onSubmit={() => this.create()} onChange={(e) => this.handleFieldChange(e)} />
                </>
                :
                <>
                  <table className="table table-striped table-bordered table-hover table-responsive">
                    <thead>
                      <tr>
                        <th scope="col"> Name </th>
                        <th scope="col"> Client </th>
                        <th scope="col"> Project manager </th>
                        <th scope="col"> Email </th>
                        <th scope="col"> Contact number </th>
                        <th scope="col"> Billing address </th>
                        <th colSpan="2"> Actions </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.projects.map((project) => (
                        <ProjectTableRow key={project.id} aProjectIsEdited={aProjectIsEdited} editedProjectId={editedProjectId} project={project} clients={this.clients} updateAction={(e) => this.updateProject(e)} deleteAction={(e) => this.deleteProject(e)} />
                      ))}
                    </tbody>
                  </table>
                  <CreateProjectForm value={null} onSubmit={() => this.create()} onChange={(e) => this.handleFieldChange(e)} /></>
              }
            </div>
          </div>



          {/* projekti su ispod */}


        </div>
      </div>
    );
  }
}

export default App;
import React, { useState } from 'react';

const PROJECTS_API_URL = 'api/projects'

function ProjectTableRowDetailsOverview(props) {
  return (
    <>
      <td>{props.project.name}</td>
      <td>{props.project.clientId}</td>
      <td>{props.project.projectManager}</td>
      <td>{props.project.email}</td>
      <td>{props.project.contactNumber}</td>
      <td>{props.project.billingAddress}</td>
      <td>
        <button className="btn btn-primary" type='button' onClick={() => props.onClickUpdate(props.project)}>
          Update
        </button>
      </td>
      <td>
        <button className="btn btn-primary" type='button' onClick={() => props.onClickDelete(props.project)}>
          Delete
        </button>
      </td>
    </>
  )
}

function ProjectTableRowDetailsUpdate(props) {

  const [editedProjectName, setEditedProjectName] = useState(props.project.name);
  const [editedProjectClient, setEditedProjectClient] = useState(props.project.clientId);
  const [editedProjectProjectManager, setEditedProjectProjectManager] = useState(props.project.projectManager);
  const [editedProjectEmail, setEditedProjectEmail] = useState(props.project.email);
  const [editedProjectContactNumber, setEditedProjectContactNumber] = useState(props.project.contactNumber);
  const [editedProjectBillingAddress, setEditedProjectBillingAddress] = useState(props.project.billingAddress);

  return (
    <>
      <td>
        <div
          className="input-enclosing-div">
          <input
            className="table-input"
            type="text"
            placeholder="Name"
            defaultValue={editedProjectName}
            onChange={(e) => setEditedProjectName(e.target.value)}
            name="editedProjectName" />
        </div>
      </td>
      <td>
        <div
          className="input-enclosing-div">
          <input
            className="table-input"
            type="text"
            placeholder="Client"
            defaultValue={editedProjectClient}
            onChange={(e) => setEditedProjectClient(e.target.value)}
            name="editedProjectCountry" />
        </div>
      </td>
      <td>
        <div
          className="input-enclosing-div">
          <input
            className="table-input"
            type="text"
            placeholder="Project manager"
            defaultValue={editedProjectProjectManager}
            onChange={(e) => setEditedProjectProjectManager(e.target.value)}
            name="editedProjectProjectManager" />
        </div>
      </td>
      <td>
        <div
          className="input-enclosing-div">
          <input
            className="table-input"
            type="text"
            placeholder="Email"
            defaultValue={editedProjectEmail}
            onChange={(e) => setEditedProjectEmail(e.target.value)}
            name="editedProjectEmail" />
        </div>
      </td>
      <td>
        <div
          className="input-enclosing-div">
          <input
            className="table-input"
            type="number"
            placeholder="Street number"
            defaultValue={editedProjectContactNumber}
            onChange={(e) => setEditedProjectContactNumber(e.target.value)}
            name="editedProjectContactNumber" />
        </div>
      </td>
      <td>
        <div
          className="input-enclosing-div">
          <input
            className="table-input"
            type="number"
            placeholder="Billing addres"
            defaultValue={editedProjectBillingAddress}
            onChange={(e) => setEditedProjectBillingAddress(e.target.value)}
            name="editedProjectBillingAddress" />
        </div>
      </td>
      <td>
        <button className="btn btn-danger" type='button' onClick={() => props.onClickUpdate({
          id: props.project.id,
          name: editedProjectName,
          clientId: editedProjectClient,
          projectManager: editedProjectProjectManager,
          email: editedProjectEmail,
          contactNumber: editedProjectContactNumber,
          billingAddress: editedProjectBillingAddress
        })}>
          Save
        </button>
      </td>
      <td>
        <button className="btn btn-warning" type="button" onClick={() => props.onClickDelete()}>
          Cancel
        </button>
      </td>
    </>
  )
}


export function ProjectTableRow(props) {

  let isRowBeingEdited = props.aProjectIsEdited && props.editedProjectId === props.project.id;

  return (
    <>
      <tr className={isRowBeingEdited ? "alert alert-warning" : ""}>
        {isRowBeingEdited ?
          <ProjectTableRowDetailsUpdate project={props.project} onClickUpdate={(e) => props.updateAction(e)} onClickDelete={(e) => props.deleteAction(e)} /> :
          <ProjectTableRowDetailsOverview project={props.project} onClickUpdate={(e) => props.updateAction(e)} onClickDelete={(e) => props.deleteAction(e)} />
        }
      </tr>
    </>
  );
}

export function CreateProjectForm(props) {
  return (
    <form className="form-inline" onSubmit={() => props.onSubmit()}>
      <input
        type="text"
        placeholder="Name"
        name="projectName"
        required="required"
        onChange={(e) => props.onChange(e)}
      />
      <input
        type="text"
        placeholder="Client"
        name="projectClient"
        required="required"
        onChange={(e) => props.onChange(e)}
      />
      <input
        type="text"
        placeholder="Project manager"
        name="projectProjectManager"
        required="required"
        onChange={(e) => props.onChange(e)}
      />
      <input
        type="text"
        placeholder="Email"
        name="projectEmail"
        required="required"
        onChange={(e) => props.onChange(e)}
      />
      <input
        type="number"
        placeholder="Contact number"
        name="projectContactNumber"
        required="required"
        onChange={(e) => props.onChange(e)}
      />
      <input
        type="number"
        placeholder="Billing address"
        name="projectBillingAddress"
        required="required"
        onChange={(e) => props.onChange(e)}
      />
      <button type="submit">
        Add
      </button>
    </form>
  )
}

export async function FetchProjects() {
  return fetch(PROJECTS_API_URL)
   .then(res => res.json());
}
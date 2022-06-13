import React, { useState } from 'react';

const CLIENTS_API_URL = 'api/clients'

function ClientTableRowDetailsOverview(props) {
  return (
    <>
      <td>{props.client.name}</td>
      <td>{props.client.country}</td>
      <td>{props.client.city}</td>
      <td>{props.client.streetName}</td>
      <td>{props.client.streetNumber}</td>
      <td>{props.client.zip}</td>
      <td>
        <button className="btn btn-primary" type='button' onClick={() => props.onClickUpdate(props.client)}>
          Update
        </button>
      </td>
      <td>
        <button className="btn btn-primary" type='button' onClick={() => props.onClickDelete(props.client)}>
          Delete
        </button>
      </td>
    </>
  )
}

function ClientTableRowDetailsUpdate(props) {

  const [editedClientName, setEditedClientName] = useState(props.client.name);
  const [editedClientCountry, setEditedClientCountry] = useState(props.client.country);
  const [editedClientCity, setEditedClientCity] = useState(props.client.city);
  const [editedClientStreetName, setEditedClientStreetName] = useState(props.client.streetName);
  const [editedClientStreetNumber, setEditedClientStreetNumber] = useState(props.client.streetNumber);
  const [editedClientZip, setEditedClientZip] = useState(props.client.zip);

  return (
    <>
      <td>
        <div
          className="input-enclosing-div">
          <input
            className="table-input"
            type="text"
            placeholder="Name"
            defaultValue={editedClientName}
            onChange={(e) => setEditedClientName(e.target.value)}
            name="editedClientName" />
        </div>
      </td>
      <td>
        <div
          className="input-enclosing-div">
          <input
            className="table-input"
            type="text"
            placeholder="Country"
            defaultValue={editedClientCountry}
            onChange={(e) => setEditedClientCountry(e.target.value)}
            name="editedClientCountry" />
        </div>
      </td>
      <td>
        <div
          className="input-enclosing-div">
          <input
            className="table-input"
            type="text"
            placeholder="City"
            defaultValue={editedClientCity}
            onChange={(e) => setEditedClientCity(e.target.value)}
            name="editedClientCity" />
        </div>
      </td>
      <td>
        <div
          className="input-enclosing-div">
          <input
            className="table-input"
            type="text"
            placeholder="Street name"
            defaultValue={editedClientStreetName}
            onChange={(e) => setEditedClientStreetName(e.target.value)}
            name="editedClientStreetName" />
        </div>
      </td>
      <td>
        <div
          className="input-enclosing-div">
          <input
            className="table-input"
            type="number"
            placeholder="Street number"
            defaultValue={editedClientStreetNumber}
            onChange={(e) => setEditedClientStreetNumber(e.target.value)}
            name="editedClientStreetNumber" />
        </div>
      </td>
      <td>
        <div
          className="input-enclosing-div">
          <input
            className="table-input"
            type="number"
            placeholder="Zip"
            defaultValue={editedClientZip}
            onChange={(e) => setEditedClientZip(e.target.value)}
            name="editedClientZip" />
        </div>
      </td>
      <td>
        <button className="btn btn-danger" type='button' onClick={() => props.onClickUpdate({
          id: props.client.id,
          name: editedClientName,
          country: editedClientCountry,
          city: editedClientCity,
          streetName: editedClientStreetName,
          streetNumber: editedClientStreetNumber,
          zip: editedClientZip
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

export function ClientTableRow(props) {

  let isRowBeingEdited = props.aClientIsEdited && props.editedClientId === props.client.id;

  return (
    <>
      <tr className={isRowBeingEdited ? "alert alert-warning" : ""}>
        {isRowBeingEdited ?
          <ClientTableRowDetailsUpdate client={props.client} onClickUpdate={(e) => props.updateAction(e)} onClickDelete={(e) => props.deleteAction(e)} /> :
          <ClientTableRowDetailsOverview client={props.client} onClickUpdate={(e) => props.updateAction(e)} onClickDelete={(e) => props.deleteAction(e)} />
        }
      </tr>
    </>
  );
}

export function CreateClientForm(props) {
  return (
    <form className="form-inline" onSubmit={() => props.onSubmit()}>
      <input
        type="text"
        placeholder="Name"
        name="clientName"
        required="required"
        onChange={(e) => props.onChange(e)}
      />
      <input
        type="text"
        placeholder="Country"
        name="clientCountry"
        required="required"
        onChange={(e) => props.onChange(e)}
      />
      <input
        type="text"
        placeholder="City"
        name="clientCity"
        required="required"
        onChange={(e) => props.onChange(e)}
      />
      <input
        type="text"
        placeholder="Street name"
        name="clientStreetName"
        required="required"
        onChange={(e) => props.onChange(e)}
      />
      <input
        type="number"
        placeholder="Street number"
        name="clientStreetNumber"
        required="required"
        onChange={(e) => props.onChange(e)}
      />
      <input
        type="number"
        placeholder="Zip"
        name="clientZip"
        required="required"
        onChange={(e) => props.onChange(e)}
      />
      <button type="submit">
        Add
      </button>
    </form>
  )
}

export async function FetchClients() {
  return fetch(CLIENTS_API_URL)
    .then(res => res.json());
}

export function ClientsTable() {
  const [aClientIsEdited, setAClientIsEdited] = useState(false);
  const [editedClientId, setEditedClientId] = useState(-1);
  const [clients, setClients] = useState(null);



  return (
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
  )
}
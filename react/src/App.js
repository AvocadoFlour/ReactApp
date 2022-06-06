import React, { Component, useState } from 'react';
import './index.css';

const API_URL = 'api/clients'

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
        <button className="btn btn-primary" type='button' onClick={() => props.onClick(props.client)}>
          Update
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
        <input placeholder="Name"
          defaultValue={editedClientName}
          onChange={(e) => setEditedClientName(e.target.value)}
          name="editedClientName" />
      </td>
      <td>
        <input
          placeholder="Country"
          defaultValue={editedClientCountry}
          onChange={(e) => setEditedClientCountry(e.target.value)}
          name="editedClientCountry" />
      </td>
      <td>
        <input
          placeholder="City"
          defaultValue={editedClientCity}
          onChange={(e) => setEditedClientCity(e.target.value)}
          name="editedClientCity" />
      </td>
      <td>
        <input placeholder="Street name"
          defaultValue={editedClientStreetName}
          onChange={(e) => setEditedClientStreetName(e.target.value)}
          name="editedClientStreetName" />
      </td>
      <td>
        <input placeholder="Street number"
          defaultValue={editedClientStreetNumber}
          onChange={(e) => setEditedClientStreetNumber(e.target.value)}
          name="editedClientStreetNumber" />
      </td>
      <td>
        <input
          placeholder="Zip"
          defaultValue={editedClientZip}
          onChange={(e) => setEditedClientZip(e.target.value)}
          name="editedClientZip" />
      </td>
      <td>
        <button className="btn btn-warning" type='button' onClick={() => props.onClick({
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
    </>
  )
}

function ClientTableRow(props) {

  let isRowBeingEdited = props.aClientIsEdited && props.editedClientId === props.client.id;

  return (
    <>
      {isRowBeingEdited ?
        <ClientTableRowDetailsUpdate client={props.client} onClick={(e) => props.updateAction(e)} /> :
        <ClientTableRowDetailsOverview client={props.client} onClick={(e) => props.updateAction(e)} />
      }

      <td>
        <button className="btn btn-primary" type='button' onClick={() => props.deleteAction(props.client.id)}>
          Delete
        </button>
      </td>
    </>
  );
}

function CreateClientForm(props) {
  return (
    <form onSubmit={() => props.onSubmit()}>
      <input
        placeholder="Name"
        name="clientName"
        required="required"
        onChange={(e) => props.onChange(e)}
      />
      <input
        placeholder="Country"
        name="clientCountry"
        required="required"
        onChange={(e) => props.onChange(e)}
      />
      <input
        placeholder="City"
        name="clientCity"
        required="required"
        onChange={(e) => props.onChange(e)}
      />
      <input
        placeholder="Street name"
        name="clientStreetName"
        required="required"
        onChange={(e) => props.onChange(e)}
      />
      <input
        placeholder="Street number"
        name="clientStreetNumber"
        required="required"
        onChange={(e) => props.onChange(e)}
      />
      <input
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

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      clients: [],
      aClientIsEdited: false,
      editedClientId: null
    };
  }

  async componentDidMount() {
    fetch(API_URL)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            clients: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleFieldChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  create() {
    fetch(API_URL, {
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

  update(client) {
    if (this.state.aClientIsEdited) {
      this.setState(
        {
          aClientIsEdited: false,
          editedClientId: null,
        }
      );
      fetch(API_URL, {
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
      });
    } else {
      this.setState(
        {
          aClientIsEdited: true,
          editedClientId: client.id,
        }
      );
    }

  }

  delete(e) {
    fetch(API_URL + "/" + e, {
      "method": "DELETE"
    });
  }

  render() {
    const { isLoaded } = this.state;
    const { aClientIsEdited } = this.state;
    const { editedClientId } = this.state;
    return (
      <div>
        {!isLoaded && <p>Loading...</p>}
        <table>
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
              <tr key={client.id}>
                <ClientTableRow aClientIsEdited={aClientIsEdited} editedClientId={editedClientId} client={client} updateAction={(e) => this.update(e)} deleteAction={(e) => this.delete(e)} />
              </tr>
            ))}
          </tbody>
        </table>
        <CreateClientForm value={null} onSubmit={() => this.create()} onChange={(e) => this.handleFieldChange(e)} />
      </div>
    );
  }
}

export default App;
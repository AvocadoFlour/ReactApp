package luminum.springBackend.controllers;

import java.util.List;

import luminum.springBackend.database.ClientRepository;
import luminum.springBackend.entities.Client;
import luminum.springBackend.entities.DTO.ClientDTO;
import luminum.springBackend.exceptions.ClientNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class ClientController {

    private final ClientRepository repository;

    ClientController(ClientRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/clients")
    List<Client> all() {
        return repository.findAll();
    }

    @RequestMapping(value = "/client/{id}", method = RequestMethod.GET)
    Client single(@PathVariable("id") Long id) {
        return repository.findById(id).orElseThrow(() -> new ClientNotFoundException(id));
    }

    @PostMapping("/clients")
    ClientDTO create(@RequestBody ClientDTO newClientDTO) {
        Client newClient = getClientFromDTO(newClientDTO);
        return getClientDTO(repository.save(newClient));
    }

    @PatchMapping("/clients")
    ClientDTO update(@RequestBody ClientDTO clientDTO) {
        Client client = getClientFromDTO(clientDTO);
        return getClientDTO(repository.save(client));
    }

    //delete DELETE
    @DeleteMapping("/clients/{id}")
    HttpStatus delete(@PathVariable("id") Long id) {
        repository.deleteById(id);
        return HttpStatus.OK;
    }

    /// Data manipulation
    private ClientDTO getClientDTO(Client client) {
        return new ClientDTO(client.getId(), client.getName(), client.getCountry(), client.getCity(), client.getStreetName(), client.getStreetNumber(), client.getZip());
    }

    private Client getClientFromDTO(ClientDTO clientDTO) {
        return new Client(clientDTO.getId(), clientDTO.getName(), clientDTO.getCountry(), clientDTO.getCity(), clientDTO.getStreetName(), clientDTO.getStreetNumber(), clientDTO.getZip());
    }

}
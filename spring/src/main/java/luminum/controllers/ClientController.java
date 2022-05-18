package luminum.controllers;

import java.util.List;
import java.util.stream.Collectors;

import luminum.database.ClientRepository;
import luminum.entities.Client;
import luminum.entities.DTO.ClientDTO;
import luminum.exceptions.ClientNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clients")
public class ClientController {

    private final ClientRepository repository;

    ClientController(ClientRepository repository) {
        this.repository = repository;
    }

    @GetMapping()
    List<ClientDTO> all() {
        return repository.findAll().stream().map(x -> getClientDTO(x)).collect(Collectors.toList());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    ClientDTO single(@PathVariable("id") Long id) {
        return getClientDTO(repository.findById(id).orElseThrow(() -> new ClientNotFoundException(id)));
    }

    @PostMapping()
    ClientDTO create(@RequestBody ClientDTO newClientDTO) {
        Client newClient = getClientFromDTO(newClientDTO);
        return getClientDTO(repository.save(newClient));
    }

    @PatchMapping()
    ClientDTO update(@RequestBody ClientDTO clientDTO) {
        Client client = getClientFromDTO(clientDTO);
        return getClientDTO(repository.save(client));
    }

    //delete DELETE
    @DeleteMapping("/{id}")
    ResponseEntity delete(@PathVariable("id") Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    /// Data manipulation
    private ClientDTO getClientDTO(Client client) {
        return new ClientDTO(client.getId(), client.getName(), client.getCountry(), client.getCity(), client.getStreetName(), client.getStreetNumber(), client.getZip());
    }

    private Client getClientFromDTO(ClientDTO clientDTO) {
        return new Client(clientDTO.getId(), clientDTO.getName(), clientDTO.getCountry(), clientDTO.getCity(), clientDTO.getStreetName(), clientDTO.getStreetNumber(), clientDTO.getZip());
    }

}
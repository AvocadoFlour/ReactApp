package luminum.controllers;

import java.util.List;
import java.util.stream.Collectors;

import luminum.database.ClientRepository;
import luminum.database.ProjectRepository;
import luminum.entities.Client;
import luminum.entities.DTO.ProjectReadDTO;
import luminum.entities.DTO.ProjectUpdateDTO;
import luminum.entities.Project;
import luminum.exceptions.ClientNotFoundException;
import luminum.exceptions.ProjectNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final ClientRepository clientRepository;

    ProjectController(ProjectRepository projectRepository, ClientRepository clientRepository) {
        this.projectRepository = projectRepository;
        this.clientRepository = clientRepository;
    }

    @GetMapping("/projects")
    List<ProjectReadDTO> all() {
        return projectRepository.findAll().stream().map(this::getProjectReadDTO).collect(Collectors.toList());
    }

    @RequestMapping(value = "/projects/{id}", method = RequestMethod.GET)
    ProjectReadDTO single(@PathVariable("id") Long id) {
        return getProjectReadDTO(projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException(id)));
    }

    @PostMapping("/projects")
    Project create(@RequestBody ProjectUpdateDTO projectUpdateDTO) {
        Project newProject = getProjectFromProjectUpdateDTO(projectUpdateDTO);
        return projectRepository.save(newProject);
    }

    @PatchMapping("/projects")
    Project update(@RequestBody ProjectUpdateDTO projectUpdateDTO) {
        Project project = getProjectFromProjectUpdateDTO(projectUpdateDTO);
        return projectRepository.save(project);
    }

    @DeleteMapping("/projects/{id}")
    HttpStatus delete(@PathVariable("id") Long id) {
        projectRepository.deleteById(id);
        return HttpStatus.OK;
    }

    // Data manipulation

    private ProjectReadDTO getProjectReadDTO(Project project) {
        return new ProjectReadDTO(project.getId(), project.getName(), project.getClient().getName(), project.getProjectManager(), project.getEmail(), project.getContactNumber(), project.getBillingAddress());
    }

    private Project getProjectFromProjectUpdateDTO(ProjectUpdateDTO projectUpdateDTO) {
        Client client = clientRepository.findById(projectUpdateDTO.clientId).orElseThrow(() -> new ClientNotFoundException(projectUpdateDTO.clientId));
        return new Project(projectUpdateDTO.id, projectUpdateDTO.name, client, projectUpdateDTO.projectManager, projectUpdateDTO.email, projectUpdateDTO.contactNumber, projectUpdateDTO.billingAddress);
    }

}
package luminum.entities.DTO;

public class ProjectUpdateDTO {

    public ProjectUpdateDTO(long id, String name, long clientId, String projectManager, String email, Integer contactNumber, String billingAddress) {
        this.id = id;
        this.name = name;
        this.clientId = clientId;
        this.projectManager = projectManager;
        this.email = email;
        this.contactNumber = contactNumber;
        this.billingAddress = billingAddress;
    }

    public long id;
    public String name;
    public long clientId;
    public String projectManager;
    public String email;
    public Integer contactNumber;
    public String billingAddress;
}

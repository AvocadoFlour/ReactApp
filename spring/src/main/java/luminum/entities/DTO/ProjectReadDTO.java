package luminum.entities.DTO;

public class ProjectReadDTO {

    public ProjectReadDTO(long id, String name, long clientId, String projectManager, String email, Integer contactNumber, String billingAddress) {
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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getClientId() {
        return clientId;
    }

    public void setClientId(long clientId) {
        this.clientId = clientId;
    }

    public String getProjectManager() {
        return projectManager;
    }

    public void setProjectManager(String projectManager) {
        this.projectManager = projectManager;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(Integer contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }
}

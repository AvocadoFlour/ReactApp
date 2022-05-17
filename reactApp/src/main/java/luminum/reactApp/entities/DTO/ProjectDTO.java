package luminum.reactApp.entities.DTO;

public class ProjectDTO {

    public String clientName;
    public String projectManager;
    public String email;
    public int contactNumber;
    public String billingAddress;

    public ProjectDTO(String clientName, String projectManager, String email, int contactNumber, String billingAddress) {
        this.clientName = clientName;
        this.projectManager = projectManager;
        this.email = email;
        this.contactNumber = contactNumber;
        this.billingAddress = billingAddress;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
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

    public int getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(int contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }
}

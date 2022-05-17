package luminum.reactApp.entities;

import javax.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    public Project() {
    }

    public Project(long id, String name, Client client, String projectManager, String email, int contactNumber, String billingAddress) {
        this.id = id;
        this.name = name;
        this.client = client;
        this.projectManager = projectManager;
        this.email = email;
        this.contactNumber = contactNumber;
        this.billingAddress = billingAddress;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "project_client_id", referencedColumnName = "client_id", nullable = false)
    private Client client;

    @Column(nullable = false)
    private String projectManager;
    private String email;
    @Column(nullable = true)
    private int contactNumber;
    @Column(nullable = false)
    private String billingAddress;

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

    public Client getClientId() {
        return client;
    }

    public void setClientId(Client clientId) {
        this.client = clientId;
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

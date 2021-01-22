package eclub.webdev.startups;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;

@Entity
public class TrialCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;
    @Column(name = "industry")
    private String industry;
    @Column(name = "technology")
    private String technology;
    @Column(name = "region")
    private String region;
    @Column(name = "employee_count")
    private int employeeCount;
    @Column(name = "total_funding")
    private double totalFunding;
    @Column(name = "website_link")
    private String websiteLink;
    @Column(name = "status")
    private String status;

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}


	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIndustry() {
		return this.industry;
	}

	public void setIndustry(String industry) {
		this.industry = industry;
	}

	public String getTechnology() {
		return this.technology;
	}

	public void setTechnology(String technology) {
		this.technology = technology;
	}

	public String getRegion() {
		return this.region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public int getEmployeeCount() {
		return this.employeeCount;
	}

	public void setEmployeeCount(int employeeCount) {
		this.employeeCount = employeeCount;
	}

	public double getTotalFunding() {
		return this.totalFunding;
	}

	public void setTotalFunding(double totalFunding) {
		this.totalFunding = totalFunding;
	}

	public String getWebsiteLink() {
		return this.websiteLink;
	}

	public void setWebsiteLink(String websiteLink) {
		this.websiteLink = websiteLink;
	}


    public Long getId() {
        return this.id;
    }

    public void updateParameters(TrialCompany other) {
        this.name = other.getName();
        this.industry = other.getIndustry();
        this.technology = other.getTechnology();
        this.region = other.getRegion();
        this.employeeCount = other.getEmployeeCount();
        this.totalFunding = other.getTotalFunding();
        this.websiteLink = other.getWebsiteLink();
        this.status = other.getStatus();
    }
}
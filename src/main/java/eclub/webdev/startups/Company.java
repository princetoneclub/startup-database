package eclub.webdev.startups;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;
import org.hibernate.annotations.Type;
import javax.persistence.Lob;

@Entity
public class Company {
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
	
	@Lob
    @Column(name = "startup_logo")
    @Type(type="org.hibernate.type.BinaryType")
    public byte[] startupLogo;
	@Column(name = "stage")
	private String stage;
	@Column(name = "about")
	private String about;
	@Column(name = "product_innovation")
	private String productInnovation;
	@Column(name = "traction")
	private String traction;
	@Column(name = "future_plans")
	private String futurePlans;
	@Column(name = "email")
	private String email;
	@Column(name = "tags")
	private String tags;
	@Column(name = "one_liner")
	private String oneLiner;
	@Column(name = "founder_name")
	private String founderName;
	@Column(name = "founder_role")
	private String founderRole;
	@Lob
    @Column(name = "founder_photo")
    @Type(type="org.hibernate.type.BinaryType")
	private byte[] founderPhoto;

	public byte[] getStartupLogo() {
		return this.startupLogo;
	}

	public void setStartupLogo(byte[] startupLogo) {
		this.startupLogo = startupLogo;
	}

	public String getStage() {
		return this.stage;
	}

	public void setStage(String stage) {
		this.stage = stage;
	}

	public String getAbout() {
		return this.about;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	public String getProductInnovation() {
		return this.productInnovation;
	}

	public void setProductInnovation(String productInnovation) {
		this.productInnovation = productInnovation;
	}

	public String getTraction() {
		return this.traction;
	}

	public void setTraction(String traction) {
		this.traction = traction;
	}

	public String getFuturePlans() {
		return this.futurePlans;
	}

	public void setFuturePlans(String futurePlans) {
		this.futurePlans = futurePlans;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTags() {
		return this.tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public String getOneLiner() {
		return this.oneLiner;
	}

	public void setOneLiner(String oneLiner) {
		this.oneLiner = oneLiner;
	}

	public String getFounderName() {
		return this.founderName;
	}

	public void setFounderName(String founderName) {
		this.founderName = founderName;
	}

	public String getFounderRole() {
		return this.founderRole;
	}

	public void setFounderRole(String founderRole) {
		this.founderRole = founderRole;
	}

	public byte[] getFounderPhoto() {
		return this.founderPhoto;
	}

	public void setFounderPhoto(byte[] founderPhoto) {
		this.founderPhoto = founderPhoto;
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

    public void updateParameters(Company other) {
        this.name = other.getName();
        this.industry = other.getIndustry();
        this.technology = other.getTechnology();
        this.region = other.getRegion();
        this.employeeCount = other.getEmployeeCount();
        this.totalFunding = other.getTotalFunding();
        this.websiteLink = other.getWebsiteLink();
		this.startupLogo = other.getStartupLogo();
		this.stage = other.getStage();
		this.productInnovation = other.getProductInnovation();
		this.traction = other.getTraction();
		this.futurePlans = other.getFuturePlans();
		this.email = other.getEmail();
		this.tags = other.getTags();
		this.oneLiner = other.getOneLiner();
		this.founderName = other.getFounderName();
		this.founderRole = other.getFounderRole();
		this.founderPhoto = other.getFounderPhoto();
    }
}
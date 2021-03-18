package eclub.webdev.startups;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;
import org.hibernate.annotations.Type;
import javax.persistence.Lob;

@Entity
public class Founder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "startup_id")
    private long startupId;
    @Column(name = "company_id")
    private long companyId;

	@Column(name = "founder_name")
	private String founderName;
	@Column(name = "founder_role")
	private String founderRole;
	@Lob
    @Column(name = "founder_photo")
    @Type(type="org.hibernate.type.BinaryType")
	private byte[] founderPhoto;
    @Column(name = "linkedin")
    private String linkedin;

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

    public Long getStartupId() {
		return this.startupId;
	}

	public void setStartupId(Long startupId) {
		this.startupId = startupId;
	}

    public String getLinkedin() {
		return this.linkedin;
	}

	public void setLinkedin(String linkedin) {
		this.linkedin = linkedin;
	}

    public Long getId() {
        return this.id;
    }

    public long getCompanyId() {
		return this.companyId;
	}

	public void setCompanyId(long companyId) {
		this.companyId = companyId;
	}

    public void updateParameters(Founder other) {
		this.founderName = other.getFounderName();
		this.founderRole = other.getFounderRole();
		this.founderPhoto = other.getFounderPhoto();
        this.startupId = other.getStartupId();
        this.linkedin = other.getLinkedin();
        this.companyId = other.getCompanyId();
    }
}
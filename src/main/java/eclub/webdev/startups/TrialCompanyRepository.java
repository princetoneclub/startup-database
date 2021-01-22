package eclub.webdev.startups;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrialCompanyRepository extends JpaRepository<TrialCompany, Long> {

}

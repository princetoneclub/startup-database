package eclub.webdev.startups;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FounderRepository extends JpaRepository<Founder, Long> {
    List<Founder> findByStartupId(Long startupId);
}

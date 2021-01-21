package eclub.webdev.startups;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {
    private CompanyRepository repository;

    @Autowired
    public CompanyController(CompanyRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Company> get(@PathVariable("id") Long id) {
        Company company = repository.findOne(id);
        if (null == company)
            return new ResponseEntity<Company>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Company>(company, HttpStatus.OK);
    }

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<Company> update(@RequestBody Company company) {
        repository.save(company);
        return get(company.getId());
    }

    @RequestMapping
    public List<Company> all() {
        return repository.findAll();
    }
}
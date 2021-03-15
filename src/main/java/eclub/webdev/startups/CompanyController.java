package eclub.webdev.startups;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.http.MediaType;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {
    private CompanyRepository repository;
    private FounderRepository founderRepo;

    @Autowired
    public CompanyController(CompanyRepository repository, FounderRepository founderRepo) {
        this.repository = repository;
        this.founderRepo = founderRepo;
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

    @PostMapping(value="/startuplogo/{responseId}", consumes={"multipart/form-data"})
	public ResponseEntity<Company> handleFileUpload(@RequestPart("file") MultipartFile file, @PathVariable("responseId") Long responseId){
        System.out.println("FILE UPLAOD METHOD");
        System.out.println(file.getOriginalFilename());
        System.out.println(responseId);
        Company foundResponse = repository.findOne(responseId);
        if (null == foundResponse)
            return new ResponseEntity<Company>(HttpStatus.NOT_FOUND);
        else {
            try{
                System.out.println("IN TRY");
                System.out.println(file.getOriginalFilename());
                foundResponse.setStartupLogo(file.getBytes());
                System.out.println("AFTER SET RESUME");
                repository.save(foundResponse);
                return get(responseId);
            } catch (Exception e) {
                System.out.println("IN CATCH");
                System.out.println(file.getOriginalFilename());
                return new ResponseEntity<Company>(HttpStatus.NOT_FOUND);
            }
            
        }
    }

    @RequestMapping(value="/{id}/founders", method=RequestMethod.GET)
    public List<Founder> getAllFounders(@PathVariable("id") Long id) {
        return founderRepo.findByStartupId(id);
    }

    @RequestMapping
    public List<Company> all() {
        return repository.findAll();
    }
}
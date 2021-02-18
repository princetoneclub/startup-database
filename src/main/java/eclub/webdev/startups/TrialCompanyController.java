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
@RequestMapping("/api/trialcompany")
public class TrialCompanyController {
    private TrialCompanyRepository repository;

    @Autowired
    public TrialCompanyController(TrialCompanyRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<TrialCompany> get(@PathVariable("id") Long id) {
        TrialCompany company = repository.findOne(id);
        if (null == company)
            return new ResponseEntity<TrialCompany>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<TrialCompany>(company, HttpStatus.OK);
    }

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<TrialCompany> update(@RequestBody TrialCompany company) {
        repository.save(company);
        return get(company.getId());
    }

    @PostMapping(value="/startuplogoupload/{responseId}", consumes={"multipart/form-data"})
	public ResponseEntity<TrialCompany> handleFileUpload(@RequestPart("file") MultipartFile file, @PathVariable("responseId") Long responseId){
        System.out.println("FILE UPLAOD METHOD");
        System.out.println(file.getOriginalFilename());
        System.out.println(responseId);
        TrialCompany foundResponse = repository.findOne(responseId);
        if (null == foundResponse)
            return new ResponseEntity<TrialCompany>(HttpStatus.NOT_FOUND);
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
                return new ResponseEntity<TrialCompany>(HttpStatus.NOT_FOUND);
            }
            
        }
    }

    @PostMapping(value="/founderimageupload/{responseId}", consumes={"multipart/form-data"})
	public ResponseEntity<TrialCompany> handleFounderUpload(@RequestPart("file") MultipartFile file, @PathVariable("responseId") Long responseId){
        System.out.println("FILE UPLAOD METHOD");
        System.out.println(file.getOriginalFilename());
        System.out.println(responseId);
        TrialCompany foundResponse = repository.findOne(responseId);
        if (null == foundResponse)
            return new ResponseEntity<TrialCompany>(HttpStatus.NOT_FOUND);
        else {
            try{
                System.out.println("IN TRY");
                System.out.println(file.getOriginalFilename());
                foundResponse.setFounderPhoto(file.getBytes());
                System.out.println("AFTER SET RESUME");
                repository.save(foundResponse);
                return get(responseId);
            } catch (Exception e) {
                System.out.println("IN CATCH");
                System.out.println(file.getOriginalFilename());
                return new ResponseEntity<TrialCompany>(HttpStatus.NOT_FOUND);
            }
            
        }
    }

    @RequestMapping
    public List<TrialCompany> all() {
        return repository.findAll();
    }
}
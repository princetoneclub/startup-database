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
@RequestMapping("/api/founders")
public class FounderController {
    private FounderRepository repository;

    @Autowired
    public FounderController(FounderRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Founder> get(@PathVariable("id") Long id) {
        Founder founder = repository.findOne(id);
        if (null == founder)
            return new ResponseEntity<Founder>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Founder>(founder, HttpStatus.OK);
    }

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<Founder> update(@RequestBody Founder founder) {
        repository.save(founder);
        return get(founder.getId());
    }

    @PostMapping(value="/founderimageupload/{responseId}", consumes={"multipart/form-data"})
	public ResponseEntity<Founder> handleFounderUpload(@RequestPart("file") MultipartFile file, @PathVariable("responseId") Long responseId){
        System.out.println("FILE UPLAOD METHOD");
        System.out.println(file.getOriginalFilename());
        System.out.println(responseId);
        Founder foundResponse = repository.findOne(responseId);
        if (null == foundResponse)
            return new ResponseEntity<Founder>(HttpStatus.NOT_FOUND);
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
                return new ResponseEntity<Founder>(HttpStatus.NOT_FOUND);
            }
            
        }
    }
    @RequestMapping
    public List<Founder> all() {
        return repository.findAll();
    }
}
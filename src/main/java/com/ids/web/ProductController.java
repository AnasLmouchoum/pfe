package com.ids.web;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ids.data.web.AbstractCrudController;
import com.ids.entity.Product;
import com.ids.repository.ArticleRepository;
import com.ids.repository.CommandeRepository;
import com.ids.repository.ProductRepository;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController extends AbstractCrudController<Product, UUID> {
	private ProductRepository pr;
	private CommandeRepository cr;
	private ArticleRepository ar;
	
	
	@GetMapping("/cmdPret/{idClient}")
	public void CommandePret(@PathVariable UUID idClient) {
		List<Product> productLst = pr.findByIdClient(idClient);
		
		for(int i=0;i<productLst.size();i++) {
			if(productLst.get(i).getCommeFait()) {
				System.out.println(productLst.get(i));
			}
		}
	}
	
}
package com.ids.web;

import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ids.data.web.AbstractCrudController;
import com.ids.entity.Article;

/*
 * git clone -b v_omar https://github.com/innovds/contact-ms.git
 * git remote add r_omar https://github.com/innovds/contact-ms.git 
 *git add .
 *
 * git commit -m " un comm"
 * git push -u r_omar v_omar
 * et apres git push 
 * sinon 
 * git push -f r_omar v_omar
 * */
@RestController
@RequestMapping("/api/v1/articles")
@CrossOrigin("*")
public class ArticleController extends AbstractCrudController<Article, UUID> {

}

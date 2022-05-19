package com.ids.web;

import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ids.data.web.AbstractCrudController;
import com.ids.entity.Incoterm;

@RestController
@RequestMapping("/api/v1/incoterms")
@CrossOrigin("*")
public class IncotermController extends AbstractCrudController<Incoterm, UUID> {
}

package com.ids.web;

import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ids.data.web.AbstractCrudController;
import com.ids.entity.Colis;


import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/colis")
@CrossOrigin("*")
@AllArgsConstructor
public class ColisController extends AbstractCrudController<Colis,UUID> {

}

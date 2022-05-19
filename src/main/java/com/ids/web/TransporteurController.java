package com.ids.web;

import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ids.data.web.AbstractCrudController;
import com.ids.entity.Transporteur;

import lombok.AllArgsConstructor;

//http://localhost:1000/api/v1/transporteurs
@RestController
@RequestMapping("/api/v1/transporteurs")
@CrossOrigin("*")
@AllArgsConstructor
public class TransporteurController extends AbstractCrudController<Transporteur, UUID> {

}

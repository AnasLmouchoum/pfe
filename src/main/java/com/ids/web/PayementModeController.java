package com.ids.web;

import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ids.data.web.AbstractCrudController;
import com.ids.entity.PayementMode;

@RestController
@RequestMapping("/api/v1/payementModes")
@CrossOrigin("*")
public class PayementModeController extends AbstractCrudController<PayementMode, UUID> {

}

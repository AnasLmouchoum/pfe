package com.ids.entity;

import java.math.BigDecimal;

import javax.persistence.Entity;

import org.hibernate.annotations.Where;

import com.ids.data.entity.EntityUuid;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
@Entity
@Where(clause = "deleted = false")
public class RawMaterial extends EntityUuid {

	private static final long serialVersionUID = 1L;
	private String design;
	private String nomenclature;
	private String family;
	private String measureUnit;
	private BigDecimal tauxPertes;

}
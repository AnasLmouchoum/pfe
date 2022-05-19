package com.ids.entity;

import javax.persistence.Entity;

import com.ids.data.entity.EntityUuid;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@Entity
public class Role extends EntityUuid {
	private static final long serialVersionUID = 1L;
	private String designation;
	private Double nbrUtilisateur;
}
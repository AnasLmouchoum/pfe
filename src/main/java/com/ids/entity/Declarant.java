package com.ids.entity;

import javax.persistence.Entity;

import org.hibernate.annotations.Where;

import com.ids.data.entity.EntityUuid;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@RequiredArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
@Entity
@Where(clause = "deleted = false")
public class Declarant extends EntityUuid {

	private static final long serialVersionUID = 1L;

	private String design;

	private String ville;

}

package com.ids.entity;

import java.util.UUID;

import javax.persistence.Entity;

import org.hibernate.annotations.Where;

import com.ids.data.entity.AuditableEntityId;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Where(clause = "deleted = false")
public class Palette extends AuditableEntityId<UUID> {

	private static final long serialVersionUID = 1L;
	private int nummero_Palette;
	private String remarque;
	private int nombre_colis;
	private UUID idClient;

}
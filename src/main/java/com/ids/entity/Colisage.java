package com.ids.entity;

import java.sql.Date;
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
@ToString(callSuper = true)
@Where(clause = "deleted = false")
public class Colisage extends AuditableEntityId<UUID> {

	private static final long serialVersionUID = 1L;
	private UUID idClient;
	private Date date_colisage;
	private double pois_brut;
	private int nombre_palettes;
	private double pois_net;

}
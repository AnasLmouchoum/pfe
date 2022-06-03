package com.ids.entity;

import java.util.Date;
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
public class Commande extends AuditableEntityId<UUID> {
	

	private static final long serialVersionUID = 1L;
	private Date date_Commande;
	private String season;
	private Long nBC;
	private double amount;
	private UUID idClient;
	private String adrLiv;
}

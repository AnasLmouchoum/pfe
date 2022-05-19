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
	private Date date;
	private String season;
	private double amount;
	/*@ManyToOne
	@JsonProperty(access = Access.WRITE_ONLY)
	private Client client;*/
	private UUID idClient;
	private String adrLiv;
	/*	@OneToMany
		private List<ArticleCommande> articleCommandes;*/
}

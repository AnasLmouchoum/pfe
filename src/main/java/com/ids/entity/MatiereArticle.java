package com.ids.entity;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ids.data.entity.AuditableEntityId;

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
@Where(clause = "deleted = false")
public class MatiereArticle extends AuditableEntityId<UUID> {

	private static final long serialVersionUID = 1L;

	private Long quantite;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	private Articlee article;

	//	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	private MatierePremiere matiere;
}

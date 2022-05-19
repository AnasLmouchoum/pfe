package com.ids.entity;
import java.util.UUID;

import javax.persistence.Entity;

import com.ids.data.entity.EntityUuid;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.RequiredArgsConstructor;
import lombok.experimental.SuperBuilder;
import lombok.AllArgsConstructor;

@SuperBuilder
@Setter
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@Entity
public class LigneDeCommande extends EntityUuid{
public static final long serialVersionUID=1l;
	private String designation;
	private long quantite;
	private double prix;
	private UUID idCommandeFournisseur;
	private UUID idMatierePremiere;
}

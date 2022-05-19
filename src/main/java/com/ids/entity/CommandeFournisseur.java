package com.ids.entity;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.OneToMany;

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
public class CommandeFournisseur extends EntityUuid{
	public static final long serialVersionUID=1l;
		private Date dateLivraison;
		private Date dateCommande;
		//private double montant;
		private UUID idFournisseur;
}

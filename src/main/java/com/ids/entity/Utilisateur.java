package com.ids.entity;

import java.sql.Date;
import java.util.UUID;

import javax.persistence.Entity;

import org.hibernate.annotations.Where;

import com.ids.data.entity.AuditableEntityId;

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
public class Utilisateur extends AuditableEntityId<UUID> {
	
	private static final long serialVersionUID = 1L;
	private String email;
//	private String username;
	private String password;
	private String genre;
	private String nom;
	private String prenom;
	private String role;
	private String phone;
	private String img;
	
}

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
public class AdressLiv extends AuditableEntityId<UUID> {
	private String country;
	private String city;
	private String adress;
	private UUID idClient;
}

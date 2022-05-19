package com.ids.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.ids.entity.AdressLiv;
import com.ids.entity.Client;
import com.ids.repository.AdressLivRepository;
import com.ids.repository.ClientRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdressLivService {
	private AdressLivRepository adressLivDao;
	private ClientRepository clientDao;

	public void onSave(AdressLiv adressLiv) {
		adressLivDao.save(adressLiv);
		Client client = clientDao.findById(adressLiv.getIdClient()).get();
		List<AdressLiv> lc = client.getAdressLivs();
		lc.add(adressLiv);
		client.setAdressLivs(lc);
		clientDao.save(client);
	}

	public void onEdit(AdressLiv adressLiv, UUID id) {
		AdressLiv adressLiv0 = adressLivDao.findById(id).get();
		adressLivDao.save(adressLiv);
		Client client = clientDao.findById(adressLiv.getIdClient()).get();
		List<AdressLiv> lc = client.getAdressLivs();
		lc.remove(adressLiv0);
		lc.add(adressLiv);
		client.setAdressLivs(lc);
		clientDao.save(client);
	}
	/**/
}

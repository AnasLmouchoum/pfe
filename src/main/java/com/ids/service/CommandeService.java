package com.ids.service;

import org.springframework.stereotype.Service;

import com.ids.data.annotation.TransactionalService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@TransactionalService
public class CommandeService {
	/*private CommandeRepository comandDao;
	private ClientRepository clientDao;
	
	public void onSave(Commande commande) {
		comandDao.save(commande);
		Client client = clientDao.findById(commande.getIdClient()).get();
		List<Commande> lc = client.getCommandes();
		lc.add(commande);
		client.setCommandes(lc);
		clientDao.save(client);
	}
	
	public void onEdit(Commande commande, UUID id) {
		Commande commande0 = comandDao.findById(id).get();
		comandDao.save(commande);
		Client client = clientDao.findById(commande.getIdClient()).get();
		List<Commande> lc = client.getCommandes();
		lc.remove(commande0);
		lc.add(commande);
		client.setCommandes(lc);
		clientDao.save(client);
	}*/
}

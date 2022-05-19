package com.ids.service;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ArticleCommandeService {
	/*private CommandeRepository comandDao;
	private ArticleCommandeRepository articleDao;
	
	public void onSave(ArticleCommande articleCommande) {
		articleDao.save(articleCommande);
		Commande commande = comandDao.findById(articleCommande.getIdCommande()).get();
		List<ArticleCommande> lc = commande.getArticleCommandes();
		lc.add(articleCommande);
		commande.setArticleCommandes(lc);
		comandDao.save(commande);
	}
	
	public void onEdit(ArticleCommande articleCommande, UUID id) {
		ArticleCommande articleCommande0 = articleDao.findById(id).get();
		articleDao.save(articleCommande);
		Commande commande = comandDao.findById(articleCommande.getIdCommande()).get();
		List<ArticleCommande> lc = commande.getArticleCommandes();
		lc.remove(articleCommande0);
		lc.add(articleCommande);
		commande.setArticleCommandes(lc);
		comandDao.save(commande);
	}*/
}

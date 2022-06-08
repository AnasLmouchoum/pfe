package com.ids.repository;

import java.util.UUID;

import com.ids.data.repository.BaseRepository;
import com.ids.entity.MatiereArticle;

public interface MatiereArticleRepository extends BaseRepository<MatiereArticle, UUID> {

	public void deleteByMatiereId(UUID matiereId);

}

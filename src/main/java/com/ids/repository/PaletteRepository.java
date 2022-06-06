package com.ids.repository;

import java.util.List;
import java.util.UUID;

import com.ids.data.repository.BaseRepository;
import com.ids.entity.Palette;

public interface PaletteRepository extends BaseRepository<Palette, UUID> {
	
	public List<Palette> findByIdClient(UUID idClient);

}

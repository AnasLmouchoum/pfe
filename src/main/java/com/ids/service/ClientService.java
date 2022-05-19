package com.ids.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.UUID;

import com.ids.data.annotation.TransactionalService;
import com.ids.data.service.AbstractService;
import com.ids.entity.Client;

@TransactionalService
public class ClientService extends AbstractService<Client, UUID> {

	public List<Client> init() throws Exception {
		List<Client> clients = new ArrayList<>();
		File f = new File("src/main/resources/names.txt");
		Scanner sc = new Scanner(f);
		while (sc.hasNext()) {
			String name = sc.nextLine().trim();
			Client client = new Client();
			client.setDesign(name);
			client.setContact(name);
			client.setEmail(name + "@gmail.com");
			client.setDevice("MAD");
			clients.add(client);
		}
		return clients;

	}
}

export type Num = {
  id: number;
};
export interface Client {
  id: string;
  design: string;
  concat: string;
  image: string;
  email: string;
  tel: string;
  device: string;
  adrLiv: string;
  incoterm: string;
  paymentChoice: string;
  adrFact: string;
  bank: string;
  rib: string;
  swift: string;
  commandes: Commande[];
  adressLivs: AdressLiv[];
}
export type ColsClient =
  | "design"
  | "concat"
  | "image"
  | "email"
  | "tel"
  | "device"
  | "adrLiv"
  | "incoterm"
  | "paymentChoice"
  | "adrFact"
  | "bank"
  | "rib"
  | "swift";
export const c0: Client = {
  id: "",
  design: "",
  concat: "",
  image: "",
  email: "",
  tel: "",
  device: "",
  adrLiv: "",
  incoterm: "",
  paymentChoice: "",
  adrFact: "",
  bank: "",
  rib: "",
  swift: "",
  commandes: [],
  adressLivs: [],
};

export interface Commande {
  id: string;
  date: Date;
  season: string;
  amount: string;
  client: Client;
  idClient: string;
  adrLiv: string;
  articleCommandes: ArticleCommande[];
}
export const cm0: Commande = {
  id: "",
  date: new Date(),
  amount: "",
  season: "",
  client: c0,
  idClient: "",
  adrLiv: "",
  articleCommandes: [],
};
export const getCm0 = (cl: Client): Commande => {
  return {
    id: "",
    date: new Date(),
    amount: "",
    season: "",
    client: cl,
    idClient: cl.id,
    adrLiv: "",
    articleCommandes: [],
  };
};
export const getCm = (cl: Client,cm:Commande): Commande => {
  return {
    id: cm.id,
    date: cm.date,
    amount: cm.amount,
    season: cm.season,
    client: cl,
    idClient: cm.idClient,
    adrLiv: cm.adrLiv,
    articleCommandes: cm.articleCommandes,
  };
};
export const getClient = (id: string, obj: Client[]): Client | undefined => {
  const apr = obj?.find((o: Client) => {
    return o.id === id;
  });
  return apr;
};

export interface AdressLiv {
  adress: string;
  id: string;
  country: string;
  city: string;
}
export interface ArticleCommande {
  id: string;
  design: string;
  qte: number;
  portion: string;
  pu: number;
  idCommande: string;
}
export const arc0: ArticleCommande = {
  id: "",
  design: "",
  //@ts-ignore
  qte: "",
  portion: "",
  //@ts-ignore
  pu: "",
  idCommande: "",
};
export interface Chaine {
  val: string;
}

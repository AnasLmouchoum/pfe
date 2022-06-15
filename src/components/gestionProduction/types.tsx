export type Num = {
    id: number;
  };
  // export interface Client {
  //   id: string;
  //   name: string,
  //   design: string;
  //   concat: string;
  //   image: string;
  //   email: string;
  //   tel: string;
  //   device: string;
  //   adrLiv: string;
  //   incoterm: string;
  //   paymentChoice: string;
  //   adrFact: string;
  //   bank: string;
  //   rib: string;
  //   swift: string;
  //   commandes:Commande[]
  //   adressLivs:AdressLiv[]
  // }
  // export type ColsClient =
  //   | "design"
  //   | "concat"
  //   | "image"
  //   | "email"
  //   | "tel"
  //   | "device"
  //   | "adrLiv"
  //   | "incoterm"
  //   | "paymentChoice"
  //   | "adrFact"
  //   | "bank"
  //   | "rib"
  //   | "swift";
  // export const c0: Client = {
  //   id: "",
  //   name: "",
  //   design: "",
  //   concat: "",
  //   image: "",
  //   email: "",
  //   tel: "",
  //   device: "",
  //   adrLiv: "",
  //   incoterm: "",
  //   paymentChoice: "",
  //   adrFact: "",
  //   bank: "",
  //   rib: "",
  //   swift: "",
  //   commandes:[],
  //   adressLivs:[]
  // };
  
  // export interface Commande {
  // id:string
  // numBC: string
  // idClient:string
  // date:Date
  // season:string
  // amount:string
  // quantite: string
  // }
  // export const cm0:Commande={
  //   id:"",
  //   idClient:"",
  //   date:new Date(),
  //   amount:"",
  //   season:"",
  //   quantite: "",
  //   numBC: "",
  // }
  
  export interface AdressLiv {
    id:string
      country:string
      city:string
      adress:string
  }
  export interface Chaine {
    val: string;
  }
  //-----------------------------------------------
  //-------------------PRODUCT---------------------
  export interface ProductJson{
    content:Product[]
  }
  export interface Product {
    id: string
    num: string
    commeFait: boolean
    idArticleCommande: string;
    idCommande: string
    idClient: string
    idArticle: string
    portion: string
    quantite: string
    // quantiteAFab: string
    dateProd: Date
  }
  export const pro0: Product = {
    id: "",
    num: "",
    commeFait: false,
    idArticleCommande: "",
    idCommande: "",
    idClient: "",
    idArticle: "",
    quantite: "",
    //quantiteAFab: "",
    portion: "",
    dateProd: new Date(),
  }
  //------------------------------------------------
  //--------------MATIERE---------------------------
  export interface MatiereJson {
    content: Matiere[]
  }
  export interface Matiere {
    id: string
    codeMat: string
    designation: string
    unitMesure: string
    stock: string
    prixUnit: string
    idFournisseur: string
    familleMatierePremiere: string
    origine: string;
  }
  export const mat0: Matiere = {
    id: "",
    codeMat: "",
    designation: "",
    unitMesure: "",
    stock: "",
    prixUnit: "",
    idFournisseur: "",
    familleMatierePremiere: "",
    origine: "",
  }
  //------------------------------------------
  //------------------ARTICLE-----------------
  export interface ArticleJson{
    content:Article[]
  }
  export interface Article {
    id: string
    codeArt: string
    designation: string
    prixUnit: string
    idClient: string
    poids: string
    idFournisseur: string
    idFamilleArticle: string
    codeBarre: string
    date: Date;
    articleMatieres: ArticleMatiere[]
  }
  export const art0: Article = {
    id: "",
    codeArt: "",
    designation: "",
    poids: "",
    prixUnit: "",
    idFamilleArticle: "",
    idClient: "",
    idFournisseur: "",
    codeBarre: "",
    date: new Date(),
    articleMatieres: [],
  }
  //------------------------------------------
  //------------MATIERE-ARTICLE---------------
  export interface ArticleMatiereJson {
    content: ArticleMatiereJson[];
  }
  export interface ArticleMatiere {
    id: string;
    matiere: Matiere;
    quantite: string;
    article: Article;
  }
  export const artMat0: ArticleMatiere = {
    id: "",
    matiere: mat0,
    quantite: "",
    article: art0,
  }
  //---------------------------------------------------
  //-----------------FOURNISSEUR------------------------
  export interface FournisseurJson {
    content: Fournisseur[]
  }
  export interface Fournisseur {
    id: string
    design: string
	  raisonSociale: string
	  contact: string
	  tel: string
	  email: string
	  adresse: string
	  modeDeReglements: string
	  incoterm: string
	  devise: string
	  coordonéésBancaire: string
	  nomBanque: string
	  ribBanque: string
	  swift: string
	  image: string
    matiere: Matiere[];
    commandes: any;
  }
  export const f0: Fournisseur = {
    id: "",
    design: "",
    raisonSociale: "",
	  contact: "",
	  tel: "",
	  email: "",
	  adresse: "",
	  modeDeReglements: "",
	  incoterm: "",
	  devise: "",
	  coordonéésBancaire: "",
	  nomBanque: "",
	  ribBanque: "",
	  swift: "",
	  image: "",
	  matiere: [],
    commandes: "",
  }
  //----------------------------------------------------
  //----------------CLIENT------------------------------
  export interface ClientJson {
    content: Client[]
  }
  export interface Client {
    id: string;
    design: string;
  }
  export const c0: Client = {
    id: "",
    design: "",
  }
  //----------------------------------------------------
  //------------------COMMANDE---------------------------
  export interface CommandeJson {
    content: Commande[];
  }
  export interface Commande {
    id: string;
    date: Date;
    nbc: string;
    season: string;
    amount: string;
    adrLiv: string;
    idClient: string;
  }
  export const com0: Commande = {
    id: "",
    date: new Date(),
    nbc: "",
    season: "",
    amount: "",
    adrLiv: "",
    idClient: "",
  }
  //----------------------------------------------------
  //----------------------------------------------------
  export interface ArticleCommandeJson{
    content: ArticleCommande[];
  }
  export interface ArticleCommande {
    id: string;
    design: string;
    qte: number;
    portion: string;
    pu: number;
    idCommande: string;
    idArticlee: string;
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
    idArticlee: "",
  };
//----------------------------------------------------
//------------------FAMILLE---------------------------
export interface FamilleArticleJson {
  content: FamilleArticle[];
}
export interface FamilleArticle {
  id: string;
  design: string;
  nomenclature: string;
  tauxPertes: string;
}
export const famArt0: FamilleArticle = {
  id: "",
  design: "",
  nomenclature: "",
  tauxPertes: "",
}
//----------------------------------------------------
//------------------FAMILLE---------------------------
export interface CalculProductJson {
  content: CalculProduct[];
}
export interface CalculProduct {
  idArticlee: string;
  idCommande: string;
  portion: string;
  qteTotal: string;
  qteProduit: string;
}
export const cp0: CalculProduct = {
  idArticlee: "",
  idCommande: "",
  portion: "",
  qteTotal: "",
  qteProduit: "",
}
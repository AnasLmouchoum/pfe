import{ inRange } from "lodash";
import{ Timestamp } from "rxjs";

export type Num ={
  id: number;
};
export type IdsObject ={
  id: string;
  design:string;
};
export const ids0:IdsObject={
  id:"",
  design:""
}
export interface ClientJson{
  content: Client[];
}
export interface Client extends IdsObject{
  contact: string;
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
  adressLivs: AdressLiv[];
}
export const c0: Client ={
  id: "",
  design: "",
  contact: "",
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
  adressLivs: [],
};
export interface CommandeJson{
  content: Commande[];
}
export interface Commande extends IdsObject{
  date: Date;
  season: string;
  amount: string;
  idClient: string;
  adrLiv: string;
}
export const cm0: Commande ={
  id: "",
  date: new Date(),
  amount: "",
  season: "",
  idClient: "",
  adrLiv: "",
  design: ""
};

export interface AdressLivJson{
  content: AdressLiv[];
}
export interface AdressLiv extends IdsObject{
  adress: string;
  country: string;
  city: string;
  idClient: string;
}
export const adr0: AdressLiv ={
  id: "",
  adress: "",
  country: "",
  city: "",
  idClient: "",
  design: ""
};
export interface ArticleCommandeJson{
  content: ArticleCommande[];
}
export interface ArticleCommande extends IdsObject{
  qte: number;
  portion: string;
  pu: number;
  idCommande: string;
}
export const arc0: ArticleCommande ={
  id: "",
  design: "",
  //@ts-ignore
  qte: "",
  portion: "",
  //@ts-ignore
  pu: "",
  idCommande: "",
};
export interface ArticleJson{
  content: Article[];
}

export interface Article extends IdsObject{
  nomenclature: string;
  tauxPertes: number;
}

export const article0: Article ={
  id: "",
  design: "",
  nomenclature: "",
  tauxPertes: 0,
};

export interface UnitMeasureJson{
  content: UnitMeasure[];
}

export interface UnitMeasure extends IdsObject{
  symbole: string;
  decimal: number;
}

export const unitMeasure0: UnitMeasure ={
  id: "",
  design: "",
  symbole: "",
  decimal: 0,
};

export interface BureauDouaneJson{
  content: BureauDouane[];
}

export interface BureauDouane extends IdsObject{
  code: string;
  
}

export const bureauDouane0: BureauDouane ={
  id: "",
  code: "",
  design: "",
};

export interface DeclarantJson{
  content: Declarant[];
}

export interface Declarant extends IdsObject{
  ville: string;
}

export const declarant0: Declarant ={
  id: "",
  design: "",
  ville: "",
};

export interface IncotermJson{
  content: Incoterm[];
}

export interface Incoterm extends IdsObject{
  code: string;
  
}

export const incoterm0: Incoterm ={
  id: "",
  code: "",
  design: "",
};

export interface PayementModeJson{
  content: PayementMode[];
}

export interface PayementMode extends IdsObject{
  code: string;
  
}

export const payementMode0: PayementMode ={
  id: "",
  code: "",
  design: "",
};

export interface RegimeDouanierJson{
  content: RegimeDouanier[];
}

export interface RegimeDouanier extends IdsObject{
  code: string;
  
}

export const regimeDouanier0: RegimeDouanier ={
  id: "",
  code: "",
  design: "",
};

export interface RawMaterialJson{
  content: RawMaterial[];
}

export interface RawMaterial extends IdsObject{
  nomenclature: string;
  family: string;
  tauxPertes: number;
  measureUnit: string;
}

export const rawMaterial0: RawMaterial ={
  id: "",
  design: "",
  nomenclature: "",
  family: "",
  tauxPertes: 0,
  measureUnit: "",
};

export interface DumJson{
  content: Dum[];
}

export interface Dum extends IdsObject{
  numDum: number;
  date: Date;
  valeur: number;
  fournisseur: string;
  bureauDouane: string;
  declarant: string;
  regime: string;
}

export const dum0: Dum ={
  id: "",
  numDum: 0,
  date: new Date(),
  valeur: 0.0,
  fournisseur: "",
  bureauDouane: "",
  declarant: "",
  regime: "",
  design: ""
};

export interface DechargeJson{
  content: Decharge[];
}

export interface Decharge extends IdsObject{
  numDum: number;
  date: Date;
  valeur: number;
  client: string;
  transporteur: string;
  declarant: string;
}

export const decharge0: Decharge ={
  id: "",
  numDum: 0,
  date: new Date(),
  valeur: 0.0,
  client: "",
  transporteur: "",
  declarant: "",
  design: ""
};

export interface TransporteurJson{
  content:Transporteur[]
}
export interface Transporteur extends IdsObject{
  
}
export const transporteur0:Transporteur={
  id:"",
  design:""
}
export interface Document extends IdsObject{
  
}
export const document0:Document={
  id:"",
  design:""
}
export interface DocumentJson{
  content:Document[]
}
export interface DeviseJson{
  content:Devise[]
}
export interface Devise extends IdsObject{
  code_iso: string;
  symbole: string;
  
}
export const devise0: Devise={
  id: "",
  code_iso: "",
  symbole: "",
  design: "",
}
export interface PaysJson{
  content:Pays[]
}
export interface Pays extends IdsObject{
  
}
export const pays0: Pays ={
  id: "",
  design: ""
}
export interface Role extends IdsObject{
  nbrUtilisateur: string;
}
export const role0: Role ={
  id: "",
  design: "",
  nbrUtilisateur: "",
}
export interface Ville extends IdsObject{
  pays: string;
}
export interface VilleJson{
  content:Ville[]
}
export interface Type extends IdsObject{
  
}
export const type0: Type ={
  id: "",
  design: ""
}
export interface TypeJson{
  content:Type[]
}
export const t0: Transporteur ={
  id: "",
  design: "",
};
export const d0: Document ={
  id: "",
  design: "",
};
export const v0: Devise ={
  id: "",
  code_iso: "",
  symbole: "",
  design: "",
};
export const p0: Pays ={
  id: "",
  design: "",
};
export const i0: Ville ={
  id: "",
  design: "",
  pays: "",
};
export const y0: Document ={
  id: "",
  design: "",
};
export const r0: Role ={
  id: "",
  design: "",
  nbrUtilisateur: "",
};
export interface RoleJson{
  content:Role[]
}
//************************************************************ */
//************************************************************ */
//**********************Fournisseur*************************** */
export interface Fournisseur extends IdsObject{
  contact: string;
  tel: string;
  email: string;
  adresse: string;
  modeDeReglements: string;
  incoterm: string;
  devise: string;
  nomBanque: string;
  ribBanque: string;
  swift: string;
  image: string;
  commandes: CommandeFournisseur[];
  matiere: MatierePremiere[];
}

export const f0: Fournisseur ={
  id: "",
  design: "",
  contact: "",
  tel: "",
  email: "",
  adresse: "",
  modeDeReglements: "",
  incoterm: "",
  devise: "",
  nomBanque: "",
  ribBanque: "",
  swift: "",
  image: "",
  commandes: [],
  matiere: [],
};
//************************************************************ */
//************************************************************ */
//*******************CommandeFournsieeur********************** */
export interface CommandeFournisseur extends IdsObject{
  dateLivraison: Date;
  dateCommande: Date;
  montant: number;
  idFournisseur: string;
}
export const cf0: CommandeFournisseur ={
  id: "",
  dateLivraison: new Date(),
  dateCommande: new Date(),
  //@ts-ignore
  montant: "",
   idFournisseur: "",
};
export const getCf0 = (f: Fournisseur): CommandeFournisseur =>{
  return{
    id: "",
    dateLivraison: new Date(),
    dateCommande: new Date(),
    //@ts-ignore
    montant: "",
    fournisseur: f,
    idFournisseur: f.id,
  };
};
export const getFournisseur = (
  id: string,
  obj: Fournisseur[]
): Fournisseur | undefined =>{
  const apr = obj?.find((o: Fournisseur) =>{
    return o.id === id;
  });
  return apr;
};
//************************************************************ */
//************************************************************ */
//********************MatierePremiere************************* */
export interface MatierePremiere extends IdsObject{
  familleMatierePremiere: string;
  prix: number;
  origine: string;
  fournisseur: Fournisseur;
  idFournisseur: string;
}
export const mp0: MatierePremiere ={
  id: "",
  design: "",
  familleMatierePremiere: "",
  //@ts-ignore
  prix: "",
  origine: "",
  fournisseur: f0,
  idFournisseur: "",
};
export const getMp0 = (f: Fournisseur): MatierePremiere =>{
  return{
    id: "",
    design: "",
    familleMatierePremiere: "",
    //@ts-ignore
    prix: "",
    origine: "",
    fournisseur: f,
    idFournisseur: f.id,
  };
};
//************************************************************ */
//************************************************************ */
//********************LigneDeCommande************************* */
export interface LigneDeCommande extends IdsObject{
  quantite: number;
  prix: number;
  commandeFournisseur: CommandeFournisseur;
  matierePremiere: MatierePremiere;
  idCommandeFournisseur: string;
  idMatierePremiere: string;
}
export const lc0: LigneDeCommande ={
  id: "",
  design: "",
  //@ts-ignore
  quantite: "",
  //@ts-ignore
  prix: "",
  commandeFournisseur: cf0,
  matierePremiere: mp0,
  idCommandeFournisseur: "",
  idMatierePremiere: "",
};
export const getlc0 = (
  c: CommandeFournisseur,
  m: MatierePremiere
): LigneDeCommande =>{
  return{
    id: "",
    design: "",
    //@ts-ignore
    quantite: "",
    //@ts-ignore
    prix: "",
    commandeFournisseur: c,
    matierePremiere: m,
    idCommandeFournisseur: c.id,
    idMatierePremiere: m.id,
  };
};
export interface Users {
  id: number;
  nom: string;
  prenom: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  tele: string;
  img: string;
  email: string;
  phone: string;
  role: string[];
}
export const u0: Users ={
  id: -1,
  nom: "",
  prenom: "",
  password: "",
  username: "",
  first_name: "",
  last_name: "",
  tele: "",
  img: "",
  email: "",
  phone: "",
  role: [],
};
export interface AccessUser {
  manageGroupMembership: boolean;
  view: boolean;
  mapRoles: boolean;
  impersonate: boolean;
  manage: boolean;
}
export const access0: AccessUser ={
  manageGroupMembership: true,
  view: true,
  mapRoles: true,
  impersonate: true,
  manage: true,
};
export interface User extends IdsObject{
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  totp: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  disableableCredentialTypes: any[];
  requiredActions: any[];
  notBefore: number;
  access: AccessUser;
}
export const user0: User ={
  id: "",
  createdTimestamp: 0,
  username: "",
  enabled: true,
  totp: false,
  emailVerified: false,
  firstName: "",
  lastName: "",
  email: "",
  disableableCredentialTypes: [],
  requiredActions: [],
  notBefore: 0,
  access: access0,
  design: ""
};
export interface UserSession{
  name:string 
  email:string
}
export const emptyUser:UserSession={"name":"","email":""}
export interface SessionToken{
  user:UserSession
  expires:Date 
  accessToken:string
}
export const emptySession:SessionToken={"user":emptyUser,"expires":new Date(),"accessToken":""}
export interface Chaine{
  val: string;
}
export interface Id{
  id: string;
}
export interface ArticleClientJson{
  content:ArticleClient[]
}
export interface ArticleClient extends IdsObject{
  id:string
  design:string
  poid:number
  prix:number
  date:Date
  idClient:string
  idFamilleArticle:string
  idFournisseur:string
  }
  export const articleClient0:  ArticleClient={
    id:"",
    design:"",
    poid:0,
    prix:0,
    //@ts-ignore
    date:"",
    idClient:"",
    idFamilleArticle:"",
    idFournisseur:"",
    }
export const code0: Id ={
  id: ""
}


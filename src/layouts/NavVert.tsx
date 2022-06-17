import { openOneUserByEmail } from 'config/rtk/RtkUser';
import { getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import {
    BUREAU_DOUANE,
    CLIENT_MANAGER,
    COLISAGE_MANAGER,
    DECLARANT_GES,
    DEVISE_MANAGER,
    DOCUMENT_MANAGER,
    FAMILLE_ARTICLE,
    FAMILLE_MATIERE_PREMIERE,
    INCOTERM_GES,
    MODE_PAYEMENT,
    PAYS_MANAGER,
    PURCHASE_MANAGER,
    REGIME_DOUANIER,
    ROLE_MANAGER,
    TRANSPORTEUR_MANAGER,
    TYPE_MANAGER,
    UNIT_MEASURE,
    VENDOR_MANAGER,
    VILLE_MANAGER,
    GEST_PRODUCTION,
} from 'tools/consts';
import Icon from 'widgets/Icon';

type NavVertProps = {
	updateSel: (s: number) => void;
};


const NavVert = ({ updateSel }: NavVertProps) => {
	const route = useRouter();
	const [sous, setSous] = useState(-1);
	const prev = useRef(-1);

  const session2= getSession();
  const [email,setEmail] = useState("")
  session2.then((val)=> setEmail(val?.user?.email))

  const openToOneClient = openOneUserByEmail(email)
  const dataUser = openToOneClient.data

	//  console.log("route = " + JSON.stringify(route));
	useEffect(() => {
		prev.current = sous;
	}, []);

  const menuVert = (dataUser?.role == "Admin") ? [
    {
      id: 7,
      icon: "home",
      text: "Acceuil",
      link: "/",
      active: route.pathname == "/",
      sous: [],
    },
    {
      id: VENDOR_MANAGER,
      icon: "truck",
      text: "Gestion Fournisseurs",
      link: "/manager/vendor/VendorManager",
      active:
        route.pathname == "/manager/vendor/VendorManager" ||
        route.pathname == "/manager/vendor/CommandeVendor" ||
        route.pathname == "/manager/vendor/RawMaterielManager" ||
        route.pathname == "/manager/vendor/CommandeVendorManager",
      sous: [],
    },
    {id:30,
        icon: "user-circle",
        text: "Gestion Utilisateur",
        link: "/gestionutilisateur/GestionUtilisateur",
        active: route.pathname == "/gestionutilisateur/GestionUtilisateur",
        sous:[]
    },
    {
      id: GEST_PRODUCTION,
      icon: "shopping-bag",
      text: "Gestion Productions",
      link: "/manager/production/FicheProduction",
      active:
        route.pathname == "/manager/production/FicheProduction" ||
        route.pathname == "/manager/production/Articles" ||
        route.pathname == "/manager/production/HistoriqueProduction",
      sous: [],
    },
    {
      id: COLISAGE_MANAGER,
      icon: "save",
      text: "Gestion de colisage",
      link: "/manager/colisage/GestionColisage",
      active: route.pathname == "/manager/colisage/GestionColisage",
      sous: []
    },
    {
      id: 13,
      icon: "table",
      text: "Gestion des Tables",
      // link: "/reference/unitMeasure/NewUnitMeasure",
      link: "/reference/article/NewArticle",
      active:
        route.pathname == "/reference/article/NewArticle" ||
        route.pathname == "/reference/rawMaterial/NewRawMaterial",
      sous: [
        {
          id: FAMILLE_ARTICLE,
          text: "Familles Article",
          link: "/reference/article/NewArticle",
          active: route.pathname == "/reference/article/NewArticle",
        },
        {
          id: FAMILLE_MATIERE_PREMIERE,
          text: "Familles Matière première",
          link: "/reference/rawMaterial/NewRawMaterial",
          active: route.pathname == "/reference/rawMaterial/NewRawMaterial",
        },
      ],
    },
  ] :  (dataUser?.role == "Responsable de colisage") ? [
    {
      id: 7,
      icon: "home",
      text: "Acceuil",
      link: "/",
      active: route.pathname == "/",
      sous: [],
    },
    {
      id: COLISAGE_MANAGER,
      icon: "save",
      text: "Gestion de colisage",
      link: "/manager/colisage/GestionColisage",
      active: route.pathname == "/manager/colisage/GestionColisage",
      sous: []
    },
  ] : (dataUser?.role == "Responsable de production") ? [
    {
      id: 7,
      icon: "home",
      text: "Acceuil",
      link: "/",
      active: route.pathname == "/",
      sous: [],
    },
    {
      id: GEST_PRODUCTION,
      icon: "shopping-bag",
      text: "Gestion Productions",
      link: "/manager/production/FicheProduction",
      active:
        route.pathname == "/manager/production/FicheProduction" ||
        route.pathname == "/manager/production/Articles" ||
        route.pathname == "/manager/production/HistoriqueProduction",
      sous: [],
    },
  ] : (dataUser?.role == "Utilisateur") ? [
    {
      id: 7,
      icon: "home",
      text: "Acceuil",
      link: "/",
      active: route.pathname == "/",
      sous: [],
    },
  ] : [] ;

  const router = useRouter();

  onload = () => {
    setTimeout(() => {
      if(menuVert == []){
        router.push({
          pathname: '/login',
          query: { returnUrl: router.asPath }
        });
      }
    }, 3000);
  }
	
	useEffect(() => {});
	return (
		<div>
			<ul className='nav-horiz bg-[#2d2e2e] h-full object-fill'>
				<h2 className='bg-[#000] bg-opacity-10 text-[#fff] w-full float-left py-2.5'>
					GESTION COMMERCIAL{" "}
				</h2>
				{menuVert?.map((item) => (
					<li
						key={item.icon}
						className={
							"cursor-pointer text-sm text-[#fff] w-full float-left py-2.5 " +
							(item.active
								? "border-l-2 border-white bg-opacity-10 bg-[#000]"
								: "border-l-0 bg-transparent")
						}
						/*  onClick={() => {
              updateSel(item.id);
              setSous(item.id);
           }} */
					>
						<Link href={item.link || ""}>
							<a>
								<span className='icon'>
									<Icon i={item.icon} cl='' />
								</span>
								<span className='text'>{item.text}</span>
							</a>
						</Link>
						{item.active && (
							<ul className='ml-20 list-[disclosure-closed] mt-8'>
								{item.sous.map((sItem) => (
									<li
										key={sItem.id}
										className={
											"cursor-pointer text-sm text-[#fff] w-full float-left py-2.5 " +
											(sItem.active
												? "border-l-2 border-white bg-opacity-10 bg-[#000]"
												: "border-l-0 bg-transparent")
										}
										onClick={() => updateSel(sItem.id)}>
										<Link href={sItem.link}>
											<a>
												<span className='text bold'>{sItem.text}</span>
											</a>
										</Link>
									</li>
								))}
							</ul>
						)}
					</li>
				))}
				<div className='w-full flex justify-center py-5 float-left mt-44'>
					<img src='/images/logo.png' alt='' />
				</div>
			</ul>
		</div>
	);
};

export default NavVert;

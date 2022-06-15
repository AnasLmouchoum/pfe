import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import { Action, combineReducers, configureStore, StoreEnhancer, ThunkAction } from '@reduxjs/toolkit';
import { crudArticle } from 'components/gestionProduction/rtk/RtkArticle';
import { crudArticleCommande } from 'components/gestionProduction/rtk/RtkArticleCommande';
import { crudCalculProduct } from 'components/gestionProduction/rtk/RtkCalculProduct';
import { crudClient } from 'components/gestionProduction/rtk/RtkClient';
import { crudCommande } from 'components/gestionProduction/rtk/RtkCommande';
import { crudFamilleArticle } from 'components/gestionProduction/rtk/RtkFamilleArticle';
import { crudFournisseur } from 'components/gestionProduction/rtk/RtkFournisseur';
import { crudMatiere } from 'components/gestionProduction/rtk/RtkMatiere';
import { crudProduct } from 'components/gestionProduction/rtk/RtkProduct';
import counterReducer from 'features/counter/counterSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import customOfflineConfig from './offline';
import { crudAdressLiv } from './rtk/RtkAdressLiv';
import { crudArticleClient } from './rtk/RtkArticleClient';
import { crudBureauDouane } from './rtk/rtkBureauDouane';
import { crudColis } from './rtk/rtkColis';
import { crudColisage } from './rtk/rtkColisage';
import { crudColisPalette } from './rtk/rtkColisPalette';
import { crudDeclarant } from './rtk/rtkDeclarant';
import { crudDevise } from './rtk/rtkDevise';
import { crudDocument } from './rtk/rtkDocument';
import { crudGeneric } from './rtk/rtkGen';
import { crudIncoterm } from './rtk/rtkIncoterm';
import { crudPalette } from './rtk/rtkPalette';
import { crudPayementMode } from './rtk/rtkPayementMode';
import { crudPays } from './rtk/rtkPays';
import { crudRawMaterial } from './rtk/rtkRawMaterial';
import { crudRegimeDouanier } from './rtk/rtkRegimeDouanier';
import { crudRole } from './rtk/rtkRole';
import { crudTransporteur } from './rtk/rtkTransporteur';
import { crudType } from './rtk/rtkType';
import { crudUnitMeasure } from './rtk/rtkUnitMeasure';
import { crudVille } from './rtk/rtkVille';

const {
	middleware: offlineMiddleware,
	enhanceReducer: offlineEnhanceReducer,
	enhanceStore: offlineEnhanceStore,
} = createOffline({
	...offlineConfig,
	persist: undefined,
	...customOfflineConfig,
});

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

export function makeStore() {
	const rootReducer = combineReducers({
		counter: counterReducer,
		// [crudFournisseur.reducerPath]: crudFournisseur.reducer,
		[crudVille.reducerPath]: crudVille.reducer,
		[crudType.reducerPath]: crudType.reducer,
		[crudTransporteur.reducerPath]: crudTransporteur.reducer,
		[crudRole.reducerPath]: crudRole.reducer,
		[crudPays.reducerPath]: crudPays.reducer,
		[crudDocument.reducerPath]: crudDocument.reducer,
		[crudDevise.reducerPath]: crudDevise.reducer,
		// [crudCommande.reducerPath]: crudCommande.reducer,
		[crudBureauDouane.reducerPath]: crudBureauDouane.reducer,
		// [crudArticle.reducerPath]: crudArticle.reducer,
		[crudRegimeDouanier.reducerPath]: crudRegimeDouanier.reducer,
		[crudRawMaterial.reducerPath]: crudRawMaterial.reducer,
		[crudDeclarant.reducerPath]: crudDeclarant.reducer,
		[crudIncoterm.reducerPath]: crudIncoterm.reducer,
		[crudUnitMeasure.reducerPath]: crudUnitMeasure.reducer,
		// [crudClient.reducerPath]: crudClient.reducer,
		[crudAdressLiv.reducerPath]: crudAdressLiv.reducer,
		// [crudArticleCommande.reducerPath]: crudArticleCommande.reducer,
		[crudArticleClient.reducerPath]: crudArticleClient.reducer,
		[crudPayementMode.reducerPath]: crudPayementMode.reducer,
		[crudColisage.reducerPath]: crudColisage.reducer,
		[crudColis.reducerPath]: crudColis.reducer,
		[crudPalette.reducerPath]: crudPalette.reducer,
		[crudColisPalette.reducerPath]: crudColisPalette.reducer,
		[crudGeneric.reducerPath]: crudGeneric.reducer,

		[crudProduct.reducerPath]: crudProduct.reducer,
		[crudArticle.reducerPath]: crudArticle.reducer,
		[crudMatiere.reducerPath]: crudMatiere.reducer,
		[crudClient.reducerPath]: crudClient.reducer,
		[crudFournisseur.reducerPath]: crudFournisseur.reducer,
		[crudFamilleArticle.reducerPath]: crudFamilleArticle.reducer,
		[crudCommande.reducerPath]: crudCommande.reducer,
		[crudArticleCommande.reducerPath]: crudArticleCommande.reducer,
		[crudCalculProduct.reducerPath]: crudCalculProduct.reducer,
	});
	/*
	 */
	const persistedReducer = persistReducer(
		persistConfig,
		offlineEnhanceReducer(rootReducer),
	);
	const store = configureStore({
		reducer: persistedReducer,
		enhancers: [offlineEnhanceStore as StoreEnhancer],
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			})
				.concat([crudVille.middleware, offlineMiddleware])
				.concat([crudType.middleware, offlineMiddleware])
				.concat([crudFournisseur.middleware, offlineMiddleware])
				.concat([crudTransporteur.middleware, offlineMiddleware])
				.concat([crudRole.middleware, offlineMiddleware])
				.concat([crudPays.middleware, offlineMiddleware])
				.concat([crudDocument.middleware, offlineMiddleware])
				.concat([crudDevise.middleware, offlineMiddleware])
				.concat([crudCommande.middleware, offlineMiddleware])
				.concat([crudBureauDouane.middleware, offlineMiddleware])
				.concat([crudArticle.middleware, offlineMiddleware])
				.concat([crudRegimeDouanier.middleware, offlineMiddleware])
				.concat([crudRawMaterial.middleware, offlineMiddleware])
				.concat([crudDeclarant.middleware, offlineMiddleware])
				.concat([crudIncoterm.middleware, offlineMiddleware])
				.concat([crudUnitMeasure.middleware, offlineMiddleware])
				.concat([crudClient.middleware, offlineMiddleware])
				.concat([crudAdressLiv.middleware, offlineMiddleware])
				.concat([crudArticleCommande.middleware, offlineMiddleware])
				.concat([crudArticleClient.middleware, offlineMiddleware])
				.concat([crudPayementMode.middleware, offlineMiddleware])
				.concat([crudColisage.middleware, offlineMiddleware])
				.concat([crudColis.middleware, offlineMiddleware])
				.concat([crudPalette.middleware, offlineMiddleware])
				.concat([crudColisPalette.middleware, offlineMiddleware])
				.concat([crudGeneric.middleware, offlineMiddleware]),
	});
	return store;
}

const store = makeStore();
export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action<string>
>;

export default store;
export type RootState = ReturnType<typeof store.getState>;

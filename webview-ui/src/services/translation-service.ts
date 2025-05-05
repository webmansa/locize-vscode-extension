

// export class TranslationService {
//   constructor(private axios: NuxtAxiosInstance) {}

//   async getRelatedTopics(productId: string): Promise<RelatedTopics[]> {
//     // eslint-disable-next-line max-len
//     const { data } = await this.axios.get<RelatedTopics[]>(
//       `/backend/product-detail-page/v1/${productId}/related-topics/`
//     );
//     return data;
//   }

//   async getCampaignData(productId: string): Promise<Campaign> {
//     const { data } = await this.axios.get<Campaign>(
//       `/backend/product-detail-page/v1/${productId}/campaigns/`
//     );
//     return data;
//   }

//   async getVariants(productId: string): Promise<Variant[]> {
//     // eslint-disable-next-line max-len
//     const { data } = await this.axios.get<Variant[]>(
//       `/backend/product-detail-page/v1/${productId}/product-variants/`
//     );
//     return data;
//   }

//   async getInfoCards(sellerId: string): Promise<InfoCards> {
//     const { data } = await this.axios.get<InfoCards>(
//       `/backend/product-detail-page/v1/${sellerId}/seller-info`
//     );
//     return data;
//   }

//   async getCustomerRecommender(productId: string): Promise<RecommenderData> {
//     // eslint-disable-next-line max-len
//     const { data } = await this.axios.get<RecommenderData>(
//       `/backend/recommendations/v1/careco?id_item=${productId}`
//     );
//     return data;
//   }

//   async getSimilarRecommender(productId: string): Promise<RecommenderData> {
//     // eslint-disable-next-line max-len
//     const { data } = await this.axios.get<RecommenderData>(
//       `/backend/recommendations/v1/simreco?id_item=${productId}&num_results=15&mode=fallback`
//     );
//     return data;
//   }

//   async getSimilarRecommenderTest(productId: string): Promise<RecommenderData> {
//     // eslint-disable-next-line max-len
//     const { data } = await this.axios.get<RecommenderData>(
//       `/backend/recommendations/v1/simreco?id_item=${productId}&num_results=15&mode=fallback&test=pdp`
//     );
//     return data;
//   }

//   async getSimilarRecommenderPopularityVariant(
//     productId: string
//   ): Promise<RecommenderData> {
//     // eslint-disable-next-line max-len
//     const { data } = await this.axios.get<RecommenderData>(
//       `/backend/recommendations/v1/simreco?id_item=${productId}&num_results=15&mode=fallback&rank_by_popularity=1&test=pdp`
//     );
//     return data;
//   }

//   async getSimilarRecommenderAlternativeBehavioralVariant(
//     productId: string
//   ): Promise<RecommenderData> {
//     // eslint-disable-next-line max-len
//     const { data } = await this.axios.get<RecommenderData>(
//       `/backend/recommendations/v1/simreco/additionalinfo?id_item=${productId}&num_results=15&api=co_comparison&test=pdp`
//     );
//     return data;
//   }

//   async getSimilarRecommenderCombinationVariant(
//     productId: string
//   ): Promise<RecommenderData> {
//     // eslint-disable-next-line max-len
//     const { data } = await this.axios.get<RecommenderData>(
//       `/backend/recommendations/v1/simreco/additionalinfo?id_item=${productId}&num_results=15&rank_by_popularity=1&api=co_comparison&test=pdp`
//     );
//     return data;
//   }

//   async getSpaRecommender(EAN: string): Promise<SpaRecommenderData> {
//     const { data } = await this.axios.get<SpaRecommenderData>(
//       `/backend/product-detail-page/v1/${EAN}/spads-recos`
//     );
//     return data;
//   }

//   async getHeaderMenuStructure(productId: string): Promise<HeaderMenuItem[]> {
//     // eslint-disable-next-line max-len
//     const { data } = await this.axios.get<HeaderMenuItem[]>(
//       `/backend/navigation/v1/header?path=/product/${productId}`
//     );
//     return data;
//   }

//   async getAdminTools(productId: string): Promise<AdminTools[]> {
//     const { data } = await this.axios.get<AdminTools[]>(
//       `/backend/product-detail-page/v1/${productId}/admin-tools/`
//     );
//     return data;
//   }

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   async getMrv(
//     productId: string,
//     params?: URLSearchParams | undefined
//   ): Promise<any> {
//     const data = await this.axios.get(
//       `/backend/product-detail-page/v1/${productId}/mrv-data/`,
//       { params }
//     );
//     return data;
//   }
// }
// // eslint-disable-next-line import/no-mutable-exports
// let $shopService: ShopService;

// export function setService(service: ShopService): void {
//   $shopService = service;
// }

// export function initializeShopService(axios: NuxtAxiosInstance): void {
//   setService(new ShopService(axios));
// }

// export { $shopService };

export class Translationservice {

}

let $translationService: Translationservice;


export { $translationService };
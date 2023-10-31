import '@/assets/img/product/A0001.jpg'
export const state = () => ({
  cosmetics:[
    {
      id: 1,
      code: 'A0001',
      category: 'skin',
      brand: '라네즈',
      name: '라네즈 크림스킨',
      src: require('@/assets/img/product/A0001.jpg'),
      price: 23760
    },
    {
      id: 2,
      code: 'A0002',
      category: 'makeup',
      brand: '정샘몰',
      name: '정샘몰 에센셜 스킨 누더 쿠션',
      src: require('assets/img/product/A0002.jpg'),
      price: 33600
    },
    {
      id: 3,
      code: 'A0003',
      category: 'skin',
      brand: '한율',
      name: '한율 어린쑥 수분진정 크림',
      src: require('assets/img/product/A0003.jpg'),
      price: 23760
    },
    {
      id: 4,
      code: 'A0004',
      category: 'treatments',
      brand: '힐링버드',
      name: '힐링버드 노워시 엠플 트리트먼트',
      src: require('assets/img/product/A0004.jpg'),
      price: 23760
    },
    {
      id: 5,
      code: 'A0005',
      category: 'treatments',
      brand: '어노브',
      name: '어노브 대용량 딥 데미지 트리트먼트 EX듀오/더블 기획 2종 택1',
      src: require('assets/img/product/A0005.jpg'),
      price: 28900
    },
    {
      id: 6,
      code: 'A0006',
      category: 'skin',
      brand: '피지오겔',
      name: '[더블기획]피지오겔 DMT 페이셜 크림 100ml+100ml 기획세트',
      src: require('assets/img/product/A0006.jpg'),
      price: 29900
    },
    {
      id: 7,
      code: 'A0007',
      category: 'skin',
      brand: '차앤박',
      name: '차앤박(CNP)프로폴리스 액티브 앰플 30ml 트리플 기획',
      src: require('assets/img/product/A0007.jpg'),
      price: 42900
    },
    {
      id: 8,
      code: 'A0008',
      category: 'makeup',
      brand: 'VDL',
      name: '[인씨 PICK] VDL 커버 스테인 퍼펙팅 쿠션 리필 기획',
      src: require('assets/img/product/A0008.jpg'),
      price: 25500
    },
    {
      id: 9,
      code: 'A0009',
      category: 'treatments',
      brand: '어노브',
      name: '어노브 노워시 워터 앰플 트리트먼트 200ml+50ml증정 기획',
      src: require('assets/img/product/A0009.jpg'),
      price: 20000
    },
    {
      id: 10,
      code: 'A0010',
      category: 'treatments',
      brand: '어노브',
      name: '어노브 히팅 가드 노워시 트리트먼트 147ml',
      src: require('assets/img/product/A0010.jpg'),
      price: 13410
    },
    {
      id: 11,
      code: 'A0011',
      category: 'cleansing',
      brand: '라로슈포제',
      name: '라로슈포제 에빠끌라 퓨리파잉 포밍 젤',
      src: require('assets/img/product/A0011.jpg'),
      price: 28000
    },
    {
      id: 12,
      code: 'A0012',
      category: 'cleansing',
      brand: '아벤느',
      name: '아벤느 시칼파트+ 시카 클렌징 젤 200ml',
      src: require('assets/img/product/A0012.jpg'),
      price: 15400
    },
    {
      id: 13,
      code: 'A0013',
      category: 'makeup',
      brand: '더샘',
      name: '더샘 커버 퍼펙션 트리플 파운데이션 밤 (듀얼브러쉬 기획 한정컬러/단품)',
      src: require('assets/img/product/A0013.jpg'),
      price: 18200
    },
    {
      id: 14,
      code: 'A0014',
      category: 'makeup',
      brand: '투크',
      name: '[NEW] 투크 원 바이 제뉴인 마그네틱 아이 섀도우 13colors',
      src: require('assets/img/product/A0014.jpg'),
      price: 9700
    },
    {
      id: 15,
      code: 'A0015',
      category: 'cleansing',
      brand: '유리아쥬',
      name: '유리아쥬 미셀라 클렌징 워터 더블기획 (500ml + 500ml)',
      src: require('assets/img/product/A0015.jpg'),
      price: 28500
    },
    {
      id: 16,
      code: 'A0016',
      category: 'cleansing',
      brand: '아벤느',
      name: '아벤느 클리낭스 클렌징 젤 400ml *피지잡는 *약산성클렌저',
      src: require('assets/img/product/A0016.jpg'),
      price: 30000
    },
  ]
})
export const mutations = {

}
export const actions = {

}
export const getters = {
  cosmetics: (state) => state.cosmetics,
}

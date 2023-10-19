import '@/assets/img/product/A0001.jpg'
export const state = () => ({
  cosmetics:[
    {
      id: 1,
      code: 'A0001',
      brand: '라네즈',
      name: '라네즈 크림스킨',
      src: require('@/assets/img/product/A0001.jpg'),
      price: 23760
    },
    {
      id: 2,
      code: 'A0002',
      brand: '정샘몰',
      name: '정샘몰 에센셜 스킨 누더 쿠션',
      src: require('assets/img/product/A0002.jpg'),
      price: 33600
    },
    {
      id: 3,
      code: 'A0003',
      brand: '한율',
      name: '한율 어린쑥 수분진정 크림',
      src: require('assets/img/product/A0003.jpg'),
      price: 23760
    },
    {
      id: 4,
      code: 'A0004',
      brand: '힐링버드',
      name: '힐링버드 노워시 엠플 트리트먼트',
      src: require('assets/img/product/A0004.jpg'),
      price: 23760
    },
    {
      id: 5,
      code: 'A0005',
      brand: '어노브',
      name: '어노브 대용량 딥 데미지 트리트먼트 EX듀오/더블 기획 2종 택1',
      src: require('assets/img/product/A0005.jpg'),
      price: 28900
    },
    {
      id: 6,
      code: 'A0006',
      brand: '피지오겔',
      name: '[더블기획]피지오겔 DMT 페이셜 크림 100ml+100ml 기획세트',
      src: require('assets/img/product/A0006.jpg'),
      price: 29900
    },
    {
      id: 7,
      code: 'A0007',
      brand: '차앤박',
      name: '차앤박(CNP)프로폴리스 액티브 앰플 30ml 트리플 기획',
      src: require('assets/img/product/A0007.jpg'),
      price: 42900
    },
    {
      id: 8,
      code: 'A0008',
      brand: 'VDL',
      name: '[인씨 PICK] VDL 커버 스테인 퍼펙팅 쿠션 리필 기획',
      src: require('assets/img/product/A0008.jpg'),
      price: 25500
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

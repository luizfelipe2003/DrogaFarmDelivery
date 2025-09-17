export const mockData = {
  promotions: [
    {
      id: 1,
      name: 'Dipirona 500mg',
      price: 8.90,
      originalPrice: 12.50,
      discount: '29%',
      image: 'https://via.placeholder.com/150x150/4A90E2/FFFFFF?text=Dipirona'
    },
    {
      id: 2,
      name: 'Vitamina C 1g',
      price: 15.90,
      originalPrice: 22.00,
      discount: '28%',
      image: 'https://via.placeholder.com/150x150/4A90E2/FFFFFF?text=Vit+C'
    },
    {
      id: 3,
      name: 'Protetor Solar FPS 60',
      price: 35.90,
      originalPrice: 49.90,
      discount: '28%',
      image: 'https://via.placeholder.com/150x150/4A90E2/FFFFFF?text=Protetor'
    }
  ],

  pharmacies: [
    { id: 1, name: 'Farmácia Central', distance: '0.5 km', rating: 4.8 },
    { id: 2, name: 'Drogaria Popular', distance: '1.2 km', rating: 4.6 },
    { id: 3, name: 'Farmácia Saúde', distance: '2.1 km', rating: 4.7 }
  ],

  paymentMethods: [
    { id: 1, name: 'Cartão de Crédito', icon: '💳' },
    { id: 2, name: 'PIX', icon: '📱' },
    { id: 3, name: 'Dinheiro', icon: '💵' }
  ]
};
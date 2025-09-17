import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import CustomInput from '../components/CustomInput';
import ProductCard from '../components/ProductCard';
import CustomButton from '../components/CustomButton';
import { mockData } from '../services/DataService';
import { StorageService } from '../services/StorageService';

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [userName, setUserName] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const user = await StorageService.getUser();
    if (user) {
      setUserName(user.name);
    }
  };

  const handleProductPress = (product) => {
    const isSelected = selectedProducts.find(p => p.id === product.id);
    
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
      Alert.alert('Produto removido', `${product.name} foi removido do carrinho`);
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
      Alert.alert('Produto adicionado', `${product.name} foi adicionado ao carrinho`);
    }
  };

  const handlePharmacyPress = (pharmacy) => {
    Alert.alert('Farmácia selecionada', `Você selecionou: ${pharmacy.name}`);
  };

  const goToPayment = () => {
    if (selectedProducts.length === 0) {
      Alert.alert('Carrinho vazio', 'Selecione pelo menos um produto para continuar');
      return;
    }
    navigation.navigate('Payment', { products: selectedProducts });
  };

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          onPress: async () => {
            await StorageService.clearUserData();
            navigation.replace('Login');
          }
        }
      ]
    );
  };

  const renderProductItem = ({ item }) => (
    <ProductCard 
      product={item} 
      onPress={() => handleProductPress(item)}
    />
  );

  const renderPharmacyItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.pharmacyCard}
      onPress={() => handlePharmacyPress(item)}
    >
      <View style={styles.pharmacyInfo}>
        <Text style={styles.pharmacyName}>{item.name}</Text>
        <Text style={styles.pharmacyDistance}>{item.distance}</Text>
        <Text style={styles.pharmacyRating}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Olá, {userName}!</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
        
        <CustomInput
          placeholder="Buscar produtos..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔥 Promoções</Text>
        <FlatList
          data={mockData.promotions}
          renderItem={renderProductItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.promotionsList}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏥 Farmácias Próximas</Text>
        <FlatList
          data={mockData.pharmacies}
          renderItem={renderPharmacyItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
        />
      </View>

      {selectedProducts.length > 0 && (
        <View style={styles.cartContainer}>
          <Text style={styles.cartText}>
            {selectedProducts.length} item(s) no carrinho
          </Text>
          <CustomButton
            title="Ir para Pagamento"
            onPress={goToPayment}
            style={styles.paymentButton}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  searchInput: {
    marginVertical: 0,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  promotionsList: {
    paddingHorizontal: 10,
  },
  pharmacyCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pharmacyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  pharmacyDistance: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 10,
  },
  pharmacyRating: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  cartContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  paymentButton: {
    backgroundColor: '#28A745',
  },
});

export default HomeScreen;
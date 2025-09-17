import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [screen, setScreen] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cart, setCart] = useState([]);
  const [rating, setRating] = useState(0);

  const products = [
    { id: 1, name: 'Dipirona 500mg', price: 8.90, originalPrice: 12.50 },
    { id: 2, name: 'Vitamina C 1g', price: 15.90, originalPrice: 22.00 },
    { id: 3, name: 'Protetor Solar FPS 60', price: 35.90, originalPrice: 49.90 }
  ];

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    await AsyncStorage.setItem('user', JSON.stringify({ email, name: 'Usuário' }));
    setScreen('home');
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    Alert.alert('Sucesso', 'Produto adicionado ao carrinho');
  };

  const goToPayment = () => {
    if (cart.length === 0) {
      Alert.alert('Erro', 'Carrinho vazio');
      return;
    }
    setScreen('payment');
  };

  const confirmPurchase = () => {
    Alert.alert('Sucesso', 'Pedido confirmado!', [
      { text: 'OK', onPress: () => setScreen('feedback') }
    ]);
  };

  const submitFeedback = () => {
    if (rating === 0) {
      Alert.alert('Erro', 'Selecione uma avaliação');
      return;
    }
    Alert.alert('Obrigado!', 'Feedback enviado!', [
      { text: 'OK', onPress: () => setScreen('home') }
    ]);
  };

  if (screen === 'login') {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.logo}>
          <Text style={styles.logoText}>🏥</Text>
        </View>
        <Text style={styles.title}>DrogaFarm Delivery</Text>
        
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setScreen('register')}>
          <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === 'register') {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Criar Conta</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={[styles.button, {backgroundColor: '#28A745'}]} onPress={() => {
          if (!name || !email || !password) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
          }
          Alert.alert('Sucesso', 'Cadastro realizado!', [
            { text: 'OK', onPress: () => setScreen('home') }
          ]);
        }}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setScreen('login')}>
          <Text style={styles.link}>Voltar ao Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === 'home') {
    return (
      <ScrollView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.header}>
          <Text style={styles.welcome}>Olá, Usuário!</Text>
          <TouchableOpacity onPress={() => setScreen('login')}>
            <Text style={styles.logout}>Sair</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>🔥 Promoções</Text>
        
        {products.map(product => (
          <View key={product.id} style={styles.productCard}>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.oldPrice}>R$ {product.originalPrice}</Text>
              <Text style={styles.price}>R$ {product.price}</Text>
            </View>
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={() => addToCart(product)}
            >
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        ))}
        
        {cart.length > 0 && (
          <TouchableOpacity style={styles.cartButton} onPress={goToPayment}>
            <Text style={styles.buttonText}>
              Carrinho ({cart.length}) - Ir para Pagamento
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  }

  if (screen === 'payment') {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    return (
      <ScrollView style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Pagamento</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
          {cart.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <Text>{item.name}</Text>
              <Text>R$ {item.price}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Método de Pagamento</Text>
          <TouchableOpacity style={styles.paymentOption}>
            <Text>💳 Cartão de Crédito</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <Text>📱 PIX</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={[styles.button, {backgroundColor: '#28A745'}]} onPress={confirmPurchase}>
          <Text style={styles.buttonText}>Confirmar Compra</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (screen === 'feedback') {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Como foi sua experiência?</Text>
        
        <Text style={styles.label}>Avalie nossa entrega:</Text>
        
        <View style={styles.starsRow}>
          {[1,2,3,4,5].map(star => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Text style={[styles.star, star <= rating && styles.starFilled]}>⭐</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={[styles.button, {backgroundColor: '#28A745'}]} onPress={submitFeedback}>
          <Text style={styles.buttonText}>Enviar Avaliação</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setScreen('home')}>
          <Text style={styles.link}>Pular por agora</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
  logo: { width: 80, height: 80, backgroundColor: '#4A90E2', borderRadius: 40, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 20 },
  logoText: { fontSize: 40 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#333' },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 25, padding: 15, marginBottom: 15, backgroundColor: '#FFF' },
  button: { backgroundColor: '#4A90E2', padding: 15, borderRadius: 25, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  link: { textAlign: 'center', color: '#4A90E2', fontSize: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  welcome: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  logout: { color: '#FF6B6B', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  productCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 10 },
  productName: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  oldPrice: { textDecorationLine: 'line-through', color: '#999', marginRight: 10 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#4A90E2' },
  addButton: { backgroundColor: '#28A745', padding: 8, borderRadius: 15, alignItems: 'center' },
  addButtonText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  cartButton: { backgroundColor: '#28A745', padding: 15, borderRadius: 25, alignItems: 'center', marginTop: 20 },
  section: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 15 },
  orderItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  totalRow: { borderTopWidth: 1, borderTopColor: '#E0E0E0', paddingTop: 10, marginTop: 10 },
  totalText: { fontSize: 18, fontWeight: 'bold', textAlign: 'right' },
  paymentOption: { padding: 15, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, marginBottom: 10 },
  label: { fontSize: 16, marginBottom: 15, textAlign: 'center' },
  starsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 30 },
  star: { fontSize: 30, marginHorizontal: 5, opacity: 0.3 },
  starFilled: { opacity: 1 }
});

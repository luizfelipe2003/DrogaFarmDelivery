import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert
} from 'react-native';
import CustomButton from '../components/CustomButton';
import { mockData } from '../services/DataService';

const PaymentScreen = ({ navigation, route }) => {
  const { products } = route.params;
  const [selectedPayment, setSelectedPayment] = useState(null);

  const calculateTotal = () => {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handleConfirmPurchase = () => {
    if (!selectedPayment) {
      Alert.alert('Erro', 'Selecione um método de pagamento');
      return;
    }

    Alert.alert(
      'Pedido Confirmado!',
      `Seu pedido foi confirmado e será entregue em breve.\nTotal: R$ ${calculateTotal().toFixed(2)}\nPagamento: ${selectedPayment.name}`,
      [
        { 
          text: 'OK', 
          onPress: () => navigation.navigate('Feedback', { 
            orderId: Math.random().toString(36).substr(2, 9).toUpperCase()
          })
        }
      ]
    );
  };

  const renderProductItem = (product, index) => (
    <View key={index} style={styles.productItem}>
      <Text style={styles.productName}>{product.name}</Text>
      <View style={styles.productDetails}>
        <Text style={styles.productQuantity}>Qtd: {product.quantity}</Text>
        <Text style={styles.productPrice}>R$ {(product.price * product.quantity).toFixed(2)}</Text>
      </View>
    </View>
  );

  const renderPaymentMethod = (method) => (
    <TouchableOpacity
      key={method.id}
      style={[
        styles.paymentMethod,
        selectedPayment?.id === method.id && styles.selectedPayment
      ]}
      onPress={() => handlePaymentSelect(method)}
    >
      <Text style={styles.paymentIcon}>{method.icon}</Text>
      <Text style={[
        styles.paymentText,
        selectedPayment?.id === method.id && styles.selectedPaymentText
      ]}>
        {method.name}
      </Text>
      {selectedPayment?.id === method.id && (
        <Text style={styles.checkmark}>✓</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
        <View style={styles.orderSummary}>
          {products.map((product, index) => renderProductItem(product, index))}
          
          <View style={styles.divider} />
          
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>R$ {calculateTotal().toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Método de Pagamento</Text>
        <View style={styles.paymentMethods}>
          {mockData.paymentMethods.map(method => renderPaymentMethod(method))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Endereço de Entrega</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>📍 Rua das Flores, 123</Text>
          <Text style={styles.addressText}>Bairro Centro - CEP: 12345-678</Text>
          <Text style={styles.addressText}>Cidade, Estado</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Confirmar Compra"
          onPress={handleConfirmPurchase}
          style={styles.confirmButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  section: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  orderSummary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  productName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  productDetails: {
    alignItems: 'flex-end',
  },
  productQuantity: {
    fontSize: 14,
    color: '#666',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28A745',
  },
  paymentMethods: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  selectedPayment: {
    backgroundColor: '#E3F2FD',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectedPaymentText: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  checkmark: {
    fontSize: 18,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  addressContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addressText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 2,
  },
  buttonContainer: {
    padding: 20,
  },
  confirmButton: {
    backgroundColor: '#28A745',
    paddingVertical: 18,
  },
});

export default PaymentScreen;
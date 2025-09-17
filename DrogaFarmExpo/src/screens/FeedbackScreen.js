import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import CustomButton from '../components/CustomButton';

const FeedbackScreen = ({ navigation, route }) => {
  const { orderId } = route.params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleStarPress = (starRating) => {
    setRating(starRating);
  };

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      Alert.alert('Erro', 'Por favor, selecione uma avaliação');
      return;
    }

    setSubmitted(true);
    
    setTimeout(() => {
      Alert.alert(
        'Obrigado!',
        'Sua avaliação foi enviada com sucesso. Agradecemos seu feedback!',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.navigate('Home')
          }
        ]
      );
    }, 1000);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          style={styles.starButton}
        >
          <Text style={[
            styles.star,
            i <= rating ? styles.starFilled : styles.starEmpty
          ]}>
            ⭐
          </Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const getRatingText = () => {
    switch (rating) {
      case 1: return 'Muito Ruim';
      case 2: return 'Ruim';
      case 3: return 'Regular';
      case 4: return 'Bom';
      case 5: return 'Excelente';
      default: return 'Selecione uma avaliação';
    }
  };

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successIcon}>✅</Text>
        <Text style={styles.successTitle}>Feedback Enviado!</Text>
        <Text style={styles.successMessage}>
          Obrigado por avaliar nosso serviço. Sua opinião é muito importante para nós!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Como foi sua experiência?</Text>
        <Text style={styles.subtitle}>Pedido #{orderId}</Text>
      </View>

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>Avalie nossa entrega:</Text>
        
        <View style={styles.starsContainer}>
          {renderStars()}
        </View>
        
        <Text style={styles.ratingText}>{getRatingText()}</Text>
      </View>

      <View style={styles.commentContainer}>
        <Text style={styles.commentLabel}>Comentário (opcional):</Text>
        <TextInput
          style={styles.commentInput}
          placeholder="Conte-nos mais sobre sua experiência..."
          value={comment}
          onChangeText={setComment}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.motivationalContainer}>
        <Text style={styles.motivationalText}>
          💙 Sua opinião nos ajuda a melhorar cada vez mais!
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Enviar Avaliação"
          onPress={handleSubmitFeedback}
          style={styles.submitButton}
        />
        
        <TouchableOpacity 
          onPress={() => navigation.navigate('Home')}
          style={styles.skipButton}
        >
          <Text style={styles.skipText}>Pular por agora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  ratingContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  starButton: {
    marginHorizontal: 5,
  },
  star: {
    fontSize: 40,
  },
  starFilled: {
    opacity: 1,
  },
  starEmpty: {
    opacity: 0.3,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  commentContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  commentLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    backgroundColor: '#F8F9FA',
  },
  motivationalContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  motivationalText: {
    fontSize: 16,
    color: '#4A90E2',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonContainer: {
    padding: 20,
  },
  submitButton: {
    backgroundColor: '#28A745',
    marginBottom: 15,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  skipText: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'underline',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 40,
  },
  successIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28A745',
    marginBottom: 15,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default FeedbackScreen;
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {
  Camera,
  Image as ImageIcon,
  Send,
  Hash,
  Award,
  BookOpen,
} from 'lucide-react-native';

const subjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Programming',
  'Literature',
  'History',
  'Economics',
];

export default function AskScreen() {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionContent, setQuestionContent] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [pointsOffered, setPointsOffered] = useState('10');

  const handleSubmitQuestion = () => {
    if (!questionTitle.trim() || !questionContent.trim() || !selectedSubject) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    Alert.alert(
      'Question Posted!',
      'Your question has been posted successfully. You\'ll be notified when someone answers.',
      [{ text: 'OK', onPress: () => resetForm() }]
    );
  };

  const resetForm = () => {
    setQuestionTitle('');
    setQuestionContent('');
    setSelectedSubject('');
    setPointsOffered('10');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <BookOpen size={32} color="#3B82F6" />
          <View style={styles.headerText}>
            <Text style={styles.title}>Ask a Question</Text>
            <Text style={styles.subtitle}>Get help from your peers</Text>
          </View>
        </View>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        {/* Question Title */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Question Title *</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="What do you need help with?"
            value={questionTitle}
            onChangeText={setQuestionTitle}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Subject Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Subject *</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.subjectContainer}
          >
            {subjects.map((subject) => (
              <TouchableOpacity
                key={subject}
                style={[
                  styles.subjectChip,
                  selectedSubject === subject && styles.selectedSubjectChip,
                ]}
                onPress={() => setSelectedSubject(subject)}
              >
                <Text
                  style={[
                    styles.subjectChipText,
                    selectedSubject === subject && styles.selectedSubjectChipText,
                  ]}
                >
                  {subject}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Question Content */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Detailed Question *</Text>
          <TextInput
            style={styles.contentInput}
            placeholder="Provide more details about your question..."
            value={questionContent}
            onChangeText={setQuestionContent}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Points Offered */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Points to Offer</Text>
          <View style={styles.pointsContainer}>
            <Award size={20} color="#F59E0B" />
            <TextInput
              style={styles.pointsInput}
              value={pointsOffered}
              onChangeText={setPointsOffered}
              keyboardType="numeric"
              placeholder="10"
            />
            <Text style={styles.pointsLabel}>points</Text>
          </View>
          <Text style={styles.helperText}>
            Higher points attract more quality answers
          </Text>
        </View>

        {/* Attachment Options */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Add Attachments (Optional)</Text>
          <View style={styles.attachmentContainer}>
            <TouchableOpacity style={styles.attachmentButton}>
              <Camera size={24} color="#3B82F6" />
              <Text style={styles.attachmentButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.attachmentButton}>
              <ImageIcon size={24} color="#3B82F6" />
              <Text style={styles.attachmentButtonText}>Upload Image</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Tips for Better Answers</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Be specific about what you're struggling with</Text>
            <Text style={styles.tipItem}>• Include any work you've already done</Text>
            <Text style={styles.tipItem}>• Add relevant images or diagrams if helpful</Text>
            <Text style={styles.tipItem}>• Offer more points for complex questions</Text>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitQuestion}>
          <Send size={20} color="#FFFFFF" />
          <Text style={styles.submitButtonText}>Post Question</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  subjectContainer: {
    flexDirection: 'row',
  },
  subjectChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedSubjectChip: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  subjectChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedSubjectChipText: {
    color: '#FFFFFF',
  },
  contentInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    minHeight: 120,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  pointsInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  pointsLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  helperText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  attachmentContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  attachmentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 16,
    gap: 8,
  },
  attachmentButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  tipsContainer: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 12,
  },
  tipsList: {},
  tipItem: {
    fontSize: 14,
    color: '#92400E',
    marginBottom: 4,
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
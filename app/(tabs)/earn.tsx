import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  DollarSign,
  TrendingUp,
  Clock,
  MessageCircle,
  Star,
  Filter,
  Search,
} from 'lucide-react-native';

interface EarnOpportunity {
  id: string;
  title: string;
  content: string;
  subject: string;
  points: number;
  timeAgo: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  author: string;
}

const mockOpportunities: EarnOpportunity[] = [
  {
    id: '1',
    title: 'Help with calculus derivatives',
    content: 'Need explanation of chain rule and product rule with examples...',
    subject: 'Mathematics',
    points: 25,
    timeAgo: '5 minutes ago',
    difficulty: 'Medium',
    author: 'Alex P.',
  },
  {
    id: '2',
    title: 'React hooks explanation needed',
    content: 'Can someone explain useState and useEffect with practical examples?',
    subject: 'Programming',
    points: 30,
    timeAgo: '8 minutes ago',
    difficulty: 'Hard',
    author: 'Jessica L.',
  },
  {
    id: '3',
    title: 'Basic algebra help',
    content: 'Struggling with solving linear equations...',
    subject: 'Mathematics',
    points: 15,
    timeAgo: '15 minutes ago',
    difficulty: 'Easy',
    author: 'Tom R.',
  },
  {
    id: '4',
    title: 'Chemistry bonding concepts',
    content: 'Need help understanding ionic vs covalent bonds...',
    subject: 'Chemistry',
    points: 20,
    timeAgo: '22 minutes ago',
    difficulty: 'Medium',
    author: 'Maria S.',
  },
];

export default function EarnScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  
  const difficultyFilters = ['All', 'Easy', 'Medium', 'Hard'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return { bg: '#DCFCE7', text: '#16A34A' };
      case 'Medium':
        return { bg: '#FEF3C7', text: '#D97706' };
      case 'Hard':
        return { bg: '#FEE2E2', text: '#DC2626' };
      default:
        return { bg: '#F3F4F6', text: '#6B7280' };
    }
  };

  const renderOpportunityCard = (opportunity: EarnOpportunity) => {
    const difficultyColors = getDifficultyColor(opportunity.difficulty);
    
    return (
      <TouchableOpacity key={opportunity.id} style={styles.opportunityCard}>
        <View style={styles.cardHeader}>
          <View style={styles.subjectBadge}>
            <Text style={styles.subjectText}>{opportunity.subject}</Text>
          </View>
          <View style={styles.pointsBadge}>
            <DollarSign size={14} color="#10B981" />
            <Text style={styles.pointsText}>{opportunity.points} pts</Text>
          </View>
        </View>
        
        <Text style={styles.opportunityTitle}>{opportunity.title}</Text>
        <Text style={styles.opportunityContent}>{opportunity.content}</Text>
        
        <View style={styles.cardMeta}>
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: difficultyColors.bg },
            ]}
          >
            <Text style={[styles.difficultyText, { color: difficultyColors.text }]}>
              {opportunity.difficulty}
            </Text>
          </View>
          <View style={styles.timeContainer}>
            <Clock size={14} color="#6B7280" />
            <Text style={styles.timeText}>{opportunity.timeAgo}</Text>
          </View>
        </View>
        
        <View style={styles.cardFooter}>
          <View style={styles.authorInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{opportunity.author[0]}</Text>
            </View>
            <Text style={styles.authorName}>{opportunity.author}</Text>
          </View>
          
          <TouchableOpacity style={styles.answerButton}>
            <MessageCircle size={16} color="#FFFFFF" />
            <Text style={styles.answerButtonText}>Answer</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TrendingUp size={32} color="#10B981" />
          <View style={styles.headerText}>
            <Text style={styles.title}>Earn Points</Text>
            <Text style={styles.subtitle}>Help others and get rewarded</Text>
          </View>
        </View>
        
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>247</Text>
            <Text style={styles.statLabel}>Points Earned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>Questions Answered</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
        </View>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search opportunities..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      {/* Difficulty Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {difficultyFilters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              selectedDifficulty === filter && styles.activeFilterTab,
            ]}
            onPress={() => setSelectedDifficulty(filter)}
          >
            <Text
              style={[
                styles.filterTabText,
                selectedDifficulty === filter && styles.activeFilterTabText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Opportunities List */}
      <ScrollView style={styles.opportunitiesContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Questions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Refresh</Text>
          </TouchableOpacity>
        </View>
        
        {mockOpportunities.map(renderOpportunityCard)}
      </ScrollView>
    </View>
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
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
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
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10B981',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeFilterTab: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  opportunitiesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  opportunityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  subjectText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  opportunityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  opportunityContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  answerButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
  },
  answerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
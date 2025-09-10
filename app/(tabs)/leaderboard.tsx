import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Star,
  Crown,
} from 'lucide-react-native';

interface LeaderboardUser {
  id: string;
  name: string;
  points: number;
  answers: number;
  rating: number;
  rank: number;
  badge: 'gold' | 'silver' | 'bronze' | 'none';
}

const mockLeaderboard: LeaderboardUser[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    points: 2847,
    answers: 145,
    rating: 4.9,
    rank: 1,
    badge: 'gold',
  },
  {
    id: '2',
    name: 'Michael Chen',
    points: 2641,
    answers: 132,
    rating: 4.8,
    rank: 2,
    badge: 'silver',
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    points: 2398,
    answers: 118,
    rating: 4.8,
    rank: 3,
    badge: 'bronze',
  },
  {
    id: '4',
    name: 'David Kim',
    points: 2156,
    answers: 98,
    rating: 4.7,
    rank: 4,
    badge: 'none',
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    points: 1934,
    answers: 87,
    rating: 4.6,
    rank: 5,
    badge: 'none',
  },
  {
    id: '6',
    name: 'Alex Wilson',
    points: 1823,
    answers: 79,
    rating: 4.5,
    rank: 6,
    badge: 'none',
  },
  {
    id: '7',
    name: 'Jessica Brown',
    points: 1687,
    answers: 73,
    rating: 4.4,
    rank: 7,
    badge: 'none',
  },
];

const currentUser = {
  name: 'You',
  points: 247,
  answers: 18,
  rating: 4.2,
  rank: 47,
};

export default function LeaderboardScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('All Time');
  
  const periods = ['This Week', 'This Month', 'All Time'];

  const getBadgeIcon = (badge: string, rank: number) => {
    switch (badge) {
      case 'gold':
        return <Crown size={24} color="#FFD700" />;
      case 'silver':
        return <Medal size={24} color="#C0C0C0" />;
      case 'bronze':
        return <Award size={24} color="#CD7F32" />;
      default:
        return (
          <View style={styles.rankNumber}>
            <Text style={styles.rankText}>{rank}</Text>
          </View>
        );
    }
  };

  const renderLeaderboardItem = (user: LeaderboardUser, index: number) => (
    <View
      key={user.id}
      style={[
        styles.leaderboardItem,
        index < 3 && styles.topThreeItem,
      ]}
    >
      <View style={styles.rankContainer}>
        {getBadgeIcon(user.badge, user.rank)}
      </View>
      
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name[0]}</Text>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{user.name}</Text>
          <View style={styles.userStats}>
            <Text style={styles.statText}>{user.answers} answers</Text>
            <View style={styles.ratingContainer}>
              <Star size={12} color="#F59E0B" />
              <Text style={styles.ratingText}>{user.rating}</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsValue}>{user.points.toLocaleString()}</Text>
        <Text style={styles.pointsLabel}>points</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Trophy size={32} color="#F59E0B" />
          <View style={styles.headerText}>
            <Text style={styles.title}>Leaderboard</Text>
            <Text style={styles.subtitle}>Top contributors</Text>
          </View>
        </View>
      </View>

      {/* Your Rank Card */}
      <View style={styles.yourRankCard}>
        <View style={styles.yourRankHeader}>
          <Text style={styles.yourRankTitle}>Your Rank</Text>
          <View style={styles.rankBadge}>
            <Text style={styles.rankBadgeText}>#{currentUser.rank}</Text>
          </View>
        </View>
        
        <View style={styles.yourRankStats}>
          <View style={styles.yourStatItem}>
            <Text style={styles.yourStatValue}>{currentUser.points}</Text>
            <Text style={styles.yourStatLabel}>Points</Text>
          </View>
          <View style={styles.yourStatItem}>
            <Text style={styles.yourStatValue}>{currentUser.answers}</Text>
            <Text style={styles.yourStatLabel}>Answers</Text>
          </View>
          <View style={styles.yourStatItem}>
            <Text style={styles.yourStatValue}>{currentUser.rating}</Text>
            <Text style={styles.yourStatLabel}>Rating</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.improveButton}>
          <TrendingUp size={16} color="#3B82F6" />
          <Text style={styles.improveButtonText}>Improve Rank</Text>
        </TouchableOpacity>
      </View>

      {/* Period Filter */}
      <View style={styles.periodContainer}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodTab,
              selectedPeriod === period && styles.activePeriodTab,
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text
              style={[
                styles.periodTabText,
                selectedPeriod === period && styles.activePeriodTabText,
              ]}
            >
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Top 3 Podium */}
      <View style={styles.podiumContainer}>
        <View style={styles.podium}>
          {/* 2nd Place */}
          <View style={styles.podiumPosition}>
            <View style={[styles.podiumAvatar, styles.silverAvatar]}>
              <Text style={styles.podiumAvatarText}>M</Text>
            </View>
            <View style={[styles.podiumBar, styles.silverBar]}>
              <Text style={styles.podiumRank}>2</Text>
            </View>
            <Text style={styles.podiumName}>Michael</Text>
            <Text style={styles.podiumPoints}>2,641</Text>
          </View>

          {/* 1st Place */}
          <View style={[styles.podiumPosition, styles.firstPlace]}>
            <Crown size={24} color="#FFD700" style={styles.crownIcon} />
            <View style={[styles.podiumAvatar, styles.goldAvatar]}>
              <Text style={styles.podiumAvatarText}>S</Text>
            </View>
            <View style={[styles.podiumBar, styles.goldBar]}>
              <Text style={styles.podiumRank}>1</Text>
            </View>
            <Text style={styles.podiumName}>Sarah</Text>
            <Text style={styles.podiumPoints}>2,847</Text>
          </View>

          {/* 3rd Place */}
          <View style={styles.podiumPosition}>
            <View style={[styles.podiumAvatar, styles.bronzeAvatar]}>
              <Text style={styles.podiumAvatarText}>E</Text>
            </View>
            <View style={[styles.podiumBar, styles.bronzeBar]}>
              <Text style={styles.podiumRank}>3</Text>
            </View>
            <Text style={styles.podiumName}>Emma</Text>
            <Text style={styles.podiumPoints}>2,398</Text>
          </View>
        </View>
      </View>

      {/* Full Leaderboard */}
      <ScrollView style={styles.leaderboardContainer}>
        <Text style={styles.sectionTitle}>Full Rankings</Text>
        {mockLeaderboard.slice(3).map((user, index) => renderLeaderboardItem(user, index + 3))}
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
  yourRankCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
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
  yourRankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  yourRankTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  rankBadge: {
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  rankBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  yourRankStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  yourStatItem: {
    alignItems: 'center',
  },
  yourStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  yourStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  improveButton: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  improveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  periodContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  periodTab: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activePeriodTab: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  periodTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activePeriodTabText: {
    color: '#FFFFFF',
  },
  podiumContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  podium: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 20,
  },
  podiumPosition: {
    alignItems: 'center',
    flex: 1,
  },
  firstPlace: {
    marginBottom: 20,
  },
  crownIcon: {
    marginBottom: 8,
  },
  podiumAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  goldAvatar: {
    backgroundColor: '#FFD700',
  },
  silverAvatar: {
    backgroundColor: '#C0C0C0',
  },
  bronzeAvatar: {
    backgroundColor: '#CD7F32',
  },
  podiumAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  podiumBar: {
    width: '100%',
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goldBar: {
    height: 60,
    backgroundColor: '#FFD700',
  },
  silverBar: {
    height: 48,
    backgroundColor: '#C0C0C0',
  },
  bronzeBar: {
    height: 36,
    backgroundColor: '#CD7F32',
  },
  podiumRank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  podiumPoints: {
    fontSize: 12,
    color: '#6B7280',
  },
  leaderboardContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  leaderboardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  topThreeItem: {
    borderColor: '#F59E0B',
    borderWidth: 2,
  },
  rankContainer: {
    marginRight: 16,
  },
  rankNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  userStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  pointsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
});
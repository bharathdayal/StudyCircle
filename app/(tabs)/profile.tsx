import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { User, Settings, Award, DollarSign, Star, MessageCircle, Bell, Shield, CircleHelp as HelpCircle, LogOut, CreditCard as Edit, Share, Gift } from 'lucide-react-native';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const userStats = {
    totalPoints: 2847,
    totalAnswers: 145,
    avgRating: 4.9,
    questionsAsked: 23,
    helpfulAnswers: 132,
    streak: 15,
  };

  const achievements = [
    { id: 1, title: 'First Answer', description: 'Answered your first question', earned: true },
    { id: 2, title: 'Helpful Helper', description: 'Received 10 helpful votes', earned: true },
    { id: 3, title: 'Point Collector', description: 'Earned 1000 points', earned: true },
    { id: 4, title: 'Expert', description: 'Maintain 4.5+ rating with 50+ answers', earned: true },
    { id: 5, title: 'Streak Master', description: 'Answer questions for 30 days straight', earned: false },
    { id: 6, title: 'Top Contributor', description: 'Reach top 10 on leaderboard', earned: false },
  ];

  const renderStatCard = (icon: React.ReactNode, value: string, label: string) => (
    <View style={styles.statCard}>
      <View style={styles.statIcon}>{icon}</View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const renderAchievement = (achievement: any) => (
    <View
      key={achievement.id}
      style={[
        styles.achievementItem,
        achievement.earned ? styles.earnedAchievement : styles.lockedAchievement,
      ]}
    >
      <View style={styles.achievementIcon}>
        <Award
          size={24}
          color={achievement.earned ? '#F59E0B' : '#9CA3AF'}
        />
      </View>
      <View style={styles.achievementContent}>
        <Text style={[
          styles.achievementTitle,
          { color: achievement.earned ? '#1F2937' : '#9CA3AF' }
        ]}>
          {achievement.title}
        </Text>
        <Text style={[
          styles.achievementDescription,
          { color: achievement.earned ? '#6B7280' : '#9CA3AF' }
        ]}>
          {achievement.description}
        </Text>
      </View>
    </View>
  );

  const renderSettingItem = (icon: React.ReactNode, title: string, subtitle?: string, action?: React.ReactNode) => (
    <TouchableOpacity style={styles.settingItem}>
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {action && <View style={styles.settingAction}>{action}</View>}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <User size={40} color="#FFFFFF" />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>Sarah Johnson</Text>
            <Text style={styles.userEmail}>sarah.johnson@email.com</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#F59E0B" />
              <Text style={styles.ratingText}>{userStats.avgRating} rating</Text>
              <Text style={styles.ratingCount}>({userStats.totalAnswers} answers)</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.editButton}>
            <Edit size={20} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Share size={20} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <View style={styles.statsGrid}>
          {renderStatCard(
            <DollarSign size={24} color="#10B981" />,
            userStats.totalPoints.toLocaleString(),
            'Total Points'
          )}
          {renderStatCard(
            <MessageCircle size={24} color="#3B82F6" />,
            userStats.totalAnswers.toString(),
            'Answers Given'
          )}
          {renderStatCard(
            <HelpCircle size={24} color="#F59E0B" />,
            userStats.questionsAsked.toString(),
            'Questions Asked'
          )}
          {renderStatCard(
            <Award size={24} color="#8B5CF6" />,
            userStats.helpfulAnswers.toString(),
            'Helpful Answers'
          )}
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.achievementsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.achievementsList}>
          {achievements.slice(0, 4).map(renderAchievement)}
        </View>
      </View>

      {/* Points & Rewards */}
      <View style={styles.rewardsSection}>
        <Text style={styles.sectionTitle}>Points & Rewards</Text>
        <View style={styles.rewardsCard}>
          <View style={styles.rewardsHeader}>
            <Gift size={24} color="#F59E0B" />
            <Text style={styles.rewardsTitle}>Available Points</Text>
          </View>
          <Text style={styles.rewardsBalance}>{userStats.totalPoints.toLocaleString()} points</Text>
          <TouchableOpacity style={styles.redeemButton}>
            <Text style={styles.redeemButtonText}>Redeem Rewards</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsList}>
          {renderSettingItem(
            <Bell size={20} color="#6B7280" />,
            'Push Notifications',
            'Get notified about new answers',
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          )}
          
          {renderSettingItem(
            <Settings size={20} color="#6B7280" />,
            'Email Notifications',
            'Receive updates via email',
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
              thumbColor={emailNotifications ? '#FFFFFF' : '#FFFFFF'}
            />
          )}
          
          {renderSettingItem(
            <Shield size={20} color="#6B7280" />,
            'Privacy & Security',
            'Manage your account security'
          )}
          
          {renderSettingItem(
            <HelpCircle size={20} color="#6B7280" />,
            'Help & Support',
            'Get help or contact us'
          )}
          
          {renderSettingItem(
            <LogOut size={20} color="#EF4444" />,
            'Sign Out',
            undefined,
            <Text style={styles.signOutText}>Sign Out</Text>
          )}
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
  },
  ratingCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  achievementsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  earnedAchievement: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementIcon: {
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 12,
  },
  rewardsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  rewardsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  rewardsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  rewardsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  rewardsBalance: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 16,
  },
  redeemButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  redeemButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  settingsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  settingsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  settingAction: {},
  signOutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
});
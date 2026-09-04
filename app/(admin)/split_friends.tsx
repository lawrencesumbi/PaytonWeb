// app/(admin)/split_friends.tsx
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { supabase } from '../../lib/supabase';

interface SplitFriendItem {
  id: string;
  split_expense_id: string;
  friend_id: string;
  owed_amount: number;
  status: string;
  updated_at: string;
  profiles?: {
    full_name?: string;
  } | null;
}

export default function SplitFriendsScreen() {
  const [splitFriends, setSplitFriends] = useState<SplitFriendItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal / Edit state
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<SplitFriendItem | null>(null);
  
  // Form fields
  const [owedAmount, setOwedAmount] = useState('');
  const [status, setStatus] = useState('');

  const fetchSplitFriends = async () => {
    setLoading(true);
    // Joins the split_friends table with the profiles table using friend_id
    const { data, error } = await supabase
      .from('split_friends')
      .select('*, profiles:friend_id (full_name)')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching split friends:', error.message);
    } else {
      setSplitFriends(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSplitFriends();
  }, []);

  const handleOpenEdit = (item: SplitFriendItem) => {
    setEditingItem(item);
    setOwedAmount(item.owed_amount?.toString() || '');
    setStatus(item.status || '');
    setModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;

    const { error } = await supabase
      .from('split_friends')
      .update({
        owed_amount: parseFloat(owedAmount) || 0,
        status: status,
      })
      .eq('id', editingItem.id);

    if (error) {
      alert('Error updating split friend record: ' + error.message);
    } else {
      setModalVisible(false);
      fetchSplitFriends();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this split friend record?')) return;

    const { error } = await supabase
      .from('split_friends')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error deleting record: ' + error.message);
    } else {
      fetchSplitFriends();
    }
  };

  const filteredFriends = splitFriends.filter(item => 
    item.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.owed_amount?.toString().includes(searchQuery) ||
    item.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.friend_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Split Friends Management</Text>
          <Text style={styles.subtitle}>View, edit, or delete records from the split_friends table</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search name, status, or amount..."
          placeholderTextColor="#64748B"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Table Data View */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#10B981" />
        </View>
      ) : (
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeaderRow]}>
            <Text style={[styles.tableCell, styles.headerCell, styles.colNo]}>No.</Text>
            <Text style={[styles.tableCell, styles.headerCell, styles.colFriend]}>Friend Name</Text>
            <Text style={[styles.tableCell, styles.headerCell, styles.colAmount]}>Owed Amount</Text>
            <Text style={[styles.tableCell, styles.headerCell, styles.colStatus]}>Status</Text>
            <Text style={[styles.tableCell, styles.headerCell, styles.colDate]}>Updated At</Text>
            <Text style={[styles.tableCell, styles.headerCell, styles.colActions]}>Actions</Text>
          </View>

          {/* Table Body */}
          <ScrollView style={{ maxHeight: 600 }}>
            {filteredFriends.length === 0 ? (
              <View style={styles.emptyRow}>
                <Text style={styles.emptyText}>No split friend records found.</Text>
              </View>
            ) : (
              filteredFriends.map((item, index) => (
                <View key={item.id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.colNo, styles.textMuted]}>
                    {index + 1}
                  </Text>
                  <Text style={[styles.tableCell, styles.colFriend, styles.textPrimary]} numberOfLines={1}>
                    {item.profiles?.full_name || 'Unknown Friend'}
                  </Text>
                  <Text style={[styles.tableCell, styles.colAmount, styles.textGreen]}>
                    ₱{Number(item.owed_amount).toLocaleString()}
                  </Text>
                  <View style={[styles.tableCell, styles.colStatus]}>
                    <View style={[styles.badge, item.status?.toLowerCase() === 'paid' ? styles.badgePaid : styles.badgePending]}>
                      <Text style={[styles.badgeText, item.status?.toLowerCase() === 'paid' ? styles.badgeTextPaid : styles.badgeTextPending]}>
                        {item.status || 'unpaid'}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.tableCell, styles.colDate, styles.textMuted]} numberOfLines={1}>
                    {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : 'N/A'}
                  </Text>
                  <View style={[styles.tableCell, styles.colActions, styles.actionsContainer]}>
                    <TouchableOpacity 
                      style={styles.editButton} 
                      onPress={() => handleOpenEdit(item)}
                    >
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.deleteButton} 
                      onPress={() => handleDelete(item.id)}
                    >
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      )}

      {/* Edit Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Split Friend Record</Text>

            <Text style={styles.label}>Owed Amount</Text>
            <TextInput 
              style={styles.input} 
              value={owedAmount} 
              onChangeText={setOwedAmount} 
              keyboardType="numeric"
              placeholderTextColor="#64748B"
            />

            <Text style={styles.label}>Status (e.g., paid, unpaid)</Text>
            <TextInput 
              style={styles.input} 
              value={status} 
              onChangeText={setStatus} 
              placeholderTextColor="#64748B"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  searchInput: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#F8FAFC',
    width: 280,
    fontSize: 14,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableContainer: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tableHeaderRow: {
    backgroundColor: '#0F172A',
  },
  tableCell: {
    paddingHorizontal: 6,
    fontSize: 13,
  },
  headerCell: {
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  colNo: { flex: 0.6 },
  colFriend: { flex: 2.2 },
  colAmount: { flex: 1.3 },
  colStatus: { flex: 1.1 },
  colDate: { flex: 1.3 },
  colActions: { flex: 1.6, alignItems: 'flex-end' },
  textGreen: { color: '#34D399', fontWeight: '700' },
  textMuted: { color: '#94A3B8' },
  textPrimary: { color: '#F8FAFC', fontWeight: '600' },
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  badgePaid: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  badgePending: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  badgeTextPaid: {
    color: '#34D399',
  },
  badgeTextPending: {
    color: '#F87171',
  },
  emptyRow: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#64748B',
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  editButtonText: {
    color: '#60A5FA',
    fontSize: 12,
    fontWeight: '700',
  },
  deleteButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#F87171',
    fontSize: 12,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 420,
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#F8FAFC',
    fontSize: 14,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cancelButtonText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#10B981',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
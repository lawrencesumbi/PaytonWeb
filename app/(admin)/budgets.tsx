// app/(admin)/budgets.tsx
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { supabase } from '../../lib/supabase';

interface Budget {
  id: string;
  user_id: string;
  category_id: string;
  allocated_amount: number;
  created_at: string;
  allowance_id: string | null;
  income_id: string | null;
  // Joined fields for display names
  users?: { email?: string; full_name?: string } | null;
  categories?: { name?: string } | null;
}

export default function BudgetsScreen() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal / Edit state
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<Budget | null>(null);
  
  // Form fields
  const [allocatedAmount, setAllocatedAmount] = useState('');

  const fetchBudgets = async () => {
    setLoading(true);
    // Fetch budgets along with user profile/email and category name
    const { data, error } = await supabase
      .from('budgets')
      .select(`
        *,
        users:user_id (email, full_name),
        categories:category_id (name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching budgets:', error.message);
    } else {
      setBudgets(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBudgets();

    // Real-time listener for live updates
    const channel = supabase
      .channel('public:budgets')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'budgets' },
        () => {
          fetchBudgets();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleOpenEdit = (item: Budget) => {
    setEditingItem(item);
    setAllocatedAmount(item.allocated_amount?.toString() || '');
    setModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;

    const { error } = await supabase
      .from('budgets')
      .update({
        allocated_amount: parseFloat(allocatedAmount) || 0,
      })
      .eq('id', editingItem.id);

    if (error) {
      alert('Error updating budget: ' + error.message);
    } else {
      setModalVisible(false);
      fetchBudgets();
    }
  };

  const handleDelete = (id: string) => {
    const executeDelete = async () => {
      const { error } = await supabase
        .from('budgets')
        .delete()
        .eq('id', id);

      if (error) {
        alert('Error deleting record: ' + error.message);
      } else {
        fetchBudgets();
      }
    };

    if (Platform.OS === 'web') {
      if (confirm('Are you sure you want to delete this budget record?')) {
        executeDelete();
      }
    } else {
      Alert.alert(
        'Delete Budget',
        'Are you sure you want to delete this budget record?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: executeDelete },
        ]
      );
    }
  };

  const filteredBudgets = budgets.filter(item => {
    const amountStr = item.allocated_amount?.toString() || '';
    const userIdentifier = item.users?.full_name || item.users?.email || item.user_id || '';
    const categoryName = item.categories?.name || item.category_id || '';
    const query = searchQuery.toLowerCase();

    return (
      amountStr.includes(query) ||
      userIdentifier.toLowerCase().includes(query) ||
      categoryName.toLowerCase().includes(query)
    );
  });

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Budgets Management</Text>
          <Text style={styles.subtitle}>View, edit, or delete records from the budgets table</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by amount, user, or category..."
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
            <Text style={[styles.tableCell, styles.headerCell, styles.colAmount]}>Amount</Text>
            <Text style={[styles.tableCell, styles.headerCell, styles.colDate]}>Created At</Text>
            <Text style={[styles.tableCell, styles.headerCell, styles.colUser]}>User</Text>
            <Text style={[styles.tableCell, styles.headerCell, styles.colCategory]}>Category</Text>
            <Text style={[styles.tableCell, styles.headerCell, styles.colActions]}>Actions</Text>
          </View>

          {/* Table Body */}
          <ScrollView style={{ maxHeight: 600 }}>
            {filteredBudgets.length === 0 ? (
              <View style={styles.emptyRow}>
                <Text style={styles.emptyText}>No budget records found.</Text>
              </View>
            ) : (
              filteredBudgets.map((item, index) => {
                const userName = item.users?.full_name || item.users?.email || 'Unknown User';
                const categoryName = item.categories?.name || 'Uncategorized';

                return (
                  <View key={item.id} style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.colNo, styles.textMuted]}>
                      {index + 1}
                    </Text>
                    <Text style={[styles.tableCell, styles.colAmount, styles.textGreen]}>
                      ₱{Number(item.allocated_amount).toLocaleString()}
                    </Text>
                    <Text style={[styles.tableCell, styles.colDate, styles.textMuted]}>
                      {new Date(item.created_at).toLocaleDateString()}
                    </Text>
                    <Text style={[styles.tableCell, styles.colUser, styles.textWhite]} numberOfLines={1}>
                      {userName}
                    </Text>
                    <Text style={[styles.tableCell, styles.colCategory, styles.textGreen]} numberOfLines={1}>
                      {categoryName}
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
                );
              })
            )}
          </ScrollView>
        </View>
      )}

      {/* Edit Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Budget</Text>

            <Text style={styles.label}>Allocated Amount</Text>
            <TextInput 
              style={styles.input} 
              value={allocatedAmount} 
              onChangeText={setAllocatedAmount} 
              keyboardType="numeric"
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
  colNo: { flex: 0.8 },
  colAmount: { flex: 1.5 },
  colDate: { flex: 1.5 },
  colUser: { flex: 2 },
  colCategory: { flex: 2 },
  colActions: { flex: 2, alignItems: 'flex-end' },
  textWhite: { color: '#F8FAFC', fontWeight: '600' },
  textGreen: { color: '#34D399', fontWeight: '700' },
  textMuted: { color: '#94A3B8' },
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
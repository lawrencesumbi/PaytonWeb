// app/(admin)/budgets.tsx
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

interface Budget {
  id: string;
  user_id: string;
  category_id: string;
  allocated_amount: number;
  created_at: string;
  allowance_id: string | null;
  income_id: string | null;
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
    const { data, error } = await supabase
      .from('budgets')
      .select('*')
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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this budget record?')) return;

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

  const filteredBudgets = budgets.filter(item => 
    item.allocated_amount?.toString().includes(searchQuery) ||
    item.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.user_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          placeholder="Search by amount or ID..."
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
            <Text style={[styles.tableCell, styles.headerCell, styles.colAmount]}>Amount</Text>
            <Text style={[styles.tableCell, styles.headerCell, styles.colDate]}>Created At</Text>
            <Text style={[styles.tableCell, styles.headerCell, styles.colIds]}>User ID</Text>
            <Text style={[styles.tableCell, styles.headerCell, styles.colIds]}>Category ID</Text>
            <Text style={[styles.tableCell, styles.headerCell, styles.colActions]}>Actions</Text>
          </View>

          {/* Table Body */}
          <ScrollView style={{ maxHeight: 600 }}>
            {filteredBudgets.length === 0 ? (
              <View style={styles.emptyRow}>
                <Text style={styles.emptyText}>No budget records found.</Text>
              </View>
            ) : (
              filteredBudgets.map((item) => (
                <View key={item.id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.colAmount, styles.textGreen]}>
                    ₱{Number(item.allocated_amount).toLocaleString()}
                  </Text>
                  <Text style={[styles.tableCell, styles.colDate, styles.textMuted]}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </Text>
                  <Text style={[styles.tableCell, styles.colIds, styles.textMuted]} numberOfLines={1}>
                    {item.user_id}
                  </Text>
                  <Text style={[styles.tableCell, styles.colIds, styles.textMuted]} numberOfLines={1}>
                    {item.category_id}
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
  colAmount: { flex: 1.5 },
  colDate: { flex: 1.5 },
  colIds: { flex: 2 },
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
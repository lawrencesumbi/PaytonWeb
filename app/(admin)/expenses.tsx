// app/(admin)/expenses.tsx
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

interface Expense {
  id: string;
  budget_id: string | null;
  amount: number;
  description: string;
  spent_at: string;
  allowance_id: string | null;
  income_id: string | null;
}

export default function ExpensesScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal / Edit state
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<Expense | null>(null);
  
  // Form fields
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const fetchExpenses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('spent_at', { ascending: false });

    if (error) {
      console.error('Error fetching expenses:', error.message);
    } else {
      setExpenses(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleOpenEdit = (item: Expense) => {
    setEditingItem(item);
    setDescription(item.description || '');
    setAmount(item.amount?.toString() || '');
    setModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;

    const { error } = await supabase
      .from('expenses')
      .update({
        description: description,
        amount: parseFloat(amount) || 0,
      })
      .eq('id', editingItem.id);

    if (error) {
      alert('Error updating expense: ' + error.message);
    } else {
      setModalVisible(false);
      fetchExpenses();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this expense record?')) return;

    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error deleting record: ' + error.message);
    } else {
      fetchExpenses();
    }
  };

  const filteredExpenses = expenses.filter(item => 
    item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.amount?.toString().includes(searchQuery)
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Expenses Management</Text>
          <Text style={styles.subtitle}>View, edit, or delete records from the expenses table</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by description or amount..."
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
            <Text style={[styles.tableCell, styles.headerCell, styles.colDesc]}>Description</Text>
            <Text style={[styles.tableCell, styles.headerCell, styles.colAmount]}>Amount</Text>
            <Text style={[styles.tableCell, styles.headerCell, styles.colDate]}>Spent At</Text>
            <Text style={[styles.tableCell, styles.headerCell, styles.colActions]}>Actions</Text>
          </View>

          {/* Table Body */}
          <ScrollView style={{ maxHeight: 600 }}>
            {filteredExpenses.length === 0 ? (
              <View style={styles.emptyRow}>
                <Text style={styles.emptyText}>No expense records found.</Text>
              </View>
            ) : (
              filteredExpenses.map((item) => (
                <View key={item.id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.colDesc, styles.textWhite]} numberOfLines={1}>
                    {item.description}
                  </Text>
                  <Text style={[styles.tableCell, styles.colAmount, styles.textRed]}>
                    ₱{Number(item.amount).toLocaleString()}
                  </Text>
                  <Text style={[styles.tableCell, styles.colDate, styles.textMuted]}>
                    {new Date(item.spent_at).toLocaleDateString()}
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
            <Text style={styles.modalTitle}>Edit Expense</Text>

            <Text style={styles.label}>Description</Text>
            <TextInput 
              style={styles.input} 
              value={description} 
              onChangeText={setDescription} 
              placeholderTextColor="#64748B"
            />

            <Text style={styles.label}>Amount</Text>
            <TextInput 
              style={styles.input} 
              value={amount} 
              onChangeText={setAmount} 
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
  colDesc: { flex: 2.5 },
  colAmount: { flex: 1.5 },
  colDate: { flex: 1.5 },
  colActions: { flex: 2, alignItems: 'flex-end' },
  textWhite: { color: '#F8FAFC', fontWeight: '600' },
  textRed: { color: '#F87171', fontWeight: '700' },
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
import React, { useState } from 'react';
import { Plus, Edit, Copy, Archive, Eye, X, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/Toast';
import { useI18n } from '../i18n';
import { AuditTemplate, AuditTemplateSection, ChecklistItem, AuditCategory, ResponseType, FacilityType } from '../types';
import { templateRepo, auditRepo } from '../storage';
import { v4 as uuid } from 'uuid';
import { CATEGORY_LABELS } from '../data/demoData';
import { FACILITY_TYPE_LABELS } from '../data/enterpriseDemoData';
import MultiSelectDropdown from '../components/MultiSelectDropdown';

export default function AuditTemplates() {
  const { templates, refreshData } = useApp();
  const toast = useToast();
  const { t } = useI18n();
  const [showForm, setShowForm] = useState(false);
  const [editTemplate, setEditTemplate] = useState<AuditTemplate | null>(null);
  const [viewTemplate, setViewTemplate] = useState<AuditTemplate | null>(null);
  const [deleteTemplate, setDeleteTemplate] = useState<AuditTemplate | null>(null);

  const handleDuplicate = (t: AuditTemplate) => {
    const dup: AuditTemplate = { ...t, id: uuid(), name: `${t.name} (Copy)`, version: '1.1', status: 'inactive', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      sections: t.sections.map(s => ({ ...s, id: uuid(), items: s.items.map(i => ({ ...i, id: uuid() })) }))
    };
    templateRepo.create(dup);
    refreshData();
    toast.success('Template berhasil diduplikasi');
  };

  const handleToggleStatus = (t: AuditTemplate) => {
    templateRepo.update(t.id, { status: t.status === 'active' ? 'inactive' : 'active' });
    refreshData();
    toast.success(`Template ${t.status === 'active' ? 'dinonaktifkan' : 'diaktifkan'}`);
  };

  const handleDelete = (template: AuditTemplate) => {
    // Check if template is used by any existing audits
    const audits = auditRepo.getAll();
    const isUsed = audits.some(audit => audit.templateId === template.id);
    
    if (isUsed) {
      toast.error(t('template.inUse'));
      return;
    }
    
    setDeleteTemplate(template);
  };

  const confirmDelete = () => {
    if (!deleteTemplate) return;
    
    try {
      templateRepo.delete(deleteTemplate.id);
      refreshData();
      toast.success(t('template.deleteSuccess'));
      setDeleteTemplate(null);
    } catch (error) {
      toast.error(t('template.deleteFailed'));
      console.error('Failed to delete template:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Template Audit</h1>
        <button onClick={() => { setEditTemplate(null); setShowForm(true); }} className="btn-primary text-sm flex items-center gap-1"><Plus className="w-4 h-4" /> Buat Template</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(template => (
          <div key={template.id} className="card p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-sm">{template.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${template.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{template.status}</span>
            </div>
            <p className="text-xs text-gray-500 mb-1">{template.description}</p>
            <p className="text-xs text-gray-400 mb-3">v{template.version} • {template.sections.length} sections • {template.sections.reduce((s, sec) => s + sec.items.length, 0)} items</p>
            <div className="flex gap-1">
              <button onClick={() => setViewTemplate(template)} className="p-1.5 rounded hover:bg-blue-50 text-blue-600"><Eye className="w-4 h-4" /></button>
              <button onClick={() => { setEditTemplate(template); setShowForm(true); }} className="p-1.5 rounded hover:bg-gray-100 text-gray-600"><Edit className="w-4 h-4" /></button>
              <button onClick={() => handleDuplicate(template)} className="p-1.5 rounded hover:bg-gray-100 text-gray-600"><Copy className="w-4 h-4" /></button>
              <button onClick={() => handleToggleStatus(template)} className="p-1.5 rounded hover:bg-yellow-50 text-yellow-600"><Archive className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(template)} className="p-1.5 rounded hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && <TemplateForm template={editTemplate} onClose={() => { setShowForm(false); refreshData(); }} />}
      {viewTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">{viewTemplate.name} (v{viewTemplate.version})</h3>
              <button onClick={() => setViewTemplate(null)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              {viewTemplate.sections.map(s => (
                <div key={s.id}>
                  <h4 className="font-medium text-sm mb-2">{s.name} ({CATEGORY_LABELS[s.category]})</h4>
                  <div className="space-y-1">
                    {s.items.map(item => (
                      <div key={item.id} className="flex items-center gap-2 text-xs p-2 bg-gray-50 rounded">
                        {item.critical && <span className="text-red-500 font-bold">!</span>}
                        <span className="flex-1">{item.question}</span>
                        <span className="text-gray-400">[{item.responseType}]</span>
                        <span className="text-gray-400">w:{item.weight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {deleteTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{t('template.deleteConfirm.title')}</h3>
              <button onClick={() => setDeleteTemplate(null)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600">{t('template.deleteConfirm.message')}</p>
            </div>
            <div className="p-4 border-t flex justify-end gap-2">
              <button onClick={() => setDeleteTemplate(null)} className="btn-secondary text-sm">
                {t('common.cancel')}
              </button>
              <button onClick={confirmDelete} className="btn-danger text-sm">
                {t('template.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TemplateForm({ template, onClose }: { template: AuditTemplate | null; onClose: () => void }) {
  const { currentUser } = useApp();
  const toast = useToast();
  const [name, setName] = useState(template?.name || '');
  const [description, setDescription] = useState(template?.description || '');
  
  // Backward compatibility: convert legacy farmType to facilityTypes array
  const initialFacilityTypes = (): FacilityType[] => {
    if (template?.facilityTypes && template.facilityTypes.length > 0) {
      return template.facilityTypes;
    }
    // Convert legacy farmType to facilityTypes
    if (template?.farmType && template.farmType !== 'all') {
      return [template.farmType as FacilityType];
    }
    return [];
  };
  
  const [facilityTypes, setFacilityTypes] = useState<FacilityType[]>(initialFacilityTypes());
  const [sections, setSections] = useState<AuditTemplateSection[]>(template?.sections || [
    { id: uuid(), name: 'Biosecurity', category: 'biosecurity', description: '', order: 1, items: [] },
  ]);

  const addSection = () => {
    setSections([...sections, { id: uuid(), name: 'New Section', category: 'biosecurity', description: '', order: sections.length + 1, items: [] }]);
  };

  const updateSection = (idx: number, updates: Partial<AuditTemplateSection>) => {
    const newSections = [...sections];
    newSections[idx] = { ...newSections[idx], ...updates };
    setSections(newSections);
  };

  const addItem = (sectionIdx: number) => {
    const newSections = [...sections];
    const item: ChecklistItem = {
      id: uuid(), question: '', description: '', category: newSections[sectionIdx].category,
      weight: 1, mandatory: true, responseType: 'pass_fail', critical: false,
      evidenceRequired: false, correctiveActionRequired: false, guidance: '', order: newSections[sectionIdx].items.length + 1,
    };
    newSections[sectionIdx] = { ...newSections[sectionIdx], items: [...newSections[sectionIdx].items, item] };
    setSections(newSections);
  };

  const updateItem = (sectionIdx: number, itemIdx: number, updates: Partial<ChecklistItem>) => {
    const newSections = [...sections];
    const items = [...newSections[sectionIdx].items];
    items[itemIdx] = { ...items[itemIdx], ...updates };
    newSections[sectionIdx] = { ...newSections[sectionIdx], items };
    setSections(newSections);
  };

  const removeItem = (sectionIdx: number, itemIdx: number) => {
    const newSections = [...sections];
    const items = newSections[sectionIdx].items.filter((_, i) => i !== itemIdx);
    newSections[sectionIdx] = { ...newSections[sectionIdx], items };
    setSections(newSections);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Nama template wajib diisi');
      return;
    }
    
    // Backward compatibility: if editing old template with farmType, preserve it
    const legacyFarmType = template?.farmType;
    
    const data: AuditTemplate = {
      id: template?.id || uuid(), 
      name, 
      description, 
      facilityTypes,
      // Preserve legacy farmType for backward compatibility
      ...(legacyFarmType && { farmType: legacyFarmType }),
      version: template?.version || '1.0', 
      status: template?.status || 'active',
      sections, 
      createdBy: template?.createdBy || currentUser?.id || '',
      createdAt: template?.createdAt || new Date().toISOString(), 
      updatedAt: new Date().toISOString(),
    };
    
    if (template) {
      templateRepo.update(template.id, data);
      toast.success('Template berhasil diperbarui');
    } else {
      templateRepo.create(data);
      toast.success('Template berhasil dibuat');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="font-semibold">{template ? 'Edit Template' : 'Buat Template'}</h3>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Nama Template</label><input value={name} onChange={e => setName(e.target.value)} className="input-field text-sm" required /></div>
            <div>
              <label className="text-xs font-medium text-gray-600">Tipe Fasilitas</label>
              <MultiSelectDropdown
                options={Object.entries(FACILITY_TYPE_LABELS).map(([value, label]) => ({ value, label }))}
                value={facilityTypes}
                onChange={(values) => setFacilityTypes(values as FacilityType[])}
                placeholder="Pilih Tipe Fasilitas"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Klik untuk memilih satu atau lebih tipe fasilitas</p>
            </div>
          </div>
          <div><label className="text-xs font-medium text-gray-600">Deskripsi</label><textarea value={description} onChange={e => setDescription(e.target.value)} className="input-field text-sm" rows={2} /></div>

          {/* Sections */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Sections ({sections.length})</h4>
              <button type="button" onClick={addSection} className="text-xs text-blue-600 hover:underline">+ Tambah Section</button>
            </div>
            {sections.map((section, sIdx) => (
              <div key={section.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <input value={section.name} onChange={e => updateSection(sIdx, { name: e.target.value })} className="input-field text-sm flex-1" placeholder="Nama Section" />
                  <select value={section.category} onChange={e => updateSection(sIdx, { category: e.target.value as AuditCategory })} className="input-field text-sm w-auto">
                    {Object.entries(CATEGORY_LABELS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  {section.items.map((item, iIdx) => (
                    <div key={item.id} className="flex items-center gap-2 bg-gray-50 p-2 rounded text-xs">
                      <input value={item.question} onChange={e => updateItem(sIdx, iIdx, { question: e.target.value })} className="input-field text-xs flex-1" placeholder="Pertanyaan..." />
                      <input type="number" value={item.weight} onChange={e => updateItem(sIdx, iIdx, { weight: parseInt(e.target.value) || 1 })} className="input-field text-xs w-12" title="Bobot" />
                      <select value={item.responseType} onChange={e => updateItem(sIdx, iIdx, { responseType: e.target.value as ResponseType })} className="input-field text-xs w-auto">
                        <option value="pass_fail">P/F</option><option value="yes_no">Y/N</option><option value="compliant">C/NC</option><option value="rating">Rating</option>
                      </select>
                      <label className="flex items-center gap-1"><input type="checkbox" checked={item.critical} onChange={e => updateItem(sIdx, iIdx, { critical: e.target.checked })} className="rounded" /><span className="text-red-600">K</span></label>
                      <button type="button" onClick={() => removeItem(sIdx, iIdx)} className="text-red-400 hover:text-red-600"><X className="w-3 h-3" /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addItem(sIdx)} className="text-xs text-blue-600 hover:underline">+ Tambah Item</button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t sticky bottom-0 bg-white">
            <button type="button" onClick={onClose} className="btn-secondary text-sm">Batal</button>
            <button type="submit" className="btn-primary text-sm">Simpan Template</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ChecklistLibrary() {
  const { templates } = useApp();
  const [search, setSearch] = useState('');
  const [templateFilter, setTemplateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Get selected template
  const selectedTemplate = templates.find(t => t.id === templateFilter);

  // Get all items from all templates (for display)
  const allItems = templates.flatMap(t => 
    t.sections.flatMap(s => 
      s.items.map(i => ({ 
        ...i, 
        templateId: t.id,
        templateName: t.name, 
        sectionId: s.id,
        sectionName: s.name
      }))
    )
  );

  // Get unique categories from selected template only
  const availableCategories = selectedTemplate 
    ? Array.from(
        new Set(
          selectedTemplate.sections.map(s => s.category)
        )
      )
    : [];

  // Apply filters
  const filtered = allItems.filter(i => {
    if (search && !i.question.toLowerCase().includes(search.toLowerCase())) return false;
    if (templateFilter && i.templateId !== templateFilter) return false;
    if (categoryFilter && i.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Checklist Library</h1>
      
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Cari pertanyaan..." 
            className="input-field pl-3" 
          />
        </div>

        {/* Template Filter */}
        <select 
          value={templateFilter} 
          onChange={e => {
            setTemplateFilter(e.target.value);
            setCategoryFilter(''); // Reset category filter when template changes
          }} 
          className="input-field w-auto"
        >
          <option value="">Semua Template</option>
          {templates.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        {/* Category Filter - Dependent on selected template */}
        <select 
          value={categoryFilter} 
          onChange={e => setCategoryFilter(e.target.value)} 
          className="input-field w-auto"
          disabled={!templateFilter || availableCategories.length === 0}
        >
          <option value="">
            {!templateFilter ? 'Pilih Template Terlebih Dahulu' : 'Semua Kategori'}
          </option>
          {availableCategories.map(cat => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat as AuditCategory] || cat}
            </option>
          ))}
        </select>
      </div>

      {/* Empty state when no template selected or no categories */}
      {!templateFilter && (
        <div className="card p-8 text-center">
          <p className="text-gray-500">Pilih template audit untuk melihat kategori yang tersedia.</p>
        </div>
      )}
      
      {templateFilter && availableCategories.length === 0 && (
        <div className="card p-8 text-center">
          <p className="text-gray-500">Tidak ada kategori yang tersedia untuk template ini.</p>
        </div>
      )}

      {/* Results Table */}
      {templateFilter && filtered.length > 0 && (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 font-medium text-gray-600">Pertanyaan</th>
                <th className="text-left p-3 font-medium text-gray-600 hidden md:table-cell">Section</th>
                <th className="text-left p-3 font-medium text-gray-600 hidden lg:table-cell">Tipe</th>
                <th className="text-left p-3 font-medium text-gray-600">Bobot</th>
                <th className="text-left p-3 font-medium text-gray-600">Kritis</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.slice(0, 100).map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-3 max-w-[300px] truncate">{item.question}</td>
                  <td className="p-3 hidden md:table-cell text-gray-500">{item.sectionName}</td>
                  <td className="p-3 hidden lg:table-cell text-gray-500">{item.responseType}</td>
                  <td className="p-3">{item.weight}</td>
                  <td className="p-3">{item.critical ? <span className="text-red-600 font-bold">Ya</span> : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No results message */}
      {templateFilter && filtered.length === 0 && (
        <div className="card p-8 text-center">
          <p className="text-gray-500">Tidak ada item yang cocok dengan filter.</p>
        </div>
      )}
    </div>
  );
}

// Evidence Storage Service - IndexedDB-based storage for photos/documents
// This abstraction allows future migration to Supabase Storage

const DB_NAME = 'fams_evidence_db';
const DB_VERSION = 1;
const STORE_NAME = 'evidence_files';

interface StoredEvidence {
  id: string;
  data: Blob;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
}

class EvidenceStorageService {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    if (this.db) return;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
    });
  }

  async save(id: string, file: Blob, fileName: string, fileType: string): Promise<string> {
    await this.init();

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized. Please call init() first.'));
        return;
      }
      const transaction = this.db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const storedEvidence: StoredEvidence = {
        id,
        data: file,
        fileName,
        fileType,
        fileSize: file.size,
        uploadedAt: new Date().toISOString(),
      };

      const request = store.put(storedEvidence);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(id);
    });
  }

  async get(id: string): Promise<StoredEvidence | null> {
    await this.init();

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized. Please call init() first.'));
        return;
      }
      const transaction = this.db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async delete(id: string): Promise<void> {
    await this.init();

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized. Please call init() first.'));
        return;
      }
      const transaction = this.db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async list(): Promise<StoredEvidence[]> {
    await this.init();

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized. Please call init() first.'));
        return;
      }
      const transaction = this.db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  async clear(): Promise<void> {
    await this.init();

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized. Please call init() first.'));
        return;
      }
      const transaction = this.db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  // Helper: Create object URL for preview
  async getObjectUrl(id: string): Promise<string | null> {
    const evidence = await this.get(id);
    if (!evidence) return null;
    return URL.createObjectURL(evidence.data);
  }

  // Helper: Revoke object URL to free memory
  revokeObjectUrl(url: string): void {
    URL.revokeObjectURL(url);
  }
}

export const evidenceStorageService = new EvidenceStorageService();

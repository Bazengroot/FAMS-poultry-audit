-- ============================================================
-- FINAL PRODUCTION SCHEMA - FAMS Supabase
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Departments Table
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    manager_id UUID,
    status TEXT NOT NULL DEFAULT 'active', -- 'active' | 'inactive' | 'archived'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Facilities Table (Aligned with Facility interface)
CREATE TABLE facilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    facility_code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    facility_type TEXT NOT NULL, -- FacilityType enum
    department_id UUID REFERENCES departments(id),
    location TEXT,
    address TEXT,
    province TEXT,
    regency TEXT,
    district TEXT,
    manager_id UUID,
    supervisor_id UUID,
    capacity INTEGER,
    status TEXT NOT NULL DEFAULT 'active', -- FacilityStatus enum
    description TEXT,
    legacy_farm_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Audits Table (Aligned with Audit interface)
CREATE TABLE audits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_number TEXT UNIQUE NOT NULL,
    facility_id UUID REFERENCES facilities(id),
    department_id UUID REFERENCES departments(id),
    template_id UUID,
    template_name TEXT,
    template_version TEXT,
    auditor_id UUID,
    audit_date DATE,
    audit_type TEXT, -- AuditType enum
    status TEXT NOT NULL DEFAULT 'draft', -- AuditStatus enum
    overall_score DECIMAL,
    risk_level TEXT,
    has_critical_failure BOOLEAN DEFAULT false,
    pass_count INTEGER DEFAULT 0,
    fail_count INTEGER DEFAULT 0,
    na_count INTEGER DEFAULT 0,
    notes TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    approved_at TIMESTAMP WITH TIME ZONE,
    rejected_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Findings Table (Aligned with Finding interface)
CREATE TABLE findings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audit_id UUID REFERENCES audits(id) ON DELETE CASCADE,
    facility_id UUID REFERENCES facilities(id),
    category TEXT, -- AuditCategory enum
    checklistItem_id TEXT,
    title TEXT,
    description TEXT,
    severity TEXT, -- FindingSeverity enum
    risk TEXT,
    root_cause TEXT,
    evidence TEXT,
    status TEXT NOT NULL DEFAULT 'open', -- FindingStatus enum
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Corrective Actions Table (Aligned with CorrectiveAction interface)
CREATE TABLE corrective_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    finding_id UUID REFERENCES findings(id) ON DELETE CASCADE,
    audit_id UUID REFERENCES audits(id) ON DELETE CASCADE,
    facility_id UUID REFERENCES facilities(id),
    responsible_person_id UUID,
    action_description TEXT,
    root_cause TEXT,
    preventive_action TEXT,
    target_date DATE,
    priority TEXT, -- CAPriority enum
    status TEXT NOT NULL DEFAULT 'open', -- CAStatus enum
    verification_notes TEXT,
    evidence TEXT,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    verification_date TIMESTAMP WITH TIME ZONE,
    completion_date TIMESTAMP WITH TIME ZONE
);

-- 6. Evidence Table (Aligned with Evidence interface)
CREATE TABLE evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audit_id UUID REFERENCES audits(id) ON DELETE CASCADE,
    finding_id UUID REFERENCES findings(id) ON DELETE SET NULL,
    checklistItem_id TEXT,
    corrective_action_id UUID REFERENCES corrective_actions(id) ON DELETE SET NULL,
    facility_id UUID REFERENCES facilities(id),
    file_name TEXT,
    file_type TEXT,
    file_size INTEGER,
    storage_reference TEXT NOT NULL, -- This matches 'storageReference' in the UI
    thumbnail_reference TEXT,
    caption TEXT,
    evidence_type TEXT, -- EvidenceType enum
    uploaded_by UUID,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL, -- UserRole enum
    department TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    last_login TIMESTAMP WITH TIME ZONE
);

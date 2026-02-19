-- Phase 3 migration: NAV upload support

-- Add scheme_code to sif_funds for future MFAPI integration
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS scheme_code INTEGER;
CREATE INDEX IF NOT EXISTS idx_sif_funds_scheme_code ON sif_funds(scheme_code);

-- RLS policies for authenticated users (admin NAV upload)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth insert NAV') THEN
    CREATE POLICY "Auth insert NAV" ON nav_history FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth update funds') THEN
    CREATE POLICY "Auth update funds" ON sif_funds FOR UPDATE USING (auth.role() = 'authenticated');
  END IF;
END $$;

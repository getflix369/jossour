import { create } from 'zustand';
import {
  SessionItem,
  CoordinatorAccount,
  RegistrationRecord,
  ApprovalStatus
} from '../types/joussour';
import {
  INITIAL_SESSIONS,
  INITIAL_COORDINATORS,
  INITIAL_REGISTRATIONS
} from '../constants/institutions';
import { createJoussourSupabaseClient } from '../lib/supabaseClient';

interface JoussourState {
  sessions: SessionItem[];
  coordinators: CoordinatorAccount[];
  registrations: RegistrationRecord[];
  isLiveDb: boolean;
  diagnosticMessage: string;
  connectSupabase: (url?: string, key?: string) => Promise<void>;
  addRegistration: (record: RegistrationRecord) => Promise<{ ok: boolean; error?: string }>;
  updateRegistrationStatus: (id: string, status: ApprovalStatus, coordinatorName?: string) => Promise<void>;
  toggleZoomAttendance: (id: string) => Promise<void>;
  updateRegistration: (record: RegistrationRecord) => Promise<void>;
  deleteRegistration: (id: string) => Promise<void>;
  addCoordinator: (coord: CoordinatorAccount) => Promise<void>;
  deleteCoordinator: (id: string) => Promise<void>;
  saveSession: (session: SessionItem) => Promise<void>;
  deleteSession: (id: string) => Promise<void>;
}

export const useJoussourStore = create<JoussourState>((set, get) => ({
  sessions: INITIAL_SESSIONS,
  coordinators: INITIAL_COORDINATORS,
  registrations: INITIAL_REGISTRATIONS,
  isLiveDb: false,
  diagnosticMessage: '',

  connectSupabase: async (url, key) => {
    const client = createJoussourSupabaseClient(url, key);
    if (!client) {
      set({ isLiveDb: false, diagnosticMessage: 'الوضع المحلي مفعل' });
      return;
    }
    const { data: regData, error: regErr } = await client.from('joussour_registrations').select('*');
    if (regErr) {
      set({ isLiveDb: false, diagnosticMessage: `تعذر الاتصال: ${regErr.message}` });
      return;
    }
    const { data: sesData } = await client.from('joussour_sessions').select('*');
    const { data: crdData } = await client.from('joussour_coordinators').select('*');

    set({
      isLiveDb: true,
      registrations: regData ? [...regData].reverse() : get().registrations,
      sessions: sesData && sesData.length > 0 ? sesData : get().sessions,
      coordinators: crdData && crdData.length > 0 ? crdData : get().coordinators,
      diagnosticMessage: `متصل بـ Supabase (${regData ? regData.length : 0} طلب)`
    });
  },

  addRegistration: async (record) => {
    const client = createJoussourSupabaseClient();
    if (get().isLiveDb && client) {
      const { error } = await client.from('joussour_registrations').insert([record]);
      if (error) return { ok: false, error: error.message };
    }
    set((state) => ({ registrations: [record, ...state.registrations] }));
    return { ok: true };
  },

  updateRegistrationStatus: async (id, status, coordinatorName) => {
    const client = createJoussourSupabaseClient();
    if (get().isLiveDb && client) {
      await client
        .from('joussour_registrations')
        .update(coordinatorName ? { status, coordinator_name: coordinatorName } : { status })
        .eq('id', id);
    }
    set((state) => ({
      registrations: state.registrations.map((r) =>
        r.id === id ? { ...r, status, coordinator_name: coordinatorName || r.coordinator_name } : r
      )
    }));
  },

  toggleZoomAttendance: async (id) => {
    const target = get().registrations.find((r) => r.id === id);
    if (!target) return;
    const nextVal = !target.zoom_attended;
    const client = createJoussourSupabaseClient();
    if (get().isLiveDb && client) {
      await client.from('joussour_registrations').update({ zoom_attended: nextVal }).eq('id', id);
    }
    set((state) => ({
      registrations: state.registrations.map((r) =>
        r.id === id ? { ...r, zoom_attended: nextVal } : r
      )
    }));
  },

  updateRegistration: async (record) => {
    const client = createJoussourSupabaseClient();
    if (get().isLiveDb && client) {
      await client.from('joussour_registrations').update(record).eq('id', record.id);
    }
    set((state) => ({
      registrations: state.registrations.map((r) => (r.id === record.id ? record : r))
    }));
  },

  deleteRegistration: async (id) => {
    const client = createJoussourSupabaseClient();
    if (get().isLiveDb && client) {
      await client.from('joussour_registrations').delete().eq('id', id);
    }
    set((state) => ({
      registrations: state.registrations.filter((r) => r.id !== id)
    }));
  },

  addCoordinator: async (coord) => {
    const client = createJoussourSupabaseClient();
    if (get().isLiveDb && client) {
      await client.from('joussour_coordinators').insert([coord]);
    }
    set((state) => ({ coordinators: [coord, ...state.coordinators] }));
  },

  deleteCoordinator: async (id) => {
    const client = createJoussourSupabaseClient();
    if (get().isLiveDb && client) {
      await client.from('joussour_coordinators').delete().eq('id', id);
    }
    set((state) => ({
      coordinators: state.coordinators.filter((c) => c.id !== id)
    }));
  },

  saveSession: async (session) => {
    const exists = get().sessions.some((s) => s.id === session.id);
    const client = createJoussourSupabaseClient();
    if (get().isLiveDb && client) {
      if (exists) await client.from('joussour_sessions').update(session).eq('id', session.id);
      else await client.from('joussour_sessions').insert([session]);
    }
    set((state) => ({
      sessions: exists
        ? state.sessions.map((s) => (s.id === session.id ? session : s))
        : [...state.sessions, session]
    }));
  },

  deleteSession: async (id) => {
    const client = createJoussourSupabaseClient();
    if (get().isLiveDb && client) {
      await client.from('joussour_sessions').delete().eq('id', id);
    }
    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== id)
    }));
  }
}));

import { create } from "zustand";

interface AdminStoreType {
  isAdmin: boolean;
  isVisible: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useAdminStore = create<AdminStoreType>((set) => ({
  isAdmin: false,
  isVisible: false,
  setIsAdmin: (isAdmin: boolean) => {
    set({ isAdmin });
    if (isAdmin) {
      set({ isVisible: true });
    } else {
      setTimeout(() => {
        set({ isVisible: false });
      }, 150);
    }
  },
}));

interface DataStoreType {
  loading: boolean;
  workshops: Workshop[];
  presenters: Presenter[];
  organizers: Filter[];
  topics: Filter[];
  difficulties: Filter[];
  fetch: () => Promise<void>;
}

export const useDataStore = create<DataStoreType>((set) => ({
  loading: true,
  workshops: [],
  presenters: [],
  organizers: [],
  topics: [],
  difficulties: [],
  fetch: async () => {
    const [workshops, presenters, organizers, topics, difficulties] =
      await Promise.all([
        fetch(`http://localhost:3000/workshops`).then((res) => res.json()),
        fetch(`http://localhost:3000/presenters`).then((res) => res.json()),
        fetch(`http://localhost:3000/organizers`).then((res) => res.json()),
        fetch(`http://localhost:3000/topics`).then((res) => res.json()),
        fetch(`http://localhost:3000/difficulties`).then((res) => res.json()),
      ]);

    set({
      workshops,
      presenters,
      organizers,
      topics,
      difficulties,
    });

    setTimeout(
      () => {
        set({ loading: false });
      },
      Math.random() * 1000 + 2000,
    );
  },
}));

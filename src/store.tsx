import create from "zustand";

interface AdminStoreType {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useAdminStore = create<AdminStoreType>((set) => ({
  isAdmin: false,
  setIsAdmin: (isAdmin: boolean) => set({ isAdmin }),
}));

interface DataStoreType {
  loading: boolean;
  workshops: Workshop[];
  presenters: Presenter[];
  filters: { name: string; filters: Filter[] }[];
  fetch: () => Promise<void>;
}

export const useDataStore = create<DataStoreType>((set) => ({
  loading: true,
  workshops: [],
  presenters: [],
  filters: [],
  fetch: async () => {
    const [workshops, presenters, organizers, topics, difficulties] =
      await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/workshops`).then((res) =>
          res.json(),
        ),
        fetch(`${import.meta.env.VITE_API_URL}/presenters`).then((res) =>
          res.json(),
        ),
        fetch(`${import.meta.env.VITE_API_URL}/organizers`).then((res) =>
          res.json(),
        ),
        fetch(`${import.meta.env.VITE_API_URL}/topics`).then((res) =>
          res.json(),
        ),
        fetch(`${import.meta.env.VITE_API_URL}/difficulties`).then((res) =>
          res.json(),
        ),
      ]);

    set({
      workshops,
      presenters,
      filters: [
        {
          name: "Organizatori",
          filters: organizers.map((filter: Filter) => filter),
        },
        {
          name: "Teme",
          filters: topics.map((filter: Filter) => filter),
        },
        {
          name: "Težina",
          filters: difficulties.map((filter: Filter) => filter),
        },
      ],
    });

    // Fake timeout to simulate loading
    setTimeout(() => {
      set({ loading: false });
    }, Math.random() * 1000);
  },
}));

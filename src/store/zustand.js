import { create } from "zustand";

export const useTodo = create((set, get) => ({
  data: [{ id: 1, name: "Davlat", status: false, age: 10 }],
  addUser: (user) => set((state) => ({ data: [...state.data, user] })),
  editUser: (user) =>
    set((state) => ({
      data: state.data.map((e) => (e.id == user.id ? user : e)),
    })),
  showData: (id) => get().data.find((e) => e.id == id),
}));

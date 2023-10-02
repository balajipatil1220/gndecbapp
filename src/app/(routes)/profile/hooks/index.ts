import { Role } from '@prisma/client';
import { create } from 'zustand';

interface user {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  role: Role;
}

interface IuseProfile {
  reset: () => void;

  id: string;
  name: string;

  email: string;

  phoneNumber: string;

  isProfileDetailsEditing: boolean;
  setisProfileDetailsEditing: (value: boolean) => void;

  gender: string;

  address: string;

  isOtherProfileDetailsEditing: boolean;
  setisOtherProfileDetailsEditing: (value: boolean) => void;

  role: Role;

  password: string;
  isPasswordEditing: boolean;
  setisPasswordEditing: (value: boolean) => void;

  newpassword: string;
  isNewPasswordEditing: boolean;
  setisNewPasswordEditing: (value: boolean) => void;

  setProfile: (user: user) => void;
}

const initialState = {
  id: '',
  name: '',

  email: '',

  phoneNumber: '',

  isProfileDetailsEditing: false,

  gender: '',

  address: '',

  isOtherProfileDetailsEditing: false,

  role: 'STAFF' as Role,

  password: '',
  isPasswordEditing: false,

  newpassword: '',
  isNewPasswordEditing: false,
};

export const useProfile = create<IuseProfile>((set) => ({
  ...initialState,

  setisProfileDetailsEditing: (value) =>
    set({ isProfileDetailsEditing: value }),
  setisOtherProfileDetailsEditing: (value) =>
    set({ isOtherProfileDetailsEditing: value }),
  setisPasswordEditing: (value) => set({ isPasswordEditing: value }),
  setisNewPasswordEditing: (value) => set({ isPasswordEditing: value }),

  setProfile: (user) => set({ ...user }),
  reset: () => set({ ...initialState }),
}));

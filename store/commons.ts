import { atom } from 'jotai';
import { Subject } from './exam';

export const subjectsAtom = atom<Subject[]>([]);

export const profileAtom = atom<Profile | null>(null);

export type Profile = {
  id: string;
  name: string;
  className: string;
};

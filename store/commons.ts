import { atom } from 'jotai';

export type Topic = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Chapter = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  topics: Topic[];
};

export type Paper = {
  id: number;
  name: string;
  chapters: Chapter[];
};

export type Subject = {
  name: string;
  icon: string;
  papers: Paper[];
};

export type Profile = {
  id: string;
  name: string;
  className: string;
};

export const subjectsAtom = atom<Subject[]>([]);
export const profileAtom = atom<Profile | null>(null);

import { PreferenceContext, UsersContext } from '@/interfaces';
import { createContext } from 'react';

export const PreferenceContextService = createContext<PreferenceContext | null>(null)
export const UsersContextService = createContext<UsersContext | null>(null)

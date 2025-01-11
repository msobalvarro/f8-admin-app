import { PreferenceContext } from '@/interfaces';
import { createContext } from 'react';

export const PreferenceContextService = createContext<PreferenceContext | null>(null)

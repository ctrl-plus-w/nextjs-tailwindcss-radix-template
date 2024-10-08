'use client';

import { createContext, useContext, useState } from 'react';

import { IToast } from '@/type/radix-ui';

interface IContext {
  toasts: IToast[];
  addToast: (toast: IToast) => void;
  removeToast: (id: number) => void;
}

const defaultContext = {
  toasts: [],
  addToast: () => null,
  removeToast: () => null,
} satisfies IContext;

export const ToastContext = createContext<IContext>(defaultContext);

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }: IPropsWithChildren) => {
  const [toasts, setToasts] = useState<IToast[]>(defaultContext.toasts);

  const addToast = (_toast: IToast) => {
    const toast = 'id' in _toast ? _toast : { ..._toast, id: Date.now() };
    setToasts((prev) => [...prev, toast]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return <ToastContext.Provider value={{ toasts, addToast, removeToast }}>{children}</ToastContext.Provider>;
};

export default ToastProvider;

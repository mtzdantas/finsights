import { useToast } from '../hooks/useToast';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function Toast({ toast, onRemove }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onRemove, 300); 
    }, 5000);

    return () => clearTimeout(timer);
  }, [onRemove]);

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg shadow-lg text-white transition-all duration-300 transform ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      } ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
    >
      <span>{toast.message}</span>
      <button onClick={onRemove} className="text-white">
        <X size={16} />
      </button>
    </div>
  );
}

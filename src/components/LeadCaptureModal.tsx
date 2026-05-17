import { useEffect, useState } from 'react';
import type { LeadUserData } from '../types/diagnostic';

interface LeadCaptureModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: LeadUserData) => void;
}

const monthlyLeadOptions = [
  'Menos de 50',
  'Entre 50 y 150',
  'Entre 151 y 400',
  'Más de 400',
];

const EMPTY: LeadUserData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  monthlyLeads: '',
};

export function LeadCaptureModal({
  open,
  onClose,
  onSubmit,
}: LeadCaptureModalProps) {
  const [data, setData] = useState<LeadUserData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  // Lock background scroll while modal is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Reset form when closed
  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setData(EMPTY);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(data);
    setSubmitted(true);
  }

  const valid = data.name.trim() && data.email.trim() && data.company.trim();

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/60 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Descargar mapa de fugas"
      onClick={onClose}
    >
      {/* Panel: bottom-sheet on mobile, centered card on sm+ */}
      <div
        className="flex w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
        style={{ maxHeight: 'min(92dvh, 640px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <SuccessState onClose={onClose} />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col overflow-hidden"
          >
            {/* Fixed header */}
            <div className="flex flex-shrink-0 items-start justify-between gap-4 border-b border-ink-100 p-5 sm:p-6">
              <div>
                <h3 className="text-base font-semibold text-ink-900 sm:text-lg">
                  Descargar mi mapa de fugas
                </h3>
                <p className="mt-0.5 text-sm text-ink-500">
                  Te enviamos el resumen por email.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="-mr-1 -mt-0.5 flex-shrink-0 rounded-full p-1.5 text-ink-400 transition hover:bg-ink-100 hover:text-ink-700 focus-ring"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Scrollable fields */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              <div className="space-y-3.5">
                <Field
                  label="Nombre"
                  required
                  value={data.name}
                  onChange={(v) => setData({ ...data, name: v })}
                />
                <Field
                  label="Email"
                  type="email"
                  required
                  value={data.email}
                  onChange={(v) => setData({ ...data, email: v })}
                />
                <Field
                  label="Empresa"
                  required
                  value={data.company}
                  onChange={(v) => setData({ ...data, company: v })}
                />
                <Field
                  label="Teléfono"
                  helper="Opcional"
                  type="tel"
                  value={data.phone ?? ''}
                  onChange={(v) => setData({ ...data, phone: v })}
                />
                <div>
                  <label className="block text-sm font-medium text-ink-800">
                    Leads mensuales aproximados
                  </label>
                  <select
                    value={data.monthlyLeads}
                    onChange={(e) =>
                      setData({ ...data, monthlyLeads: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-800 focus-ring"
                  >
                    <option value="">Selecciona una opción</option>
                    {monthlyLeadOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Fixed footer */}
            <div
              className="flex-shrink-0 border-t border-ink-100 p-5 sm:p-6"
              style={{
                paddingBottom: `max(1.25rem, env(safe-area-inset-bottom, 1.25rem))`,
              }}
            >
              <button
                type="submit"
                disabled={!valid}
                className="w-full rounded-xl bg-accent-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-700 disabled:cursor-not-allowed disabled:bg-ink-300 focus-ring"
              >
                Enviar diagnóstico
              </button>
              <p className="mt-3 text-center text-[11px] text-ink-400">
                Solo usamos tus datos para enviarte el diagnóstico.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="p-6 sm:p-7"
      style={{
        paddingBottom: `max(1.5rem, env(safe-area-inset-bottom, 1.5rem))`,
      }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-emerald-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink-900">
        Diagnóstico enviado
      </h3>
      <p className="mt-2 text-sm text-ink-500">
        Recibirás tu mapa de fugas en el email indicado. En breve te
        contactaremos con un análisis más detallado si lo necesitas.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-5 w-full rounded-xl bg-ink-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-ink-800 focus-ring"
      >
        Cerrar
      </button>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  helper?: string;
}

function Field({ label, value, onChange, type = 'text', required, helper }: FieldProps) {
  return (
    <div>
      <label className="flex items-baseline justify-between text-sm font-medium text-ink-800">
        <span>{label}</span>
        {helper && <span className="text-xs text-ink-400">{helper}</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-800 placeholder:text-ink-400 focus-ring"
        autoComplete={
          type === 'email' ? 'email' : type === 'tel' ? 'tel' : 'off'
        }
      />
    </div>
  );
}

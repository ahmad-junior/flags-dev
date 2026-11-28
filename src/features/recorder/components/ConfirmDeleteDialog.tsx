"use client";

import { Loader2 } from "lucide-react";
import Modal from "@/features/recorder/components/Modal";

export default function ConfirmDeleteDialog({
  name,
  busy = false,
  onCancel,
  onConfirm,
}: {
  name: string;
  busy?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const close = () => {
    if (!busy) onCancel();
  };

  return (
    <Modal
      label="Delete recording"
      onClose={close}
      className="max-w-md border border-slate-200 bg-white"
    >
      <div className="p-6">
        <h2 className="mt-4 text-lg font-semibold text-slate-900">
          Delete recording?
        </h2>

        <p className="mt-2 break-words text-sm leading-6 text-slate-500">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-700">{name}</span>? This
          action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            autoFocus
            onClick={close}
            disabled={busy}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Delete recording
          </button>
        </div>
      </div>
    </Modal>
  );
}

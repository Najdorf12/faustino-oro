"use client";

import { useEffect, useState } from "react";
import { Notice } from "@/types/notice";
import NoticesForm from "@/components/admin/notices/NoticesForm";
import Notices from "@/components/admin/notices/Notices";

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [noticeSelected, setNoticeSelected] = useState<Notice | null>(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const res = await fetch("/api/notices");
    const data = await res.json();
    setNotices(data);
  };

  const handleSaved = (notice: Notice, isEdit: boolean) => {
    if (isEdit) {
      setNotices((prev) =>
        prev.map((n) => (n._id === notice._id ? notice : n)),
      );
    } else {
      setNotices((prev) => [notice, ...prev]);
    }
    setNoticeSelected(null);
  };

  const deleteNotice = async (id: string) => {
    if (!confirm("¿Eliminar noticia?")) return;

    await fetch(`/api/notices/${id}`, { method: "DELETE" });
    setNotices((prev) => prev.filter((n) => n._id !== id));
  };

  return (
    <section>
      <div className="relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #3f3f46 1px, transparent 1px),
        linear-gradient(to bottom, #3f3f46 1px, transparent 1px)
      `,
            backgroundSize: "150px 150px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />
        <NoticesForm
          noticeSelected={noticeSelected}
          onSaved={handleSaved}
          onCancel={() => setNoticeSelected(null)}
        />
      </div>
      <Notices
        notices={notices}
        onEdit={setNoticeSelected}
        onDelete={deleteNotice}
      />
    </section>
  );
}

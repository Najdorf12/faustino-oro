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
      setNotices((prev) => [...prev, notice]);
    }
    setNoticeSelected(null);
  };

  const deleteNotice = async (id: string) => {
    if (!confirm("¿Eliminar noticia?")) return;

    await fetch(`/api/notices/${id}`, { method: "DELETE" });
    setNotices((prev) => prev.filter((n) => n._id !== id));
  };

  return (
    <section className="w-full flex-col items-center justify-center pb-16 lg:pb-32 3xl:pb-40">
      <NoticesForm
        noticeSelected={noticeSelected}
        onSaved={handleSaved}
        onCancel={() => setNoticeSelected(null)}
      />

      <Notices
        notices={notices}
        onEdit={setNoticeSelected}
        onDelete={deleteNotice}
      />
    </section>
  );
}

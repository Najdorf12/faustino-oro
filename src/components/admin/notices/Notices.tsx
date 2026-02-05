import { Notice } from "@/types/notice";
import NoticeCard from "./NoticeCard";

interface Props {
  notices: Notice[];
  onEdit: (notice: Notice) => void;
  onDelete: (id: string) => void;
}

export default function Notices({ notices, onEdit, onDelete }: Props) {
  return (
    <section className="w-full mt-10 px-4  relative z-50 pb-14 ">
      <h6 className="text-4xl text-center text-zinc-200 mb-12 xl:text-5xl lg:mb-16">
        Noticias existentes
      </h6>

      <div className="flex flex-col justify-center items-center gap-9 lg:gap-12">
        {[...notices].reverse().map((notice) => (
          <NoticeCard
            key={notice._id}
            notice={notice}
            onEdit={() => onEdit(notice)}
            onDelete={() => onDelete(notice._id!)}
          />
        ))}
      </div>
    </section>
  );
}

import { Notice } from "@/types/notice";
import NoticeCard from "./NoticeCard";

interface Props {
  notices: Notice[];
  onEdit: (notice: Notice) => void;
  onDelete: (id: string) => void;
}

export default function Notices({ notices, onEdit, onDelete }: Props) {
  return (
    <section className="relative z-100 self-center flex flex-col justify-center items-center px-3 sm:px-4 mt-2 lg:mt-6">
      <div className=" flex flex-col justify-center items-center gap-9 lg:gap-14 ">
        <h6 className="self-start border-l-2 border-sky-700 pl-3 py-2 text-3xl md:text-4xl text-zinc-200 xl:text-5xl ">
          Noticias existentes
        </h6>
        {[...notices].map((notice) => (
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

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
        <h6 className=" border-l-3 border-sky-700 pl-3 py-2 text-3xl md:text-4xl text-zinc-200  lg:pl-6 xl:text-5xl self-start">
          Noticias existentes
        </h6>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto 3xl:max-w-350">

        {[...notices].map((notice) => (
          <NoticeCard
            key={notice._id}
            notice={notice}
            onEdit={() => onEdit(notice)}
            onDelete={() => onDelete(notice._id!)}
          />
        ))}
        </div>
      </div>
    </section>
  );
}

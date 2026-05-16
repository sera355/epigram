import { Link } from 'react-router-dom';
import cardBg from '@/assets/images/cardBg.png';

type EpigramCardProps = {
  id: number;
  content: string;
  author?: string;
  tags: {
    id: number;
    name: string;
  }[];
};
 
export default function EpigramCard({
  id,
  content,
  author,
  tags,
}: EpigramCardProps) {
  return (
    <Link to={`/epigrams/${id}`} className="block">
      <section
        className="flex h-[210px] max-w-[478px] cursor-pointer flex-col justify-between rounded-[12px] bg-white bg-[length:100%_154px] bg-top bg-no-repeat px-[24px] py-[24px]
          shadow-sm transition hover:shadow-md"
        style={{ backgroundImage: `url(${cardBg})` }}
      >
        <p
          className="line-clamp-4 min-h-[72px] font-['Iropke_Batang'] text-[20px] leading-[28px] 
          text-(--color-black-600)">
          {content}
        </p>

        <p className="mt-[16px] font-['Iropke_Batang'] text-right text-[20px] text-(--color-blue-400)">
          - {author} -
        </p>
      </section>

      <div className="shrink-0 pt-2 text-right font-['Iropke_Batang'] text-[20px] text-(--color-blue-400)">
        {tags.map((tag) => (
          <span key={tag.id}>#{tag.name} </span>
        ))}
      </div>
    </Link>
  );
}

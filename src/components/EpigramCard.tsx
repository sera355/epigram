import {useNavigate} from 'react-router-dom';
import cardBg from '@/assets/images/cardBg.png';

type EpigramCardProps = {
  id: number;
  content: string;
  author?: string;
  tags: string[];
};
 
export default function EpigramCard({
  id,
  content,
  author,
  tags,
}: EpigramCardProps) {
  const navigate = useNavigate();

  return(
  
      <article
        onClick={()=>navigate(`/epigrams/${id}`)}
        
      >
        <section 
          className="flex flex-col justify-between w-[478px] h-[210px] cursor-pointer rounded-[12px] bg-white bg-[length:100%_154px] bg-top bg-no-repeat px-[24px] py-[24px] 
          shadow-sm transition hover:shadow-md"
          
          style={{backgroundImage: `url(${cardBg})`}}
        >
          <p className="min-h-[72px] font-['Iropke_Batang'] text-[20px] leading-[28px] 
          text-(--color-black-600)">
            {content}
          </p>

          <p className="mt-[16px] font-['Iropke_Batang'] text-right text-[20px] text-(--color-blue-400)">
            - {author} -
          </p>
        </section>

        <div className="pt-2 font-['Iropke_Batang'] text-[20px] text-(--color-blue-400) shrink-0 text-right">
          {tags.map((tag)=>(<span key={tag}>#{tag}  </span>))}
        </div>
        
      </article>
  );
}
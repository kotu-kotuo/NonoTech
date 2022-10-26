import Image from "next/image";
import { AiOutlineLink } from "react-icons/ai";
import { BsGithub, BsTwitter } from "react-icons/bs";

const IconLinks = [
  {
    icon: BsGithub,
    link: "https://github.com/kotu-kotuo",
  },
  { icon: BsTwitter, link: "https://twitter.com/kotu_kotuo" },
  { icon: AiOutlineLink, link: "https://www.resume.id/kotu_kotuo" },
];

const SelfIntroduction = () => {
  return (
    <div className="rounded bg-white px-4 py-6">
      <div className="mb-4 flex items-center gap-x-4">
        <Image
          className="rounded-full"
          width={60}
          height={60}
          src="/photo-with-kazu.png"
          alt="my photo"
        />
        <div className="text-lg font-bold text-gray-700">ノノ</div>
      </div>
      <div className="text-sm text-gray-700">
        React, TypeScript,
        Next.jsなどを独学しています。フロントエンドエンジニアを目指して就活中。
      </div>
      <div className="mt-4 flex items-center justify-center gap-x-6 text-2xl text-gray-600">
        {IconLinks.map((IconLink) => (
          <a
            href={IconLink.link}
            target="_blank"
            rel="nofollow noopener noreferrer"
            area-label="my link"
            title="my link"
            key={IconLink.link}
          >
            <IconLink.icon className="cursor-pointer opacity-60 transition hover:opacity-100" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SelfIntroduction;

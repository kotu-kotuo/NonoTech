import Image from "next/image";

const SelfIntroduction = () => {
  return (
    <div className="rounded bg-white px-4 py-6">
      <div className="mb-4 flex items-center gap-x-4">
        <Image
          className="rounded-full"
          width={60}
          height={60}
          src="/photo-with-kazu.png"
        />
        <div className="text-lg font-bold text-gray-900">ノノ</div>
      </div>
      <div className="text-sm text-gray-800">
        React, TypeScript,
        Next.jsなどを独学しています。フロントエンドエンジニアを目指して就活中。
      </div>
    </div>
  );
};

export default SelfIntroduction;

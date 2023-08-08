"use client";
import Image from "next/image";

export interface ICompanionItem {
  name: string;
  title: string;
  imageUrl: string;
}

export interface ICharacterInfo {
  name: string;
  title: string;
  imageUrl: string;
  llm: string;
}

const Character = (characterInfo: ICharacterInfo) => {

  return (
    <div className="flex flex-1 flex-col p-8">
      {/* Avatar */}
      <Image
        width={0}
        height={0}
        sizes="100vw"
        className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
        src={characterInfo.imageUrl}
        alt=""
      />

      {/* Name */}
      <h3 className="mt-6 text-sm font-medium text-white">
        {Character.name}
      </h3>

      {/* Description */}
      <dl className="mt-1 flex flex-grow flex-col justify-between">
        <dt className="sr-only"></dt>
        <dd className="text-sm text-slate-400">
          {characterInfo.title}. Running on <b>{characterInfo.llm}</b>
        </dd>
      </dl>

    </div>
  );
}

export default Character;
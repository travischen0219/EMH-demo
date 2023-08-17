"use client"
import React, { useEffect, useState } from "react";
import { getCompanions } from "../utils/actions";
import ChatRoom from "./Chatting/ChatRoom";
import Character, { ICharacterInfo, ICompanionItem } from "./Character";


const CharacterList: React.FC = () => {
  const [ChatRoomOpen, setChatRoomOpen] = useState<boolean>(false);
  const [CompParam, setCompParam] = useState<ICompanionItem>({
    name: "",
    title: "",
    imageUrl: "",
  });

  const [characters, setCharacters] = useState<ICharacterInfo[]>([{
    name: "",
    title: "",
    imageUrl: "",
    llm: "",
  }]);

  useEffect(() => {
    const fetchCompanions = async () => {
      try {
        const companions = await getCompanions();
        let entries = JSON.parse(companions);
        let characterInfo = entries.map((entry: any) => ({
          name: entry.name,
          title: entry.title,
          imageUrl: entry.imageUrl,
          llm: entry.llm,
        }));
        setCharacters(characterInfo);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCompanions();
  }, []);

  return (
    <div id="CharacterDiv">
      <ChatRoom
        open={ChatRoomOpen}
        setOpen={setChatRoomOpen}
        Character={CompParam}
      />

      <ul
        role="list"
        className="mt-14 m-auto max-w-3xl grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        {characters.map((character) => (
          <li
            key={character.name}
            onClick={() => {
              setCompParam(character);
              setChatRoomOpen(true);
            }}
            className="col-span-2 flex flex-col rounded-lg bg-slate-800  text-center shadow relative ring-1 ring-white/10 cursor-pointer hover:ring-sky-300/70 transition"
          >
            <Character {...character} />
          </li>
        ))}
      </ul>
     
    </div>
  );
}

export default CharacterList;
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useCompletion } from "ai/react";
import { IContext } from "./Context";
import { useUser } from '@clerk/clerk-react';
import Context from "./Context";
import Spinner from "./Spinner";


export default function ChatRoom({
  open,
  setOpen,
  Character,
}: {
  open: boolean;
  setOpen: any;
  Character: any;
}) {
  if (!Character) {
    // create a dummy so the completion doesn't croak during init.
    Character = new Object();
    Character.llm = "";
    Character.name = "";
  }

  const [contexts, setContexts] = useState<IContext[]>([])
  const { user } = useUser();

  let {
    completion,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    stop,
    setInput,
    setCompletion,
  } = useCompletion({
    api: "/api/" + Character.llm,
    headers: { name: Character.name },
  });


  useEffect(() => {
    if (!user) return;
    const url = `http://127.0.0.1:8000/api/contexts/${user.id}`;
    console.log(url);
    const fetchContexts = async () => {
      const response = await (await fetch(url)).json();
      setContexts(response)
    }
    fetchContexts();
    console.log(contexts);
  }, [user])


  const handleClose = () => {
    setInput("");
    setCompletion("");
    stop();
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-950 bg-opacity-90 transition-opacity" />
        </Transition.Child>

        <div className="fixed bottom-0 w-full flex justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-10 sm:translate-y-10 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-50"
            >
          <div className="bg-gray-900 rounded-t-xl pt-4 md:h-3/5 sm:w-3/5 sm:max-w-96">
              <Dialog.Panel>
                <div
                  className="overflow-y-scroll scrollbar-hidden"
                  style={{ height: "50vh" }}
                >
                  {contexts && contexts.length > 0 ? (
                    contexts.map((context, index) => <Context key={index} {...context}/>)
                  ) : (
                    <div className="flex items-center justify-center self-center text-gray-400 text-sm h-full">
                      Start a conversation with {Character.name} now 🥳!
                    </div>
                  )}
                </div>

                <div className="m-4 opacity-60">
                {
                    isLoading && !completion ? <Spinner /> :
                    <form onSubmit={handleSubmit}>
                      <input
                        placeholder="How's your day?"
                        className={" w-full flex-auto rounded-md border-0 bg-white/5 px-3.5 py-4 shadow-sm focus:outline-none sm:text-sm sm:leading-6 " + (isLoading && !completion ? "text-gray-600 cursor-not-allowed" : "text-white")}
                        value={input}
                        onChange={handleInputChange}
                        disabled={isLoading && !completion}
                      />
                    </form>
                }
                </div>

                {/* Input area */}
              </Dialog.Panel>
          </div>
            </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

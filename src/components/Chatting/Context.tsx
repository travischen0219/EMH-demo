import AudioPlayer from "./AudioPlayer";

export interface IContext {
    _id: string;
    user_id: string;
    request: string;
    response: string;
    audio: string | null;
    video: string | null;
    updated_at: string;
    created_at: string;
    parent: string | null;
    children: string[];
}

const Context: React.FC<IContext> = (context: IContext) => {

    return (
        <>
        <div className="text-sm text-center text-gray-600 m-1">
            {context.updated_at}
        </div>

        <div className="flex flex-row p-2 items-center justify-center mx-5">
            {
                context.children.length > 0 &&
                <div className="flex flex-col flex-auto mr-5"
                    style={{minHeight: "7vh"}}
                >
                    next
                </div>
            }
            <div className="w-full">
                <div className="rounded-t-xl bg-gray-700 p-4"
                    style={{minHeight: "7vh"}}
                >
                    <p className="text-gray-200">
                        {context.request}
                    </p>
                </div>
                <div className="rounded-b-xl bg-gray-800 p-4"
                    style={{minHeight: "7vh"}}
                >
                    <p className="text-gray-200">
                        {context.response}
                        &nbsp;
                        {
                            context.audio &&
                            <AudioPlayer audio={context.audio} />
                        }
                    </p>
                </div>
            </div>

            <div
                className="flex flex-col flex-auto ml-5"
                style={{minHeight: "7vh"}}
            >
                {
                    context.video &&
                    <video controls className="rounded-full"
                        // style={{minHeight: "14vh"}}
                    >
                    <source src={`data:video/mp4;base64,${context.video}`} type="video/mp4" />
                    Your browser does not support the video tag.
                    </video>
                }
            </div>
        </div>
        </>
    )
}

export default Context;
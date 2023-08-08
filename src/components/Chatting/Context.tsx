import AudioPlayer from "./AudioPlayer";

export interface IContext {
    request: string;
    response: string;
    audio: string;
    video: string;
    updated_at: string;
    created_at: string;
}

const Context: React.FC<IContext> = (context: IContext) => {

    return (
        <>
        <div className="text-sm text-center text-gray-600 m-1">
            {context.updated_at}
        </div>

        <div className="flex flex-row p-2 items-center justify-center mx-5">
            <div className="w-full">
                <div className="rounded-t-xl bg-gray-700 p-4"
                    style={{minHeight: "7vh"}}
                >
                    <p className="text-sm text-gray-200">
                        User: {context.request}
                    </p>
                </div>
                <div className="rounded-b-xl bg-gray-800 p-4"
                    style={{minHeight: "7vh"}}
                >
                    <p className="text-sm text-gray-200">
                        Alpha: {context.response}
                        &nbsp;
                        <AudioPlayer audio={context.audio} />
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
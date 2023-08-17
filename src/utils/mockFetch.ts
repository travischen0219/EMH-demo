// A -> B -> E -> None
//        -> H -> None
//   -> C -> F -> None
//   -> G -> None

export const get_context = (context_id: string) => {
    if (context_id === "B") return {
        _id: "B",
        user_id: "xxxx",
        request: "test_request",
        response: "test_response",
        audio: "xxxxx",
        video: "xxxxx",
        updated_at: "xxx",
        created_at: "xxx",
        parent: "A",
        children: ["E"],
    }
    if (context_id === "E") return {
        _id: "E",
        user_id: "xxxx",
        request: "test_request",
        response: "test_response",
        audio: "xxxxx",
        video: "xxxxx",
        updated_at: "xxx",
        created_at: "xxx",
        parent: "B",
        children: [],
    }
    if (context_id === "H") return {
        _id: "H",
        user_id: "xxxx",
        request: "test_request",
        response: "test_response",
        audio: "xxxxx",
        video: "xxxxx",
        updated_at: "xxx",
        created_at: "xxx",
        parent: "B",
        children: [],
    }
    if (context_id === "C") return {
        _id: "C",
        user_id: "xxxx",
        request: "test_request",
        response: "test_response",
        audio: "xxxxx",
        video: "xxxxx",
        updated_at: "xxx",
        created_at: "xxx",
        parent: "A",
        children: ["F"],
    }
    if (context_id === "F") return {
        _id: "F",
        user_id: "xxxx",
        request: "test_request",
        response: "test_response",
        audio: "xxxxx",
        video: "xxxxx",
        updated_at: "xxx",
        created_at: "xxx",
        parent: "C",
        children: [],
    }
    if (context_id === "G") return {
        _id: "G",
        user_id: "xxxx",
        request: "test_request",
        response: "test_response",
        audio: "xxxxx",
        video: "xxxxx",
        updated_at: "xxx",
        created_at: "xxx",
        parent: "A",
        children: [],
    }
}
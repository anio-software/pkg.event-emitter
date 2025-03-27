// credit Ingo Bürk https://stackoverflow.com/a/52331580

// convert a tuple into an union type
export type Unpacked<T> = T extends (infer U)[] ? U : T

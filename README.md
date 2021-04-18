# NotImeplementedException

中身はとりあえず実装を後回しにして、先に関数やメソッドの型だけ定義したい場合に使用する独自例外です。


```ts
import { NotImplementedException } from "@yaufai/mytsutils"

function someFunction(x: number): number {
    throw new NotImplementedException()
}
```

# never

`never`は`never => T`型の関数です。

`switch`文で`default`に分岐することがないことを保証したいときに使用します。もし条件分岐が足りていなかったりそれまでに`return`を忘れるなどで値が`never`型になることを保証できない場合はコンパイルエラーを出して開発者に通知します。


```ts
import { never } from "@yaufai/mytsutils"

type SomeEnumType = "a" | "b"

function someFunc(val: SomeEnumType): string {
    switch (val) {
        case "a":
            // do whatever you want
            return "a"
        case "b":
            // do whatever you want
            return "b"
        default:
            return never<string>(val)
    }
}
```

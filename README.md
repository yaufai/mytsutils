# getAllMatches

正規表現がマッチするすべての結果を返します。通常の正規表現で利用される`g`修飾子とは異なり、グループなどの情報を失いません。

```ts
import { getAllMatches } from "@yaufai/mytsutils"

let results = getAllMatches(/(?<language>[a-z]{2})-(?<country>[a-z]{2})/, "ja-jp,en-us")

console.log((actual[0].groups as {[key: string]: string})["language"]) 
// -> ja
console.log((actual[1].groups as {[key: string]: string})["country"]) 
// -> us
```

# NotImeplementedException

中身はとりあえず実装を後回しにして、先に関数やメソッドの型だけ定義したい場合に使用する独自例外です。


```ts
import { NotImplementedException } from "@yaufai/mytsutils"

function someFunction(x: number): number {
    throw new NotImplementedException()
}
```

# tryToCompute

受け取った関数を例外処理でラップした新しい関数を返します。

新しい関数は、まず与えられた関数を実行し、例外が発生しなければその計算結果を返します。例外が発生した場合にはデフォルト値を返します。

また、計算結果を受け取ってブール値を返す`avoid`関数を与えることで、例外発生時以外にも計算結果が`true`と判定される場合にデフォルト値を返すようにすることもできます。



```ts
import { tryToCompute } from "@yaufai/mytsutils"

const detactYear: (x: string) => number = x => {
    const result = x.match(new RegExp(/\d{4}/))
    if (result === null) {
        throw new Error("No year found!")
    } else {
        return Number(Array.from(result)[0])
    }   
}
const defaultYear = 2021


tryToCompute(detactYear, defaultYear)("1999")
// 1999 (問題なく正規表現で年号を発見できる)
tryToCompute(detactYear, defaultYear)("19xx")
// 2021 (年号が発見できず例外が発生するのでデフォルト値が採用される)
tryToCompute(detactYear, defaultYear, (yr => yr <= 2021))("1999")
// 2021 (年号が発見できたが値がavoid関数でtrueと計算された)
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

# atob/btoa

Base64のエンコードとデコードを行います。

```ts
import { atob, btoa } from "@yaufai/mytsutils"

console.log(atob("こんにちは、世界！"))
// -> 44GT44KT44Gr44Gh44Gv44CB5LiW55WM77yB
console.log(btoa("44GT44KT44Gr44Gh44Gv44CB5LiW55WM77yB"))
// -> こんにちは、世界！
```

# ArrayOperations

## cartesian

`ArrayOperations.cartesian`は二つの配列を受け取り、そのデカルト積を返します。

```ts
import { ArrayOperations } from "@yaufai/mytsutils"

console.log(
    ArrayOperations.cartesian<string, number>([ "a", "b" ], [ 1, 2, 3 ])
)
// -> 
// [
//     [ "a", 1 ],
//     [ "a", 2 ],
//     [ "a", 3 ],
//     [ "b", 1 ],
//     [ "b", 2 ],
//     [ "b", 3 ],
// ]
```

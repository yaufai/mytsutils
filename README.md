# NotImeplementedException

中身はとりあえず実装を後回しにして、先に関数やメソッドの型だけ定義したい場合に使用する独自例外です。


```ts
import { NotImplementedException } from "@yaufai/mytsutils"

function someFunction(x: number): number {
    throw new NotImplementedException()
}
```


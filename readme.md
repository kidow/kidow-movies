## 본 프로젝트는 다음 리포지토리를 참고하여 만들었습니다. [NomadCoder](https://github.com/nomadcoders/nomad-movies)

---

프로젝트의 구조는 제 방식으로 리팩토링하였습니다.

- src : 모든 소스 파일을 담는 폴더
  - components : 재사용하는 컴포넌트를 모아놓은 폴더.
  - lib : External Libraraies.
  - navigations : Only Navigations Setting Folder.
  - screens : 웹 프로젝트의 pages와 같은 역할.
- .babelrc : React Native에서 상대 경로를 설정하는 파일. "root" 값의 src 폴더를 넣어두면 `import { Loader } from 'component'` 이런 식으로 부르는 것이 가능합니다.

```
// .babelrc
{
  "plugins": [
    [
      "module-resolver",
      {
        "root": ["./src"],
        "extensions": [".ios.js", ".android.js", ".js", ".json"]
      }
    ]
  ]
}

```

- .prettierrc : 코딩 스타일을 통일시키고 잡아주는 파일입니다.

```
// .prettierrc
{
  "singleQuote": true,
  "semi": false,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 80
}
```

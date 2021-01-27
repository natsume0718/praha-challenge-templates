// todo: ここに単体テストを書いてみましょう！
import { sumOfArray } from "../functions";

describe("sumOfArray", (): void => {
  test(`sumOfArray()は正常に計算を行います`, (): void => {
    expect(sumOfArray([1, 1])).toBe(2);
  });
  test(`sumOfArray()は正常に計算を行います`, (): void => {
    expect(sumOfArray([1, 2, 3])).toBe(6);
  });
  test(`エラー`, (): void => {
    expect((): void => {
      sumOfArray([]);
    }).toThrow();
  });
  // test(`コンパイルエラー`, (): void => {
  //   expect(sumOfArray(["a", "b", "c"])).toBe("abc");
  // });
});

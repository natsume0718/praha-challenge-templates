// todo: ここに単体テストを書いてみましょう！
import { sumOfArray, asyncSumOfArray } from "../functions";

describe("sumOfArray", (): void => {
  test(`sumOfArrayは正常に計算を行います`, (): void => {
    expect(sumOfArray([1, 1])).toBe(2);
  });
  test(`sumOfArrayは正常に計算を行います`, (): void => {
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

describe("asyncSumOfArray", (): void => {
  test(`asyncSumOfArrayは正常に計算を行います`, (): void => {
    expect(asyncSumOfArray([1, 1])).resolves.toBe(2);
  });
  test(`asyncSumOfArrayは正常に計算を行います`, (): void => {
    expect(asyncSumOfArray([1, 2, 3])).resolves.toBe(6);
  });
  test(`エラー`, (): void => {
    expect(asyncSumOfArray([])).rejects.toMatch("error");
  });
  // test(`コンパイルエラー`, (): void => {
  //   expect(asyncSumOfArray(["a", "b", "c"])).rejects.toBe("abc");
  // });
});

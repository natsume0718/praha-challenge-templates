// todo: ここに単体テストを書いてみましょう！
import {
  sumOfArray,
  asyncSumOfArray,
  asyncSumOfArraySometimesZero,
} from "../functions";
import { mocked } from "ts-jest/utils";
import { DatabaseMock } from "../util";

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
  test(`asyncSumOfArrayはエラーをスローします`, (): void => {
    expect(asyncSumOfArray([])).rejects.toMatch("error");
  });
  // test(`コンパイルエラー`, (): void => {
  //   expect(asyncSumOfArray(["a", "b", "c"])).rejects.toBe("abc");
  // });
});

// モックするモジュールの指定
jest.mock("../util/index.ts");
describe("asyncSumOfArraySometimesZero", (): void => {
  mocked(new DatabaseMock()).save.mockImplementationOnce((): void => {});
  test(`asyncSumOfArraySometimesZeroは正常に計算を行います`, (): void => {
    expect(asyncSumOfArraySometimesZero([1, 1])).resolves.toBe(2);
  });
  test(`asyncSumOfArraySometimesZeroは正常に計算を行います`, (): void => {
    expect(asyncSumOfArraySometimesZero([1, 2, 3])).resolves.toBe(6);
  });
  test(`asyncSumOfArraySometimesZeroはエラーをスローします`, (): void => {
    mocked(new DatabaseMock()).save.mockImplementationOnce((): void => {
      throw new Error();
    });
    expect(asyncSumOfArraySometimesZero([])).rejects.toMatch("error");
  });
});

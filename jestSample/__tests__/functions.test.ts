// todo: ここに単体テストを書いてみましょう！
import {
  sumOfArray,
  // asyncSumOfArray,
  asyncSumOfArraySometimesZero,
  getFirstNameThrowIfLong,
} from "../functions";
import { mocked } from "ts-jest/utils";
import { DatabaseMock } from "../util";
import { NameApiService } from "../nameApiService";
import axios from "axios";

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

jest.mock("axios");
describe("nameApiService", (): void => {
  const service = new NameApiService();

  const name = "hoge";
  const tooLongName = "fugggggggggggggaa";

  test(`nameApiServiceは正常に名前を返します`, (): void => {
    mocked(axios, true).get.mockResolvedValue({
      data: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        first_name: name,
      },
    });
    expect(service.getFirstName()).resolves.toBe(name);
  });
  test(`nameApiServiceはエラーをスローします`, (): void => {
    mocked(axios, true).get.mockResolvedValue({
      data: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        first_name: tooLongName,
      },
    });
    expect(service.getFirstName()).rejects.toMatch("Error");
  });
});

// 全体モックにすると上部のテストに影響が出る
// jest.mock("../nameApiService");
describe("getFirstNameThrowIfLong", (): void => {
  const name = "yamada";
  // 上部のテストに影響が出る
  // mocked(new NameApiService()).getFirstName.mockRejectedValue(name);
  jest.spyOn(NameApiService.prototype, "getFirstName").mockResolvedValue(name);
  test(`getFirstNameThrowIfLongは正常に名前を返します`, async () => {
    await expect(getFirstNameThrowIfLong(name.length + 1)).resolves.toBe(name);
  });
  test(`getFirstNameThrowIfLongはエラーをスローします`, async () => {
    await expect(getFirstNameThrowIfLong(name.length - 1)).rejects.toThrow(
      "first_name too long"
    );
  });
});

// const sumOfArrays = (numbers: number[]): number => {
//   return numbers.reduce((a: number, b: number): number => a + b);
// };

// const hoge = [
//   [[1, 1], 2],
//   [[1, 2, 3], 6],
// ];

// test.each(hoge)(".add(%i, %i)", (first, expected) => {
//   if (Array.isArray(first)) {
//     expect(sumOfArrays(first)).toBe(expected);
//   }
// });

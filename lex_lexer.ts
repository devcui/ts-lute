import { ItemNewline, ItemCarriageReturn } from "./lex_token.ts";

export class Lexer {
  input: Uint8Array; // 输入的文本字节数组
  length: number; // 输入的文本字节数组的长度
  offset: number = 0; // 当前读取字节位置
  width: number = 0; // 最新一个字符的长度（字节数）

  constructor(input: Uint8Array) {
    this.input = input;
    this.length = input.length;
    if (0 < this.length && ItemNewline != this.input[this.length - 1]) {
      // 以 \n 结尾预处理
      const newInput = new Uint8Array(this.length + 1);
      newInput.set(this.input);
      newInput[this.length] = ItemNewline;
      this.input = newInput;
      this.length++;
    }
  }

  // NextLine 返回下一行。
  public NextLine(): Uint8Array | undefined {
    // 如果当前偏移量大于等于输入长度，表示没有更多的行可以读取，返回 undefined
    if (this.offset >= this.length) return undefined;

    // 初始化变量
    let b: number; // 当前字节
    let nb: number; // 下一个字节
    let i = this.offset; // 从当前偏移量开始遍历输入数组

    // 遍历输入字节数组直到找到换行符
    for (; i < this.length; i += this.width) {
      b = this.input[i]; // 获取当前字节

      // 如果当前字节是换行符 \n，增加 i 并跳出循环，表示找到一行的结束
      if (ItemNewline === b) {
        i++;
        break;
      }
      // 如果当前字节是回车符 \r
      else if (ItemCarriageReturn === b) {
        // 检查下一个字符是否存在
        if (i < this.length - 1) {
          nb = this.input[i + 1]; // 获取下一个字节

          // 如果下一个字节是换行符 \n，移除回车符 \r，依靠下一个换行符分割行，并重新计算输入数组的长度
          if (ItemNewline === nb) {
            this.input = this.removeElement(this.input, i); // 移除 \r
            this.length--; // 重新计算总长
          }
          // 否则，将回车符 \r 替换为换行符 \n
          else {
            this.input[i] = ItemNewline;
          }
        }
        // 如果回车符 \r 是最后一个字符，将其替换为换行符 \n
        else {
          this.input[i] = ItemNewline;
        }
        i++;
        break;
      }
      // 如果当前字节是空字符 \u0000，将其替换为 Unicode 替换字符 \uFFFD
      else if (b === 0x00) {
        // 创建一个新的 Uint8Array，长度增加 2
        const newInput = new Uint8Array(this.length + 2);
        newInput.set(this.input.subarray(0, i)); // 复制替换前部分
        newInput.set([0xef, 0xbf, 0xbd], i); // 插入替换字符 \uFFFD
        newInput.set(this.input.subarray(i + 1), i + 3); // 复制替换后部分
        this.input = newInput;
        this.length += 2; // 重新计算总长
        this.width = 3; // 设置当前字符宽度为 3
        continue; // 继续下一个循环
      }

      // 如果当前字节大于等于 0x80，说明是多字节字符
      if (b >= 0x80) {
        const codePoint = this.decodeRune(this.input.subarray(i)); // 解码多字节字符
        this.width = codePoint.width; // 设置当前字符宽度
      }
      // 否则当前字符宽度为 1
      else {
        this.width = 1;
      }
    }

    // 从当前偏移量到 i 的子数组为一行内容
    const ret = this.input.subarray(this.offset, i);
    this.offset = i; // 更新偏移量
    return ret; // 返回这一行的内容
  }

  // 辅助方法：从数组 arr 中移除指定索引 index 的元素
  private removeElement(arr: Uint8Array, index: number): Uint8Array {
    const newArr = new Uint8Array(arr.length - 1);
    newArr.set(arr.subarray(0, index));
    newArr.set(arr.subarray(index + 1), index);
    return newArr;
  }

  // 辅助方法：解码多字节字符，返回字符的 Unicode 码点和字符宽度
  private decodeRune(arr: Uint8Array): { rune: number; width: number } {
    const decoder = new TextDecoder();
    const str = decoder.decode(arr);
    const rune = str.codePointAt(0);
    const width = new TextEncoder().encode(str[0]).length;
    return { rune: rune!, width };
  }
}

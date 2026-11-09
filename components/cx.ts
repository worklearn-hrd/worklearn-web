/** 참인 클래스 이름만 공백으로 잇는다. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

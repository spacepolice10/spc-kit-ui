export function focusingOnTextform(ev: React.MouseEvent | React.FocusEvent) {
  ev.preventDefault();
  ev.stopPropagation();
  const target = ev.currentTarget.firstChild as HTMLInputElement;
  target?.focus();
}

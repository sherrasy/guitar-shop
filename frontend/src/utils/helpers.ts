export const checkValidity = (field: HTMLInputElement, pattern: RegExp) => field.value.match(pattern);

export const formatDate = (date:string) => new Date(date).toLocaleDateString('ru-RU');

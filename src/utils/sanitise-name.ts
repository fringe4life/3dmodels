const ESCAPE_NAME = /[^a-zA-Z0-9-_]/gu;

const sanitiseName = (name: string) => name.replace(ESCAPE_NAME, "-");

export { sanitiseName };

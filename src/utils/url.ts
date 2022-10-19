export const getHostname = (url: string) => {
  const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);

  return matches && matches[1];
};

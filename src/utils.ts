export const setCookie = (name: string, value: string): void => {
    const expires = new Date(Date.now() + 30 * 60 * 1000).toUTCString();

    let cookieString = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires};`;
    cookieString += " secure; SameSite=Strict;";
  document.cookie = cookieString;
};

export const getCookie = (name: string): string | null => {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1] || null
  );
};

export const deleteCookie = (name: string): void => {
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Strict; secure;`;
  };
  
